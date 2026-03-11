import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUpRight,
  Heart
} from "lucide-react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const companyLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Delivery", path: "/delivery" },
    { label: "Privacy Policy", path: "/privacy" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gray-50 pt-20 pb-8 overflow-hidden"
    >
      {/* Top Wave Decoration */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-white">
        <svg 
          className="absolute bottom-0 w-full h-20 text-gray-50 fill-current" 
          viewBox="0 0 1440 80" 
          preserveAspectRatio="none"
        >
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Brand Column - Takes 5 columns */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block group">
              <img 
                src={assets.logo} 
                alt="Forever" 
                className="w-36 transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>
            
            <p className="text-gray-600 text-[15px] leading-relaxed max-w-md">
              Forever is your trusted online shopping destination where quality
              meets affordability. We bring you the latest trends in fashion,
              electronics, and lifestyle products — all in one place.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-white hover:border-transparent hover:bg-gray-900 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links - Takes 3 columns */}
          <div className="lg:col-span-3 lg:pl-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    <span className="text-[15px]">{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Takes 4 columns */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+923117343706" 
                  className="group flex items-start gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-gray-900 transition-colors duration-200">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                    <p className="text-[15px] font-medium">+92-311-7343706</p>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:malixoman@gmail.com" 
                  className="group flex items-start gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-gray-900 transition-colors duration-200">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Email</p>
                    <p className="text-[15px] font-medium">malixoman@gmail.com</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Address</p>
                  <p className="text-[15px] font-medium">Pakistan</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Mini Section */}
        <div className={`relative mb-16 p-8 rounded-2xl bg-gray-900 overflow-hidden transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold text-white mb-1">Stay Updated</h4>
              <p className="text-gray-400 text-sm">Get the latest deals and updates directly to your inbox.</p>
            </div>
            <Link 
              to="/" 
              className="group flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold text-sm hover:bg-gray-100 transition-all duration-300"
            >
              Subscribe Now
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t border-gray-200 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © 2026 <span className="font-semibold text-gray-900">FOREVER.com</span>. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
              <Link to="/cookies" className="hover:text-gray-900 transition-colors">Cookies</Link>
            </div>

            <p className="flex items-center gap-1 text-sm text-gray-500">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Malik Oman
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;