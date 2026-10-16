// Netlify Function: Create Razorpay Order
// This runs on Netlify's servers, avoiding CORS issues

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const data = JSON.parse(event.body);

    // Validate required fields
    const required = ['donor_name', 'donor_email', 'amount'];
    for (const field of required) {
      if (!data[field]) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false, 
            message: `Field '${field}' is required` 
          })
        };
      }
    }

    // Razorpay credentials (use environment variables in Netlify)
    const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_TgVF1zHuVFwoxx';
    const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'nIAaXwz2xERx4kGjvZ2KRzJA';

    // Create Razorpay order
    const amount = parseFloat(data.amount) * 100; // Convert to paise
    
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'INR',
        receipt: 'rcpt_' + Date.now(),
        notes: {
          donor_name: data.donor_name,
          donor_email: data.donor_email
        }
      })
    });

    const razorpayOrder = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      throw new Error('Failed to create Razorpay order');
    }

    // Call your InfinityFree backend to store in database
    // (This is server-to-server, no CORS issues)
    try {
      await fetch('https://backend-jmmt.infinityfree.me/api/donations/create-order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (dbError) {
      console.error('Database storage failed:', dbError);
      // Continue anyway - payment is more important
    }

    // Return success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Order created successfully',
        data: {
          order_id: razorpayOrder.id,
          amount: parseFloat(data.amount),
          currency: 'INR',
          razorpay_key: RAZORPAY_KEY_ID,
          razorpay_config: {
            key: RAZORPAY_KEY_ID,
            amount: razorpayOrder.amount,
            currency: 'INR',
            name: 'JMMS School',
            description: data.donation_purpose || 'Donation',
            image: 'https://jmmt.org.in/wp-content/uploads/2022/07/jmms-logo-7-1-e1525669143761-1.webp',
            order_id: razorpayOrder.id,
            theme: { color: '#E8B923' },
            prefill: {
              name: data.donor_name,
              email: data.donor_email,
              contact: data.donor_phone || ''
            }
          }
        }
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to create order. Please try again.',
        error: error.message
      })
    };
  }
};
