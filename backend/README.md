# 💰 JMMS Donation Payment Backend

## 📦 What's Included

This is a **minimal PHP backend** for handling Razorpay donations. It contains only the payment processing code.

### Files Structure:
```
payment-backend-deploy/
├── config/
│   ├── database.php       # Database connection
│   └── razorpay.php       # Razorpay configuration
├── includes/
│   └── auth.php          # Helper functions (no auth needed for donations)
├── api/
│   └── donations/
│       ├── create-order.php   # Creates Razorpay order
│       └── verify-payment.php # Verifies payment
├── donations.sql          # Database schema
└── README.md             # This file
```

---

## 🚀 Quick Deploy (3 Steps)

### Step 1: Upload Files

**Via FTP (FileZilla/cPanel):**
```
Upload all folders to your server:
- config/
- includes/
- api/
```

**Your URL structure will be:**
```
https://yourdomain.com/api/donations/create-order.php
https://yourdomain.com/api/donations/verify-payment.php
```

---

### Step 2: Create Database

**Execute this SQL:**
```sql
-- Run donations.sql file in your hosting's phpMyAdmin
-- Or manually:

CREATE DATABASE IF NOT EXISTS jmms_donations;

USE jmms_donations;

-- Then paste contents of donations.sql
```

---

### Step 3: Update Configuration

**Edit `config/database.php`:**
```php
define('DB_HOST', 'localhost');          // Your DB host
define('DB_NAME', 'jmms_donations');     // Your DB name
define('DB_USER', 'your_db_username');   // Your DB user
define('DB_PASS', 'your_db_password');   // Your DB password
```

**Edit `config/razorpay.php`:**
```php
define('RAZORPAY_KEY_ID', 'rzp_test_YOUR_KEY');
define('RAZORPAY_KEY_SECRET', 'YOUR_SECRET');
```

---

## 🔗 Update Frontend

**In your React app (`DonateButton.tsx`), update API URLs:**

```typescript
// Line ~95 - Create Order
const response = await fetch('https://YOUR-DOMAIN.com/api/donations/create-order.php', {

// Line ~117 - Verify Payment  
const verifyResponse = await fetch('https://YOUR-DOMAIN.com/api/donations/verify-payment.php', {
```

**Replace with your actual domain!**

---

## ⚡ Quick Test

After deployment, test APIs:

### Test Create Order:
```bash
curl -X POST https://YOUR-DOMAIN.com/api/donations/create-order.php \
  -H "Content-Type: application/json" \
  -d '{
    "donor_name": "Test User",
    "donor_email": "test@example.com", 
    "donor_phone": "9876543210",
    "amount": 100,
    "donation_purpose": "General Donation"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "donation_id": 1,
    "order_id": "order_...",
    "razorpay_config": {...}
  }
}
```

---

## 🌐 Recommended Free Hosts

### Option 1: InfinityFree ⭐ (Best)
- Website: https://www.infinityfree.net
- **FREE Forever**
- PHP 8.x + MySQL
- Free SSL (HTTPS)
- 5GB storage

### Option 2: 000webhost
- Website: https://www.000webhost.com
- Free PHP hosting
- MySQL database
- 300MB storage

### Option 3: AwardSpace
- Website: https://www.awardspace.com
- Free tier available
- PHP + MySQL

---

## 📋 Hosting Setup Guide

### For InfinityFree:

1. **Sign Up:**
   - Go to https://www.infinityfree.net
   - Click "Sign Up Free"
   - Choose subdomain (e.g., `jmms-donations.rf.gd`)

2. **Upload Files:**
   - Login to Control Panel
   - Open "File Manager" or use FTP
   - Upload to `htdocs/` folder
   - Create folders: `api/donations/`
   - Upload all PHP files

3. **Create Database:**
   - Control Panel → MySQL Databases
   - Create new database
   - Note the credentials (host, name, user, pass)
   - Open phpMyAdmin
   - Import `donations.sql`

4. **Update Config:**
   - Edit `config/database.php` with your DB credentials
   - Edit `config/razorpay.php` with your keys

5. **Test:**
   ```
   Visit: https://your-subdomain.rf.gd/api/donations/create-order.php
   Should show: "Method not allowed" (means it's working!)
   ```

---

## 🔒 Security Checklist

Before going live:

- [ ] Use HTTPS (most free hosts provide this)
- [ ] Update CORS settings if needed
- [ ] Never commit secrets to Git
- [ ] Use strong database password
- [ ] Keep Razorpay Secret secure
- [ ] Test with Razorpay test mode first
- [ ] Enable error logging (not displaying)

---

## 🐛 Troubleshooting

### "Database connection failed"
```php
// Check credentials in config/database.php
// Verify database exists
// Test with: SELECT 1;
```

### "CORS Error"
```php
// Add to both API files (top):
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
```

### "404 Not Found"
```
Check:
1. Files uploaded to correct folder
2. URL is correct
3. .htaccess allows PHP execution
```

### "Payment verification failed"
```
Check:
1. Razorpay keys are correct
2. No whitespace in keys
3. Order ID matches
```

---

## 📞 Support

**Razorpay Docs:**
https://razorpay.com/docs/

**Test Integration:**
https://razorpay.com/docs/payments/test-integration/

---

## ✅ Deployment Checklist

- [ ] Files uploaded to server
- [ ] Database created and imported
- [ ] `config/database.php` updated
- [ ] `config/razorpay.php` updated with keys
- [ ] Frontend API URLs updated
- [ ] Tested create-order endpoint
- [ ] Tested verify-payment endpoint
- [ ] HTTPS enabled
- [ ] Error logging configured

---

## 🎉 You're Ready!

Once deployed and configured:

1. ✅ Your frontend can call the APIs
2. ✅ Users can donate via Razorpay
3. ✅ Payments are verified securely
4. ✅ Donations stored in database
5. ✅ Receipts generated automatically

**Happy Fundraising! 💰**
