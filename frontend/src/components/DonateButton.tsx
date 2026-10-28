import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Heart,
  IndianRupee,
  GraduationCap,
  Utensils,
  Coffee,
  Check,
  ArrowRight,
} from "lucide-react";
import { API_BASE_URL } from "../config/api";
import { donationTiers, customDonationTier, DonationTier } from "../data/donationsData";

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
  status: "success" | "error" | "cancelled";
  title: string;
  message: string;
  receiptNumber?: string;
  amount?: string;
  onClose: () => void;
}

const StatusModal = ({
  isOpen,
  status,
  title,
  message,
  receiptNumber,
  amount,
  onClose,
}: StatusModalProps) => {
  if (!isOpen) return null;

  const icons = {
    success: (
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
        <Check className="h-8 w-8 text-emerald-600" />
      </div>
    ),
    error: (
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <X className="h-8 w-8 text-red-600" />
      </div>
    ),
    cancelled: (
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
        <X className="h-8 w-8 text-amber-600" />
      </div>
    ),
  };

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp my-auto border border-[#1E2A44]/10">
        <div className="p-8 text-center">
          {icons[status]}

          <h3 className="mt-6 text-2xl font-black text-[#1E2A44]">{title}</h3>

          <p className="mt-2 text-sm text-[#1E2A44]/70 leading-relaxed font-light">{message}</p>

          {status === "success" && receiptNumber && (
            <div className="mt-6 bg-[#FDFBF7] rounded-2xl p-5 border border-[#1E2A44]/10 text-center space-y-2">
              <div>
                <p className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest">
                  Official Receipt Number
                </p>
                <p className="text-base font-mono font-black text-[#1E2A44]">{receiptNumber}</p>
              </div>
              {amount && (
                <div className="pt-2 border-t border-[#1E2A44]/10">
                  <p className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest">
                    Amount Received
                  </p>
                  <p className="text-2xl font-black text-[#E8B923]">₹{parseFloat(amount).toLocaleString("en-IN")}</p>
                </div>
              )}
              <p className="text-[11px] text-[#1E2A44]/60 pt-1 font-light">
                An 80G tax receipt acknowledgment has also been dispatched to your email address.
              </p>
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-6 w-full bg-[#1E2A44] hover:bg-[#28385a] text-white font-bold py-3.5 rounded-full transition-all cursor-pointer shadow-md text-xs uppercase tracking-wider"
          >
            {status === "success" ? "Done" : "Close"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export interface DonateButtonProps {
  initialPackageId?: string;
  initialAmount?: string;
  buttonClassName?: string;
  children?: React.ReactNode;
}

const DonateButton: React.FC<DonateButtonProps> = ({
  initialPackageId,
  initialAmount,
  buttonClassName,
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState<"packages" | "form">("packages");
  const [selectedTier, setSelectedTier] = useState<DonationTier | typeof customDonationTier | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    status: "success" | "error" | "cancelled";
    title: string;
    message: string;
    receiptNumber?: string;
    amount?: string;
  }>({
    isOpen: false,
    status: "success",
    title: "",
    message: "",
  });

  const [formData, setFormData] = useState<DonationFormData>({
    donor_name: "",
    donor_email: "",
    donor_phone: "",
    amount: initialAmount || "",
    donation_purpose: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<DonationFormData>>({});

  useEffect(() => {
    if (isModalOpen || statusModal.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen, statusModal.isOpen]);

  const openWithPackage = (pkgId?: string, customAmt?: string) => {
    if (pkgId) {
      const found = donationTiers.find((t) => t.id === pkgId) || (pkgId === "custom" ? customDonationTier : null);
      if (found) {
        setSelectedTier(found);
        setFormData({
          ...formData,
          amount: found.amount > 0 ? found.amount.toString() : (customAmt || ""),
          donation_purpose: found.title,
        });
        setStep("form");
        setIsModalOpen(true);
        return;
      }
    }
    setStep("packages");
    setSelectedTier(null);
    setIsModalOpen(true);
  };

  const handleSelectTier = (tier: DonationTier | typeof customDonationTier) => {
    setSelectedTier(tier);
    setFormData({
      ...formData,
      amount: tier.amount > 0 ? tier.amount.toString() : "",
      donation_purpose: tier.title,
    });
    setStep("form");
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<DonationFormData> = {};

    if (!formData.donor_name.trim()) {
      newErrors.donor_name = "Full name is required";
    }

    if (!formData.donor_email.trim()) {
      newErrors.donor_email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.donor_email)) {
      newErrors.donor_email = "Please enter a valid email format";
    }

    if (!formData.donor_phone.trim()) {
      newErrors.donor_phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.donor_phone.replace(/\D/g, ""))) {
      newErrors.donor_phone = "Please enter a valid 10-digit mobile number";
    }

    const amt = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amt) || amt < 10) {
      newErrors.amount = "Minimum donation amount is ₹10";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/donations/create-order.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to initiate donation order.");
      }

      const options = {
        ...data.data.razorpay_config,
        handler: async function (resp: any) {
          try {
            const verifyResponse = await fetch(`${API_BASE_URL}/api/donations/verify-payment.php`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_signature: resp.razorpay_signature,
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
                status: "success",
                title: "Thank You for Your Generosity!",
                message:
                  "Your sponsorship has been successfully processed. Every rupee directly nourishes and empowers our students in Salangaon.",
                receiptNumber: verifyData.data.receipt_number,
                amount: formData.amount,
              });

              setFormData({
                donor_name: "",
                donor_email: "",
                donor_phone: "",
                amount: "",
                donation_purpose: "",
                message: "",
              });
              setStep("packages");
              setSelectedTier(null);
            } else {
              throw new Error(verifyData.message || "Payment verification failed.");
            }
          } catch (error: any) {
            setIsModalOpen(false);
            setStatusModal({
              isOpen: true,
              status: "error",
              title: "Verification Alert",
              message: error.message || "Your payment could not be automatically verified. Please contact us with your transaction ID.",
            });
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            setIsModalOpen(false);
            setStatusModal({
              isOpen: true,
              status: "cancelled",
              title: "Payment Cancelled",
              message: "The payment window was closed before completion. No amount was charged to your account.",
            });
          },
        },
      };

      if (!window.Razorpay) {
        throw new Error("Razorpay payment gateway failed to load. Please verify your connection.");
      }

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (failResp: any) {
        setIsProcessing(false);
        setIsModalOpen(false);
        setStatusModal({
          isOpen: true,
          status: "error",
          title: "Payment Declined",
          message: failResp.error?.description || "The payment transaction was declined by your bank. Please try another card or UPI method.",
        });
      });
      rzp.open();
    } catch (error: any) {
      setStatusModal({
        isOpen: true,
        status: "error",
        title: "Order Generation Failed",
        message: error.message || "Unable to reach donation payment gateway. Please try again shortly.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getTierIcon = (iconName: string) => {
    switch (iconName) {
      case "graduation":
        return <GraduationCap className="w-5 h-5" />;
      case "milk":
        return <Coffee className="w-5 h-5" />;
      case "food":
        return <Utensils className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  return (
    <>
      {/* Trigger Button */}
      {children ? (
        <div onClick={() => openWithPackage(initialPackageId, initialAmount)} className="cursor-pointer">
          {children}
        </div>
      ) : (
        <button
          onClick={() => openWithPackage(initialPackageId, initialAmount)}
          className={
            buttonClassName ||
            "relative group overflow-hidden rounded-full p-[2px] transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-[#E8B923]/20 cursor-pointer"
          }
          aria-label="Make a Donation"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#E8B923] via-amber-300 to-[#E8B923] rounded-full animate-pulse opacity-75 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1E2A44] transition-colors duration-300 group-hover:bg-[#1E2A44]/90">
            <Heart className="w-3.5 h-3.5 text-[#E8B923] fill-[#E8B923] animate-bounce" />
            <span className="text-white font-extrabold text-xs tracking-wider">DONATE</span>
          </span>
        </button>
      )}

      {/* Main Donation Modal */}
      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl animate-slideUp my-auto flex flex-col">

              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#E8B923] mb-1">
                    {step === "packages" ? "Child Sponsorship" : "Complete your donation"}
                  </p>
                  <h2 className="text-lg font-bold text-[#1E2A44] leading-snug">
                    {step === "packages" ? "Choose a sponsorship" : selectedTier?.title || "Donation"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setStep("packages");
                    setSelectedTier(null);
                  }}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-all cursor-pointer ml-4 shrink-0 mt-0.5"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-stone-100 mx-6" />

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[75vh] p-6">
                {step === "packages" ? (
                  <div className="space-y-3">
                    {donationTiers.map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => handleSelectTier(tier)}
                        className={`w-full text-left rounded-xl p-4 flex items-center justify-between gap-4 transition-all cursor-pointer group ${
                          tier.popular
                            ? "bg-[#1E2A44] text-white"
                            : "bg-stone-50 hover:bg-stone-100 text-[#1E2A44]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.colorGradient} flex items-center justify-center text-white shrink-0`}>
                            {getTierIcon(tier.iconName)}
                          </div>
                          <div>
                            <p className={`text-sm font-semibold leading-snug ${tier.popular ? "text-white" : "text-[#1E2A44]"}`}>
                              {tier.title}
                            </p>
                            <p className={`text-xs mt-0.5 ${tier.popular ? "text-white/70" : "text-stone-500"}`}>
                              {tier.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={`text-base font-bold ${tier.popular ? "text-[#E8B923]" : "text-[#1E2A44]"}`}>
                            ₹{tier.amount.toLocaleString("en-IN")}
                          </p>
                          <p className={`text-[10px] ${tier.popular ? "text-white/60" : "text-stone-400"}`}>/year</p>
                        </div>
                      </button>
                    ))}

                    {/* Custom Amount */}
                    <button
                      onClick={() => handleSelectTier(customDonationTier)}
                      className="w-full text-left rounded-xl p-4 flex items-center justify-between gap-4 bg-stone-50 hover:bg-stone-100 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-stone-200 flex items-center justify-center text-stone-600 shrink-0">
                          <Heart className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#1E2A44]">Custom amount</p>
                          <p className="text-xs text-stone-500 mt-0.5">Donate any amount you'd like</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400" />
                    </button>
                  </div>
                ) : (
                  // Step 2: Form
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("packages");
                        setSelectedTier(null);
                        setErrors({});
                      }}
                      className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-[#1E2A44] transition-colors cursor-pointer mb-1"
                    >
                      ← Back
                    </button>

                    {/* Amount pill */}
                    {selectedTier && selectedTier.amount > 0 && (
                      <div className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-3">
                        <span className="text-sm text-stone-500">Amount</span>
                        <span className="text-lg font-bold text-[#1E2A44]">₹{selectedTier.amount.toLocaleString("en-IN")}</span>
                      </div>
                    )}

                    {/* Custom amount input */}
                    {selectedTier && selectedTier.amount === 0 && (
                      <div>
                        <label className="block text-xs font-medium text-stone-500 mb-1.5">Amount (₹)</label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                          <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            placeholder="e.g. 5000"
                            min="10"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 font-semibold text-[#1E2A44] focus:outline-none focus:ring-2 focus:ring-[#E8B923] focus:border-transparent transition-all"
                          />
                        </div>
                        {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-1.5">Full name *</label>
                      <input
                        type="text"
                        value={formData.donor_name}
                        onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                        placeholder="Rahul Sharma"
                        className={`w-full px-4 py-3 rounded-xl bg-stone-50 border text-sm text-[#1E2A44] focus:outline-none focus:ring-2 focus:ring-[#E8B923] focus:border-transparent transition-all ${
                          errors.donor_name ? "border-red-400 bg-red-50" : "border-stone-200"
                        }`}
                      />
                      {errors.donor_name && <p className="text-xs text-red-500 mt-1">{errors.donor_name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-1.5">Email address *</label>
                      <input
                        type="email"
                        value={formData.donor_email}
                        onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-stone-50 border text-sm text-[#1E2A44] focus:outline-none focus:ring-2 focus:ring-[#E8B923] focus:border-transparent transition-all ${
                          errors.donor_email ? "border-red-400 bg-red-50" : "border-stone-200"
                        }`}
                      />
                      {errors.donor_email && <p className="text-xs text-red-500 mt-1">{errors.donor_email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-1.5">Phone number *</label>
                      <input
                        type="tel"
                        value={formData.donor_phone}
                        onChange={(e) => setFormData({ ...formData, donor_phone: e.target.value })}
                        placeholder="9876543210"
                        className={`w-full px-4 py-3 rounded-xl bg-stone-50 border text-sm text-[#1E2A44] focus:outline-none focus:ring-2 focus:ring-[#E8B923] focus:border-transparent transition-all ${
                          errors.donor_phone ? "border-red-400 bg-red-50" : "border-stone-200"
                        }`}
                      />
                      {errors.donor_phone && <p className="text-xs text-red-500 mt-1">{errors.donor_phone}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-1.5">Message <span className="text-stone-400">(optional)</span></label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={2}
                        placeholder="A note or dedication..."
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-[#1E2A44] focus:outline-none focus:ring-2 focus:ring-[#E8B923] focus:border-transparent resize-none transition-all"
                      />
                    </div>

                    {/* 80G note */}
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      Eligible for tax exemption under <span className="font-semibold text-stone-500">Section 80G</span>. A receipt will be sent to your email.
                    </p>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-[#1E2A44] hover:bg-[#28385a] text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 text-sm"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 text-[#E8B923] fill-[#E8B923]" />
                          <span>
                            Pay ₹{formData.amount ? parseFloat(formData.amount).toLocaleString("en-IN") : (selectedTier && selectedTier.amount > 0 ? selectedTier.amount.toLocaleString("en-IN") : "0")}
                          </span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Payment Status Modal */}
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
