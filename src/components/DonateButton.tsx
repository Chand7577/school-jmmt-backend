import { useState } from 'react';
import { X, Heart, IndianRupee, Mail, Phone, User, MessageSquare, GraduationCap, Utensils, Coffee } from 'lucide-react';

// Razorpay type declaration
declare global {
  interface Window {
    Razorpay: any;
  }
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://school-jmmt-backend.onrender.com";

interface SponsorshipPackage {
  id: string;
  title: string;
  description: string;
  amount: number;
  unit: string;
  icon: any;
  color: string;
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

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
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
            className="mt-8 w-full bg-gradient-to-r from-[#E8B923] to-[#d4a61f] text-[#1E2A44] font-black py-3 rounded-lg hover:shadow-lg transition-all"
          >
            {status === 'success' ? 'Done' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

const DonateButton = () => {
  const [step, setStep] = useState<'packages' | 'form'>('packages');
  const [selectedPackage, setSelectedPackage] = useState<SponsorshipPackage | null>(null);
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
    donation_purpose: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<DonationFormData>>({});

  const sponsorshipPackages: SponsorshipPackage[] = [
    {
      id: 'school-sponsorship',
      title: 'School Sponsorship',
      description: 'Support a child\'s complete education',
      amount: 50000,
      unit: 'per year, per child',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'mid-day-meal',
      title: 'Mid Day Meal',
      description: 'Nutritious meals for 194 children',
      amount: 9000,
      unit: 'for 4 days',
      icon: Utensils,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'milk-cookies',
      title: 'Milk & Cookies',
      description: 'Healthy snacks for 194 children',
      amount: 1500,
      unit: 'per day',
      icon: Coffee,
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 'custom',
      title: 'Custom Amount',
      description: 'Choose your own amount',
      amount: 0,
      unit: 'any amount',
      icon: Heart,
      color: 'from-[#E8B923] to-[#d4a61f]'
    }
  ];

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
    } else if (!/^\d{10}$/.test(formData.donor_phone.replace(/\D/g, ''))) {
      newErrors.donor_phone = 'Invalid phone number';
    }

    const amount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amount) || amount < 10) {
      newErrors.amount = 'Minimum amount is ₹10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePackageSelect = (pkg: SponsorshipPackage) => {
    setSelectedPackage(pkg);
    setFormData({
      ...formData,
      amount: pkg.amount > 0 ? pkg.amount.toString() : '',
      donation_purpose: pkg.title
    });
    setStep('form');
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to create order');
      }

      // Initialize Razorpay
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
                razorpay_signature: response.razorpay_signature,
                donor_name: formData.donor_name,
                donor_email: formData.donor_email,
                donor_phone: formData.donor_phone,
                amount: parseFloat(formData.amount),
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              setIsModalOpen(false);
              setStatusModal({
                isOpen: true,
                status: 'success',
                title: 'Thank You!',
                message: 'Your donation has been received successfully. We truly appreciate your support!',
                receiptNumber: verifyData.data.receipt_number,
                amount: formData.amount
              });
              
              // Reset form
              setFormData({
                donor_name: '',
                donor_email: '',
                donor_phone: '',
                amount: '',
                donation_purpose: '',
                message: ''
              });
              setStep('packages');
              setSelectedPackage(null);
            } else {
              throw new Error(verifyData.message || 'Payment verification failed');
            }
          } catch (error: any) {
            setIsModalOpen(false);
            setStatusModal({
              isOpen: true,
              status: 'error',
              title: 'Verification Failed',
              message: error.message || 'Payment could not be verified. Please contact us with your payment details.'
            });
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
              message: 'Your payment was cancelled. No amount was charged.'
            });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setIsProcessing(false);
        setIsModalOpen(false);
        setStatusModal({
          isOpen: true,
          status: 'error',
          title: 'Payment Failed',
          message: resp.error?.description || 'Your payment was declined by the bank or gateway. Please try again with another card or method.',
        });
      });
      rzp.open();
    } catch (error: any) {
      setStatusModal({
        isOpen: true,
        status: 'error',
        title: 'Error',
        message: error.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToPackages = () => {
    setStep('packages');
    setSelectedPackage(null);
    setErrors({});
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-r from-[#E8B923] to-[#d4a61f] text-[#1E2A44] px-8 py-3 rounded-lg font-black hover:shadow-lg transition-all hover:scale-105"
      >
        Donate Now
      </button>

      {/* Main Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#1E2A44] to-[#2c3e5f] text-white p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 fill-[#E8B923] text-[#E8B923]" />
                <h2 className="text-2xl font-black">
                  {step === 'packages' ? 'Choose Your Impact' : `${selectedPackage?.title || 'Donation'}`}
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setStep('packages');
                  setSelectedPackage(null);
                }}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-88px)]">
              {step === 'packages' ? (
                // Package Selection
                <div className="p-6">
                  <p className="text-center text-slate-600 mb-8">
                    Choose a sponsorship package that resonates with your heart
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sponsorshipPackages.map((pkg) => {
                      const Icon = pkg.icon;
                      return (
                        <button
                          key={pkg.id}
                          onClick={() => handlePackageSelect(pkg)}
                          className="group relative bg-white border-2 border-slate-200 rounded-xl p-6 text-left hover:border-[#E8B923] hover:shadow-xl transition-all duration-300"
                        >
                          <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          
                          <h3 className="text-xl font-black text-[#1E2A44] mb-2 pr-16">
                            {pkg.title}
                          </h3>
                          
                          <p className="text-sm text-slate-600 mb-4">
                            {pkg.description}
                          </p>
                          
                          <div className="flex items-baseline gap-2 mb-2">
                            {pkg.amount > 0 ? (
                              <>
                                <span className="text-3xl font-black text-[#E8B923]">
                                  ₹{pkg.amount.toLocaleString('en-IN')}
                                </span>
                                <span className="text-sm text-slate-500">
                                  {pkg.unit}
                                </span>
                              </>
                            ) : (
                              <span className="text-2xl font-black text-[#E8B923]">
                                {pkg.unit}
                              </span>
                            )}
                          </div>
                          
                          <div className="mt-4 flex items-center gap-2 text-[#E8B923] font-bold group-hover:gap-3 transition-all">
                            <span>Select Package</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // Donation Form
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Back Button */}
                  <button
                    type="button"
                    onClick={handleBackToPackages}
                    className="flex items-center gap-2 text-slate-600 hover:text-[#E8B923] transition-colors mb-4"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-semibold">Back to Packages</span>
                  </button>

                  {/* Selected Package Info */}
                  {selectedPackage && selectedPackage.amount > 0 && (
                    <div className="bg-gradient-to-r from-[#E8B923]/10 to-[#E8B923]/5 rounded-xl p-4 border border-[#E8B923]/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">You're donating</p>
                          <p className="text-2xl font-black text-[#1E2A44]">
                            ₹{selectedPackage.amount.toLocaleString('en-IN')}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">{selectedPackage.unit}</p>
                        </div>
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${selectedPackage.color} flex items-center justify-center shadow-lg`}>
                          <selectedPackage.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#1E2A44] mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.donor_name}
                        onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#E8B923] transition-colors ${
                          errors.donor_name ? 'border-red-500' : 'border-slate-200'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.donor_name && (
                        <p className="mt-1 text-sm text-red-500">{errors.donor_name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#1E2A44] mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.donor_email}
                        onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#E8B923] transition-colors ${
                          errors.donor_email ? 'border-red-500' : 'border-slate-200'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.donor_email && (
                        <p className="mt-1 text-sm text-red-500">{errors.donor_email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#1E2A44] mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.donor_phone}
                        onChange={(e) => setFormData({ ...formData, donor_phone: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#E8B923] transition-colors ${
                          errors.donor_phone ? 'border-red-500' : 'border-slate-200'
                        }`}
                        placeholder="10-digit mobile number"
                      />
                      {errors.donor_phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.donor_phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#1E2A44] mb-2">
                        <IndianRupee className="w-4 h-4 inline mr-2" />
                        Amount *
                      </label>
                      <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#E8B923] transition-colors ${
                          errors.amount ? 'border-red-500' : 'border-slate-200'
                        }`}
                        placeholder="Enter amount"
                        min="10"
                        readOnly={selectedPackage?.amount ? selectedPackage.amount > 0 : false}
                      />
                      {errors.amount && (
                        <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#1E2A44] mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Message (Optional)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#E8B923] transition-colors resize-none"
                      placeholder="Your message or dedication..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-[#E8B923] to-[#d4a61f] text-[#1E2A44] font-black py-4 rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 fill-current" />
                        Proceed to Payment
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    Secure payment powered by Razorpay
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Status Modal */}
      <StatusModal
        isOpen={statusModal.isOpen}
        status={statusModal.status}
        title={statusModal.title}
        message={statusModal.message}
        receiptNumber={statusModal.receiptNumber}
        amount={statusModal.amount}
        onClose={() => setStatusModal({ ...statusModal, isOpen: false })}
      />
    </>
  );
};

export default DonateButton;
