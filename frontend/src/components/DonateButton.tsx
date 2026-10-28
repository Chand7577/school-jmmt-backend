import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Heart,
  IndianRupee,
  Mail,
  Phone,
  User,
  MessageSquare,
  GraduationCap,
  Utensils,
  Coffee,
  Check,
  ShieldCheck,
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
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
            <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#FDFBF7] rounded-3xl shadow-2xl overflow-hidden animate-slideUp my-auto border border-[#1E2A44]/15 flex flex-col">
              {/* Header */}
              <div className="bg-[#1E2A44] text-white p-6 sm:p-7 flex items-center justify-between shrink-0 relative overflow-hidden border-b border-white/10">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8B923]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-3.5 relative z-10">
                  <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-[#E8B923]">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {step === "packages" ? "Sponsor a Rural Child · JMMS" : selectedTier?.title || "Complete Donation"}
                    </h2>
                    <p className="text-xs text-white/70 font-light">
                      {step === "packages"
                        ? "Choose a specific student sponsorship tier or enter custom amount"
                        : "Secure online contribution powered by Razorpay · 80G Tax Exempt"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setStep("packages");
                    setSelectedTier(null);
                  }}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer relative z-10"
                  aria-label="Close donation modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="overflow-y-auto flex-1 p-6 sm:p-8">
                {step === "packages" ? (
                  // Step 1: Specific Sponsorship Tiers
                  <div className="space-y-6">
                    <div className="text-center max-w-xl mx-auto space-y-1 mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B923] font-bold">
                        Direct Child Sponsorship
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-[#1E2A44]">
                        Select Your Sponsorship Impact
                      </h3>
                      <p className="text-xs text-[#1E2A44]/70 font-light">
                        100% of your gift reaches rural children at John Martyn Memorial School in Salangaon.
                      </p>
                    </div>

                    {/* 3 Specific Donation Tiers */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {donationTiers.map((tier) => (
                        <div
                          key={tier.id}
                          className={`relative rounded-3xl bg-white border-2 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                            tier.popular
                              ? "border-[#E8B923] shadow-md ring-2 ring-[#E8B923]/20"
                              : "border-[#1E2A44]/10 hover:border-[#1E2A44]/30"
                          }`}
                        >
                          {tier.badge && (
                            <span
                              className={`absolute -top-3 left-6 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border shadow-sm ${
                                tier.badgeColor || "bg-amber-100 text-amber-900 border-amber-300"
                              }`}
                            >
                              {tier.badge}
                            </span>
                          )}

                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div
                                className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${tier.colorGradient} flex items-center justify-center text-white shadow-md`}
                              >
                                {getTierIcon(tier.iconName)}
                              </div>
                              <span className="text-[10px] font-mono uppercase text-stone-400 font-bold tracking-widest">
                                Annual
                              </span>
                            </div>

                            <h4 className="text-base font-black text-[#1E2A44] leading-snug">{tier.title}</h4>
                              <p className="text-xs text-[#1E2A44]/65 font-light leading-relaxed mt-2">
                                {tier.description}
                              </p>

                            <div className="my-5 py-3 border-y border-[#1E2A44]/10">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-3xl font-black text-[#1E2A44]">
                                  ₹{tier.amount.toLocaleString("en-IN")}
                                </span>
                                <span className="text-[11px] font-mono text-stone-500">/ yr</span>
                              </div>
                            </div>

                            <p className="text-xs text-[#1E2A44]/65 font-light leading-relaxed mt-2 mb-6">
                              {tier.description}
                            </p>
                          </div>

                          <button
                            onClick={() => handleSelectTier(tier)}
                            className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                              tier.popular
                                ? "bg-[#E8B923] hover:bg-[#d4a61f] text-[#1E2A44] shadow-md"
                                : "bg-[#1E2A44] hover:bg-[#28385a] text-white"
                            }`}
                          >
                            <span>Sponsor This</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Custom Amount Option */}
                    <div className="mt-6 p-6 rounded-3xl bg-white border border-[#1E2A44]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#E8B923] shrink-0">
                          <Heart className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-[#1E2A44]">Want to contribute a custom amount?</h4>
                          <p className="text-xs text-[#1E2A44]/65 font-light">
                            Every rupee supports classroom supplies, library books, and sports equipment.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectTier(customDonationTier)}
                        className="px-6 py-2.5 rounded-full bg-[#FDFBF7] hover:bg-stone-100 text-[#1E2A44] border border-[#1E2A44]/20 text-xs font-bold transition-all shrink-0 cursor-pointer"
                      >
                        Enter Custom Amount →
                      </button>
                    </div>
                  </div>
                ) : (
                  // Step 2: Donor Details Form
                  <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("packages");
                        setSelectedTier(null);
                        setErrors({});
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E2A44] hover:text-[#E8B923] transition-colors cursor-pointer"
                    >
                      ← Back to sponsorship packages
                    </button>

                    {/* Selected Tier Banner */}
                    <div className="p-5 rounded-2xl bg-amber-500/10 border border-[#E8B923]/30 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B923] font-bold block">
                          Selected Sponsorship
                        </span>
                        <h4 className="text-base font-black text-[#1E2A44]">{selectedTier?.title}</h4>
                        <p className="text-xs text-[#1E2A44]/75 font-light">{selectedTier?.description}</p>
                      </div>

                      <div className="text-right shrink-0">
                        {selectedTier && selectedTier.amount > 0 ? (
                          <span className="text-2xl font-black text-[#1E2A44]">
                            ₹{selectedTier.amount.toLocaleString("en-IN")}
                          </span>
                        ) : (
                          <span className="text-xs font-mono font-bold text-amber-800 uppercase">Custom Amount</span>
                        )}
                      </div>
                    </div>

                    {/* Amount Input (editable only if custom) */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2A44] mb-1.5">
                        Donation Amount (INR) *
                      </label>
                      <div className="relative">
                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="number"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                          readOnly={selectedTier ? selectedTier.amount > 0 : false}
                          placeholder="e.g. 5000"
                          min="10"
                          className={`w-full pl-11 pr-4 py-3 rounded-2xl border bg-white font-bold text-base text-[#1E2A44] focus:outline-none focus:ring-2 focus:ring-[#E8B923] transition-all ${
                            selectedTier && selectedTier.amount > 0
                              ? "bg-stone-50 border-stone-200 text-stone-700 cursor-not-allowed"
                              : "border-[#1E2A44]/20"
                          }`}
                        />
                      </div>
                      {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
                    </div>

                    {/* Donor Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2A44] mb-1.5">
                          <User className="w-3.5 h-3.5 inline mr-1 text-stone-400" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.donor_name}
                          onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className={`w-full px-4 py-3 rounded-2xl border bg-white text-sm text-[#1E2A44] focus:outline-none focus:ring-2 focus:ring-[#E8B923] ${
                            errors.donor_name ? "border-red-400" : "border-[#1E2A44]/20"
                          }`}
                        />
                        {errors.donor_name && <p className="text-xs text-red-500 mt-1">{errors.donor_name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2A44] mb-1.5">
                          <Mail className="w-3.5 h-3.5 inline mr-1 text-stone-400" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.donor_email}
                          onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                          placeholder="for 80G tax receipt"
                          className={`w-full px-4 py-3 rounded-2xl border bg-white text-sm text-[#1E2A44] focus:outline-none focus:ring-2 focus:ring-[#E8B923] ${
                            errors.donor_email ? "border-red-400" : "border-[#1E2A44]/20"
                          }`}
                        />
                        {errors.donor_email && <p className="text-xs text-red-500 mt-1">{errors.donor_email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2A44] mb-1.5">
                          <Phone className="w-3.5 h-3.5 inline mr-1 text-stone-400" />
                          Phone Number (10 digits) *
                        </label>
                        <input
                          type="tel"
                          value={formData.donor_phone}
                          onChange={(e) => setFormData({ ...formData, donor_phone: e.target.value })}
                          placeholder="e.g. 9876543210"
                          className={`w-full px-4 py-3 rounded-2xl border bg-white text-sm text-[#1E2A44] focus:outline-none focus:ring-2 focus:ring-[#E8B923] ${
                            errors.donor_phone ? "border-red-400" : "border-[#1E2A44]/20"
                          }`}
                        />
                        {errors.donor_phone && <p className="text-xs text-red-500 mt-1">{errors.donor_phone}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2A44] mb-1.5">
                          Donation Purpose
                        </label>
                        <input
                          type="text"
                          value={formData.donation_purpose || "General Student Sponsorship"}
                          onChange={(e) => setFormData({ ...formData, donation_purpose: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm text-[#1E2A44]"
                          readOnly
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2A44] mb-1.5">
                        <MessageSquare className="w-3.5 h-3.5 inline mr-1 text-stone-400" />
                        Message / Dedication Note (Optional)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={2}
                        placeholder="In honor of... or words of encouragement for our children"
                        className="w-full px-4 py-3 rounded-2xl border border-[#1E2A44]/20 bg-white text-sm text-[#1E2A44] focus:outline-none focus:ring-2 focus:ring-[#E8B923] resize-none"
                      />
                    </div>

                    {/* Tax & Trust Note */}
                    <div className="p-4 rounded-2xl bg-white border border-[#1E2A44]/10 flex items-start gap-3 text-xs text-[#1E2A44]/70">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        Donations to John Martyn Memorial Trust are eligible for tax exemption under{" "}
                        <strong className="text-[#1E2A44]">Section 80G of the Income Tax Act</strong>. An official
                        receipt will be generated instantly.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-[#1E2A44] hover:bg-[#28385a] text-white font-black py-4 rounded-full transition-all disabled:opacity-50 cursor-pointer shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Connecting to Razorpay Gateway...</span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 text-[#E8B923] fill-[#E8B923]" />
                          <span>
                            Proceed to Secure Payment · ₹
                            {formData.amount ? parseFloat(formData.amount).toLocaleString("en-IN") : "0"}
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
