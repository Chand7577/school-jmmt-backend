import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Heart,
  QrCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Mail,
} from "lucide-react";
// import { API_BASE_URL } from "../config/api";
import { donationTiers, customDonationTier, DonationTier } from "../data/donationsData";
import qrCodePdf from "../assets/qr-code.pdf";
import qrCodeImg from "../assets/qr-code.png";

/* =========================================================================
   PAYMENT GATEWAY / RAZORPAY TYPE DECLARATION (KEPT FOR FUTURE USE)
   ========================================================================= */
/*
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
*/

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
  const [selectedTier, setSelectedTier] = useState<DonationTier | typeof customDonationTier | null>(null);
  const [copied, setCopied] = useState(false);

  const upiId = "9412057444m@pnb";
  const merchantName = "THE JOHN MARTYN MEMORIAL TRUST";
  const upiDeepLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    merchantName
  )}&cu=INR`;

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = upiId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  /* =========================================================================
     PAYMENT GATEWAY STATE & FORM HANDLER (COMMENTED OUT FOR NOW)
     =========================================================================
  const [step, setStep] = useState<"packages" | "form">("packages");
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

  const validateForm = (): boolean => {
    const newErrors: Partial<DonationFormData> = {};
    if (!formData.donor_name.trim()) newErrors.donor_name = "Full name is required";
    if (!formData.donor_email.trim()) newErrors.donor_email = "Email address is required";
    if (!formData.donor_phone.trim()) newErrors.donor_phone = "Phone number is required";
    const amt = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amt) || amt < 10) newErrors.amount = "Minimum donation amount is ₹10";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsProcessing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/donations/create-order.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Failed to initiate donation order.");

      const options = {
        ...data.data.razorpay_config,
        handler: async function (resp: any) {
          try {
            const verifyResponse = await fetch(`${API_BASE_URL}/api/donations/verify-payment.php`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
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
                message: "Your sponsorship has been successfully processed.",
                receiptNumber: verifyData.data.receipt_number,
                amount: formData.amount,
              });
            } else {
              throw new Error(verifyData.message || "Payment verification failed.");
            }
          } catch (error: any) {
            setStatusModal({
              isOpen: true,
              status: "error",
              title: "Verification Alert",
              message: error.message || "Verification failed.",
            });
          }
        },
      };

      if (!window.Razorpay) throw new Error("Razorpay gateway failed to load.");
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      setStatusModal({
        isOpen: true,
        status: "error",
        title: "Order Generation Failed",
        message: error.message,
      });
    } finally {
      setIsProcessing(false);
    }
  };
  ========================================================================= */

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const openWithPackage = (pkgId?: string, customAmt?: string) => {
    if (pkgId) {
      const found =
        donationTiers.find((t) => t.id === pkgId) ||
        (pkgId === "custom"
          ? {
              ...customDonationTier,
              amount: customAmt ? parseFloat(customAmt) || 0 : 0,
            }
          : null);
      if (found) {
        setSelectedTier(found);
        setIsModalOpen(true);
        return;
      }
    }
    setSelectedTier(null);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Trigger Button */}
      {children ? (
        <div
          onClick={() => openWithPackage(initialPackageId, initialAmount)}
          className="cursor-pointer"
        >
          {children}
        </div>
      ) : (
        <button
          onClick={() => openWithPackage(initialPackageId, initialAmount)}
          className={
            buttonClassName ||
            "relative group overflow-hidden rounded-full p-[2px] transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-[#E8B923]/20 cursor-pointer"
          }
          aria-label="Make a Donation via QR Code"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#E8B923] via-amber-300 to-[#E8B923] rounded-full animate-pulse opacity-75 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1E2A44] transition-colors duration-300 group-hover:bg-[#1E2A44]/90">
            <Heart className="w-3.5 h-3.5 text-[#E8B923] fill-[#E8B923] animate-bounce" />
            <span className="text-white font-extrabold text-xs tracking-wider">
              DONATE
            </span>
          </span>
        </button>
      )}

      {/* ── QR CODE DONATION MODAL (ACTIVE) ── */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl animate-slideUp my-auto flex flex-col overflow-hidden border border-[#1E2A44]/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4 bg-gradient-to-r from-[#1E2A44] to-[#162035] text-white">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8B923]/20 text-[#E8B923] text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5 border border-[#E8B923]/30">
                    <QrCode className="w-3 h-3" />
                    <span>Official Bank QR • Zero Charges</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
                    Scan to Pay via UPI
                  </h2>
                  <p className="text-xs text-white/70 font-light mt-0.5">
                    {selectedTier && selectedTier.amount > 0 ? (
                      <span>
                        Package: <strong className="text-[#E8B923]">{selectedTier.title}</strong> (₹{selectedTier.amount.toLocaleString("en-IN")})
                      </span>
                    ) : (
                      <span>Donate directly to The John Martyn Memorial Trust</span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer ml-3 shrink-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div className="overflow-y-auto max-h-[78vh] p-6 space-y-5 bg-[#FDFBF7]">
                {/* 80G Tax Exemption Note (At Top Before QR Code) */}
                <div className="bg-amber-500/10 border border-[#E8B923]/40 rounded-2xl p-4 space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-2 text-[#1E2A44] font-black text-xs">
                    <ShieldCheck className="w-4 h-4 text-[#E8B923]" />
                    <span>80G Tax Exemption Receipt</span>
                  </div>
                  <p className="text-[11px] text-[#1E2A44]/80 leading-relaxed font-light">
                    Your contribution is tax-deductible under <strong>Section 80G</strong>. Once you finish payment, please email your transaction screenshot/UTR along with your full name, <strong>PAN / Aadhaar Card</strong>, and address to:
                  </p>
                  <a
                    href="mailto:jmms.dehradun@gmail.com?subject=Donation%20Receipt%2080G"
                    className="inline-flex items-center gap-1.5 font-mono font-bold text-[11px] text-[#1E2A44] bg-white px-2.5 py-1 rounded-md border border-amber-300 hover:bg-amber-100 transition-colors shadow-2xs"
                  >
                    <Mail className="w-3 h-3 text-[#E8B923]" />
                    <span>jmms.dehradun@gmail.com</span>
                  </a>
                </div>

                {/* QR Code Standee Card */}
                <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col items-center text-center">
                  <div className="flex items-center justify-between w-full pb-2.5 mb-2.5 border-b border-stone-100 text-[11px] font-mono text-stone-500">
                    <span className="font-bold text-[#1E2A44] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Punjab National Bank
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
                      VERIFIED TRUST
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-stone-200 bg-[#FAF9F5] p-1 shadow-inner max-w-[280px]">
                    <img
                      src={qrCodeImg}
                      alt="The John Martyn Memorial Trust UPI QR Code"
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p className="mt-2.5 text-[11px] text-stone-500 font-mono">
                    Scan with Google Pay, PhonePe, Paytm, BHIM, or any UPI app
                  </p>

                  {/* PDF Download and View Buttons */}
                  <div className="grid grid-cols-2 gap-2 w-full mt-4 pt-3 border-t border-stone-100">
                    <a
                      href={qrCodePdf}
                      download="John-Martyn-Memorial-Trust-QR.pdf"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1E2A44] hover:bg-[#28385a] text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-[#E8B923]" />
                      <span>Download PDF</span>
                    </a>
                    <a
                      href={qrCodePdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#1E2A44] text-[11px] font-bold uppercase tracking-wider transition-colors border border-stone-200"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View PDF</span>
                    </a>
                  </div>
                </div>

                {/* UPI Details & Copy Box */}
                <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3">
                  <div>
                    <p className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest">
                      Merchant Name
                    </p>
                    <p className="text-sm font-black text-[#1E2A44] mt-0.5">
                      {merchantName}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest mb-1">
                      Official UPI ID
                    </label>
                    <div className="flex items-center justify-between gap-2 bg-[#FAF9F5] p-2.5 rounded-xl border border-dashed border-[#E8B923]">
                      <span className="font-mono font-black text-sm sm:text-base text-[#1E2A44] select-all">
                        {upiId}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs shrink-0 ${
                          copied
                            ? "bg-emerald-600 text-white"
                            : "bg-[#E8B923] hover:bg-[#d4a61f] text-[#1E2A44]"
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy UPI</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Mobile Deep Link */}
                  <a
                    href={upiDeepLink}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1E2A44]/5 hover:bg-[#1E2A44]/10 text-[#1E2A44] text-xs font-bold transition-colors border border-[#1E2A44]/10"
                  >
                    <Smartphone className="w-4 h-4 text-[#E8B923]" />
                    <span>Pay directly via UPI App on your phone</span>
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* =========================================================================
         ORIGINAL PAYMENT GATEWAY / RAZORPAY MODAL (COMMENTED OUT FOR NOW)
         To restore the payment gateway, uncomment the block below and the
         corresponding state and handleSubmit logic above.
         ========================================================================= */}
      {/*
      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl animate-slideUp my-auto flex flex-col">
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

              <div className="h-px bg-stone-100 mx-6" />

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

                    {selectedTier && selectedTier.amount > 0 && (
                      <div className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-3">
                        <span className="text-sm text-stone-500">Amount</span>
                        <span className="text-lg font-bold text-[#1E2A44]">₹{selectedTier.amount.toLocaleString("en-IN")}</span>
                      </div>
                    )}

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

                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      Eligible for tax exemption under <span className="font-semibold text-stone-500">Section 80G</span>. A receipt will be sent to your email.
                    </p>

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
      */}
    </>
  );
};

export default DonateButton;
