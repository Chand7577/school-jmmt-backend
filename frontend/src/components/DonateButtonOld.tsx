import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Heart, IndianRupee, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

// Razorpay type declaration
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface DonationFormData {
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  amount: string;
  donation_purpose: string;
  message: string;
}

interface StatusModalProps {
  isOpen: boolean;
  status: 'success' | 'error' | 'cancelled';
  title: string;
  message: string;
  receiptNumber?: string;
  amount?: string;
  onClose: () => void;
}

const StatusModal = ({ isOpen, status, title, message, receiptNumber, amount, onClose }: StatusModalProps) => {
  if (!isOpen) return null;

  const icons = {
    success: (
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    ),
    error: (
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    ),
    cancelled: (
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
        <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    )
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp my-auto">
        <div className="p-8">
          {icons[status]}
          
          <h3 className="mt-6 text-center text-2xl font-black text-[#1E2A44]">
            {title}
          </h3>
          
          <p className="mt-3 text-center text-slate-600">
            {message}
          </p>

          {status === 'success' && receiptNumber && (
            <div className="mt-6 bg-gradient-to-br from-[#E8B923]/10 to-[#E8B923]/5 rounded-lg p-4 border border-[#E8B923]/20">
              <div className="text-center">
                <p className="text-xs font-bold text-[#1E2A44]/70 uppercase tracking-wide mb-1">Receipt Number</p>
                <p className="text-lg font-black text-[#1E2A44]">{receiptNumber}</p>
                {amount && (
                  <>
                    <p className="text-xs font-bold text-[#1E2A44]/70 uppercase tracking-wide mt-3 mb-1">Amount Donated</p>
                    <p className="text-2xl font-black text-[#E8B923]">₹{amount}</p>
                  </>
                )}
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-8 w-full bg-gradient-to-r from-[#E8B923] to-[#d4a61f] text-[#1E2A44] font-black py-3 rounded-lg hover:shadow-lg transition-all cursor-pointer"
          >
            {status === 'success' ? 'Done' : 'Close'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const DonateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    status: 'success' | 'error' | 'cancelled';
    title: string;
    message: string;
    receiptNumber?: string;
    amount?: string;
  }>({
    isOpen: false,
    status: 'success',
    title: '',
    message: ''
  });
  const [formData, setFormData] = useState<DonationFormData>({
    donor_name: '',
    donor_email: '',
    donor_phone: '',
    amount: '',
    donation_purpose: 'General Donation',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<DonationFormData>>({});

  useEffect(() => {
    if (isModalOpen || statusModal.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen, statusModal.isOpen]);

  const donationPurposes = [
    'General Donation',
    'Infrastructure Development',
    'Student Scholarship',
    'Sports Equipment',
    'Library Books',
    'Technology & Labs',
    'Teacher Training',
    'Student Welfare'
  ];

  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  const validateForm = (): boolean => {
    const newErrors: Partial<DonationFormData> = {};

    if (!formData.donor_name.trim()) {
      newErrors.donor_name = 'Name is required';
    }

    if (!formData.donor_email.trim()) {
      newErrors.donor_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.donor_email)) {
      newErrors.donor_email = 'Invalid email format';
    }

    if (!formData.donor_phone.trim()) {
      newErrors.donor_phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.donor_phone.replace(/\s/g, ''))) {
      newErrors.donor_phone = 'Invalid phone number';
    }

    if (!formData.amount || parseFloat(formData.amount) < 10) {
      newErrors.amount = 'Minimum amount is ₹10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof DonationFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleQuickAmount = (amount: number) => {
    setFormData(prev => ({ ...prev, amount: amount.toString() }));
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: undefined }));
    }
  };

  const closeStatusModal = () => {
    setStatusModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create Razorpay order
      const response = await fetch(`${API_BASE_URL}/api/donations/create-order.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donor_name: formData.donor_name,
          donor_email: formData.donor_email,
          donor_phone: formData.donor_phone,
          amount: parseFloat(formData.amount),
          donation_purpose: formData.donation_purpose,
          message: formData.message
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to create order');
      }

      // Initialize Razorpay payment
      const options = {
        ...data.data.razorpay_config,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch(`${API_BASE_URL}/api/donations/verify-payment.php`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Show success modal
              setStatusModal({
                isOpen: true,
                status: 'success',
                title: 'Thank You for Your Donation! 🎉',
                message: `Your generous donation of ₹${formData.amount} has been received successfully. We truly appreciate your kind support!`,
                receiptNumber: verifyData.data.receipt_number,
                amount: formData.amount
              });
              
              // Reset form
              setFormData({
                donor_name: '',
                donor_email: '',
                donor_phone: '',
                amount: '',
                donation_purpose: 'General Donation',
                message: ''
              });
              setIsModalOpen(false);
              setIsProcessing(false);
            } else {
              throw new Error(verifyData.message || 'Payment verification failed');
            }
          } catch (error: any) {
            console.error('Verification error:', error);
            setIsModalOpen(false);
            setStatusModal({
              isOpen: true,
              status: 'error',
              title: 'Payment Verification Failed',
              message: `There was an issue verifying your payment. Please contact support with your payment ID: ${response.razorpay_payment_id}`,
            });
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            setIsModalOpen(false);
            setStatusModal({
              isOpen: true,
              status: 'cancelled',
              title: 'Payment Cancelled',
              message: 'Your payment was cancelled. No amount has been charged to your account.',
            });
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (resp: any) {
        setIsProcessing(false);
        setIsModalOpen(false);
        setStatusModal({
          isOpen: true,
          status: 'error',
          title: 'Payment Failed',
          message: resp.error?.description || 'Your payment was declined by the bank or gateway. Please try again with another card or method.',
        });
      });
      setIsModalOpen(false);
      razorpay.open();

    } catch (error: any) {
      console.error('Donation error:', error);
      setIsModalOpen(false);
      setStatusModal({
        isOpen: true,
        status: 'error',
        title: 'Donation Failed',
        message: error.message || 'Failed to process donation. Please try again or contact support.',
      });
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Donate Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-[#E8B923] to-[#d4a61f] text-[#1E2A44] font-black text-xs rounded-full hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shrink-0"
      >
        <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform" fill="currentColor" />
        <span>DONATE</span>
      </button>

      {/* Status Modal */}
      <StatusModal
        isOpen={statusModal.isOpen}
        status={statusModal.status}
        title={statusModal.title}
        message={statusModal.message}
        receiptNumber={statusModal.receiptNumber}
        amount={statusModal.amount}
        onClose={closeStatusModal}
      />

      {/* Donation Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp my-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1E2A44] to-[#2c3e5e] text-white px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="h-8 w-8 text-[#E8B923]" fill="currentColor" />
                  <div>
                    <h2 className="text-2xl font-black">Make a Donation</h2>
                    <p className="text-sm text-white/80">Support JMMS School & Transform Lives</p>
                  </div>
                </div>
                <button
                  onClick={() => !isProcessing && setIsModalOpen(false)}
                  disabled={isProcessing}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Quick Amount Selection */}
              <div>
                <label className="block text-sm font-bold text-[#1E2A44] mb-3">
                  Select Amount or Enter Custom
                </label>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleQuickAmount(amount)}
                      className={`px-4 py-3 rounded-lg font-bold text-sm transition-all ${
                        formData.amount === amount.toString()
                          ? 'bg-[#E8B923] text-[#1E2A44] shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter custom amount"
                    min="10"
                    step="1"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 font-semibold text-lg ${
                      errors.amount
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-slate-200 focus:border-[#1E2A44]'
                    } focus:outline-none focus:ring-2 focus:ring-[#E8B923]/20 transition-colors`}
                  />
                </div>
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                )}
              </div>

              {/* Donor Name */}
              <div>
                <label className="block text-sm font-bold text-[#1E2A44] mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    name="donor_name"
                    value={formData.donor_name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 ${
                      errors.donor_name
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-slate-200 focus:border-[#1E2A44]'
                    } focus:outline-none focus:ring-2 focus:ring-[#E8B923]/20 transition-colors`}
                  />
                </div>
                {errors.donor_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.donor_name}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#1E2A44] mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      name="donor_email"
                      value={formData.donor_email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 ${
                        errors.donor_email
                          ? 'border-red-300 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#1E2A44]'
                      } focus:outline-none focus:ring-2 focus:ring-[#E8B923]/20 transition-colors`}
                    />
                  </div>
                  {errors.donor_email && (
                    <p className="mt-1 text-sm text-red-600">{errors.donor_email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1E2A44] mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="tel"
                      name="donor_phone"
                      value={formData.donor_phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 ${
                        errors.donor_phone
                          ? 'border-red-300 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#1E2A44]'
                      } focus:outline-none focus:ring-2 focus:ring-[#E8B923]/20 transition-colors`}
                    />
                  </div>
                  {errors.donor_phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.donor_phone}</p>
                  )}
                </div>
              </div>

              {/* Donation Purpose */}
              <div>
                <label className="block text-sm font-bold text-[#1E2A44] mb-2">
                  Donation Purpose
                </label>
                <select
                  name="donation_purpose"
                  value={formData.donation_purpose}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#1E2A44] focus:outline-none focus:ring-2 focus:ring-[#E8B923]/20 transition-colors"
                >
                  {donationPurposes.map((purpose) => (
                    <option key={purpose} value={purpose}>
                      {purpose}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-[#1E2A44] mb-2">
                  Message (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Share why you're supporting JMMS..."
                    rows={3}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#1E2A44] focus:outline-none focus:ring-2 focus:ring-[#E8B923]/20 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-[#E8B923] to-[#d4a61f] text-[#1E2A44] font-black py-4 rounded-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="h-5 w-5 border-2 border-[#1E2A44] border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Heart className="h-5 w-5" fill="currentColor" />
                    <span>Proceed to Pay ₹{formData.amount || '0'}</span>
                  </>
                )}
              </button>

              <p className="text-xs text-center text-slate-500">
                Secure payment powered by Razorpay. Your donation is tax-deductible under 80G.
              </p>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Load Razorpay Script */}
      {isModalOpen && (
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        ></script>
      )}
    </>
  );
};

export default DonateButton;
