import React, { useState } from 'react';
import { Mail, Phone, MapPin, User, Tag, Edit3, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-white transition-colors duration-300">
      
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch text-left">
          
          {/* Contact Details - Left (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between py-4">
            <div className="space-y-6">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-neutral-450 dark:text-neutral-500 uppercase">
                GET IN TOUCH
              </span>
              
              <h1 className="font-oswald text-4xl sm:text-5xl font-bold tracking-[0.2em] leading-none uppercase">
                CONTACT US
              </h1>
              
              <p className="font-mono text-xs font-bold tracking-[0.15em] text-neutral-500 dark:text-neutral-400 uppercase">
                // WE'RE HERE TO HELP.
              </p>
              
              <p className="text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed max-w-md pt-2">
                Have a question, suggestion, or just want to say hello? We'd love to hear from you. Reach out to us and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* Direct Lines */}
            <div className="space-y-6 pt-10 border-t border-neutral-100 dark:border-neutral-900 mt-10">
              
              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="text-neutral-950 dark:text-white mt-1">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-oswald text-xs font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                    EMAIL
                  </h4>
                  <a href="mailto:support@soluswear.com" className="text-sm font-medium hover:underline">
                    support@soluswear.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="text-neutral-950 dark:text-white mt-1">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-oswald text-xs font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                    PHONE
                  </h4>
                  <a href="tel:+919876543210" className="text-sm font-medium hover:underline">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4 items-start">
                <div className="text-neutral-950 dark:text-white mt-1">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-oswald text-xs font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                    ADDRESS
                  </h4>
                  <p className="text-sm font-medium">
                    Pune, Maharashtra, India
                  </p>
                </div>
              </div>

            </div>
          </div>
          
          {/* Interactive Form with Gym Overlay Backdrop - Right (7 cols) */}
          <div 
            className="lg:col-span-7 border border-neutral-250 dark:border-neutral-850 overflow-hidden relative flex flex-col justify-center p-8 sm:p-12 min-h-[500px]"
            style={{
              backgroundImage: "url('/images/hero.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Dark Mask Overlay */}
            <div className="absolute inset-0 bg-black/85 z-0" />
            
            {/* Form Content */}
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6 w-full text-white">
              
              {/* Toast Notification */}
              {isSubmitted && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 text-xs uppercase tracking-wider font-mono flex items-center gap-2">
                  <Check size={14} /> Message dispatched successfully. Stay disciplined.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-neutral-500">
                    <User size={14} />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border border-neutral-700 focus:border-white focus:outline-none p-3.5 pl-11 text-xs text-white rounded-none placeholder-neutral-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-neutral-500">
                    <Mail size={14} />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border border-neutral-700 focus:border-white focus:outline-none p-3.5 pl-11 text-xs text-white rounded-none placeholder-neutral-500 transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center text-neutral-500">
                  <Tag size={14} />
                </span>
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-transparent border border-neutral-700 focus:border-white focus:outline-none p-3.5 pl-11 text-xs text-white rounded-none placeholder-neutral-500 transition-colors"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-neutral-500">
                  <Edit3 size={14} />
                </span>
                <textarea
                  required
                  rows={6}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border border-neutral-700 focus:border-white focus:outline-none p-3.5 pl-11 text-xs text-white rounded-none placeholder-neutral-500 transition-colors resize-none"
                />
              </div>

              {/* Submit panel */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="bg-white text-black font-oswald text-xs font-bold tracking-widest px-8 py-3.5 uppercase hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2.5 rounded-none cursor-pointer"
                >
                  Send Message <ArrowRight size={14} />
                </button>
                
                <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
                  <ShieldCheck size={14} className="text-neutral-500" />
                  <span>We respect your privacy. Your information is safe with us.</span>
                </div>
              </div>

            </form>
          </div>
          
        </div>
      </section>

    </div>
  );
};
