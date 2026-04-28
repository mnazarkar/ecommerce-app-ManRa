import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="absolute left-0 w-full bg-gradient-to-tr from-violet-900 via-violet-800 to-fuchsia-800 text-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">

        <div>
          <h3 className="text-white font-semibold mb-3">About</h3>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-400 hover:text-white cursor-pointer">Our Story</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Careers</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Press</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Blog</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Help</h3>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-400 hover:text-white cursor-pointer">Payments</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Shipping</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Returns</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">FAQs</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="text-gray-400 hover:text-white flex items-center gap-2">
              <MapPin size={16} /> Pune, India
            </li>
            <li className="text-gray-400 hover:text-white flex items-center gap-2">
              <Phone size={16} /> +91 91456 00221
            </li>
            <li className="text-gray-400 hover:text-white flex items-center gap-2">
              <Mail size={16} /> support@manra.com
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>

          <div className="flex gap-4 mb-4">
            <Facebook className="cursor-pointer text-gray-400 hover:text-white" />
            <Instagram className="cursor-pointer text-gray-400 hover:text-white" />
            <Twitter className="cursor-pointer text-gray-400 hover:text-white" />
            <Linkedin className="cursor-pointer text-gray-400 hover:text-white" />
          </div>

          <p className="text-white text-sm">
            Stay connected for latest deals & updates
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-sm">
        © 2026 ManRa. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;