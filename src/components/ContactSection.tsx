import { useState, type FormEvent } from "react";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { MapPin, Phone, Mail, Check, ArrowRight } from "./ui/Icons";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsSubmitted(false);
  };

  const sectionRef = useGsapReveal({
    targets: [
      { selector: ".contact-header", variant: "fadeUp",    duration: 0.6 },
      { selector: ".contact-left",   variant: "slideLeft", duration: 0.7, delay: 0.1, distance: 60 },
      { selector: ".contact-right",  variant: "slideRight",duration: 0.7, delay: 0.15, distance: 60 },
    ],
    triggerStart: "top 95%",
  });

  return (
    <section id="contact" ref={sectionRef} className="py-14 lg:py-28 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background subtle elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="contact-header text-center max-w-3xl mx-auto mb-10 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E2A44]/5 border border-[#1E2A44]/10 text-xs font-bold text-[#1E2A44] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
            <span>CHAPTER 08 • DIRECT COMMUNICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2A44] tracking-tight">
            GET IN TOUCH <span className="text-[#E8B923]">WITH US</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1E2A44]/75 leading-relaxed">
            Have questions about admissions, sponsoring a rural child’s schooling, 
            or visiting our campus in Salangaon? Send us a message and our team will get back to you.
          </p>
        </div>

        {/* Contact Container: Info Card (Left) + Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: School Contact & Location Details */}
          <div className="contact-left lg:col-span-5 bg-[#1E2A44] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#E8B923]/15 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-8">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  School Administration
                </span>
                <h3 className="text-2xl font-black text-white mt-3">
                  John Martyn Memorial School
                </h3>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Nurturing young minds in rural Dehradun since 1985.
                </p>
              </div>

              {/* Contact points list */}
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Campus Address
                    </p>
                    <p className="text-white/80 mt-0.5 leading-relaxed text-xs sm:text-sm">
                      Village Salangaon, P.O. Bhagwantpur,
                      <br />
                      Dehradun, Uttarakhand 248009, India
                    </p>
                    <a
                      href="https://www.google.com/maps/place/John+Martyn+Memorial+School/@30.408385,78.073935,12z/data=!4m6!3m5!1s0x3908d71a4c5e4785:0xbfba3c0fb50ce177!8m2!3d30.4083847!4d78.0739347!16s%2Fg%2F1hjgs0f1h?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MDkyMS4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-200 font-semibold mt-1 transition-colors"
                    >
                      <span>View on Google Maps</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Call Us Directly
                    </p>
                    <a
                      href="tel:+919762167982"
                      className="text-white font-bold hover:text-amber-300 transition-colors block mt-0.5"
                    >
                      +91-9762167982
                    </a>
                    <div className="text-[11px] text-white/70 mt-1 space-y-0.5">
                      <p><span className="text-amber-300 font-semibold">Summer:</span> 8:00 AM – 2:00 PM</p>
                      <p><span className="text-amber-300 font-semibold">Winter:</span> 8:30 AM – 2:30 PM (Mon – Sat)</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Official Email
                    </p>
                    <a
                      href="mailto:jmms.dehradun@gmail.com"
                      className="text-white font-bold hover:text-amber-300 transition-colors block mt-0.5"
                    >
                      jmms.dehradun@gmail.com
                    </a>
                    <p className="text-[11px] text-white/50">Inquiries answered within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Follow Us
                    </p>
                    <a
                      href="https://www.instagram.com/jmms.24?stkn=MXR2enhmc3FudXpncA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold hover:text-amber-300 transition-colors block mt-0.5"
                    >
                      @jmms.24 on Instagram
                    </a>
                    <p className="text-[11px] text-white/50">Latest updates & school life</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
              <span>Visitors welcome with appointment</span>
              <span className="text-amber-300 font-bold">Salangaon, Dehradun</span>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="contact-right lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200/80 shadow-xl relative">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-5 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Check size={28} />
                </div>
                <h3 className="text-2xl font-black text-[#1E2A44]">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#1E2A44]">{formData.name}</strong>. Your message regarding <strong className="text-[#1E2A44]">"{formData.subject}"</strong> has reached our school administration office. We will reply to <strong className="text-[#1E2A44]">{formData.email}</strong> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-[#1E2A44] text-white font-bold text-xs hover:bg-amber-600 transition-colors shadow-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1E2A44]">
                    Send Us a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1E2A44]/70 mt-1">
                    Fill out the details below and we will get back to you promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold text-[#1E2A44] uppercase tracking-wider"
                    >
                      Your Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Sunita Devi"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-gray-200 focus:border-[#E8B923] focus:ring-2 focus:ring-[#E8B923]/20 text-sm text-[#1E2A44] outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold text-[#1E2A44] uppercase tracking-wider"
                    >
                      Email Address <span className="text-amber-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. sunita@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-gray-200 focus:border-[#E8B923] focus:ring-2 focus:ring-[#E8B923]/20 text-sm text-[#1E2A44] outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-bold text-[#1E2A44] uppercase tracking-wider"
                  >
                    Subject <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    placeholder="e.g. Admission Inquiry for Class 2 / Student Sponsorship"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-gray-200 focus:border-[#E8B923] focus:ring-2 focus:ring-[#E8B923]/20 text-sm text-[#1E2A44] outline-none transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold text-[#1E2A44] uppercase tracking-wider"
                  >
                    Your Message <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Please write your query, questions, or message for the school team..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-gray-200 focus:border-[#E8B923] focus:ring-2 focus:ring-[#E8B923]/20 text-sm text-[#1E2A44] outline-none transition-all placeholder:text-gray-400 resize-y"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E8B923] text-[#1E2A44] font-black text-sm hover:bg-amber-400 active:scale-95 shadow-lg shadow-[#E8B923]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#1E2A44] border-t-transparent rounded-full animate-spin"></span>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
