import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSettings } from '../api/settings';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await getSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Clinic Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/logo.png" 
                alt="Svadha Logo" 
                className="h-12 md:h-16 w-auto object-contain"
                onError={(e) => {
                  // Fallback to text logo if image not found
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hidden">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            </div>
            <p className="mb-4 text-gray-400">
              Experience the healing power of Ayurveda. Natural treatments and therapies for holistic wellness.
            </p>
            {settings?.address && (
              <p className="text-sm text-gray-400 mb-2">
                📍 {settings.address}
              </p>
            )}
            {settings?.phone && (
              <p className="text-sm text-gray-400 mb-2">
                📞 {settings.phone}
              </p>
            )}
            {settings?.email && (
              <p className="text-sm text-gray-400">
                ✉️ {settings.email}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-serif text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {settings?.socialMedia?.facebook && (
                <a
                  href={settings.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Facebook
                </a>
              )}
              {settings?.socialMedia?.instagram && (
                <a
                  href={settings.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {settings?.clinicName || 'Svadha Ayurvedic Clinic'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

