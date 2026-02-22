import { useEffect, useState } from 'react';
import { getSettings } from '../api/settings';

const About = () => {
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

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <h1 className="font-serif text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-100">
            Discover the ancient wisdom of Ayurveda
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-serif text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <div className="prose max-w-none text-gray-600">
                {settings?.aboutText ? (
                  <p className="text-lg leading-relaxed whitespace-pre-line">
                    {settings.aboutText}
                  </p>
                ) : (
                  <>
                    <p className="text-lg leading-relaxed mb-4">
                      Welcome to Svadha Ayurvedic Clinic, where ancient wisdom meets modern wellness. 
                      We are dedicated to providing authentic Ayurvedic treatments that restore balance 
                      and promote natural healing.
                    </p>
                    <p className="text-lg leading-relaxed mb-4">
                      Our clinic is built on the principles of Ayurveda, a 5,000-year-old holistic 
                      healing system from India. We believe in treating the root cause of ailments, 
                      not just the symptoms, by restoring harmony between body, mind, and spirit.
                    </p>
                    <p className="text-lg leading-relaxed">
                      With a team of experienced practitioners and authentic Ayurvedic therapies, 
                      we guide our patients on a journey toward optimal health and wellness.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <div className="text-8xl mb-4">🌿</div>
              <h3 className="font-serif text-2xl font-semibold mb-4">Ayurvedic Principles</h3>
              <p className="text-gray-600">
                Balance, harmony, and natural healing
              </p>
            </div>
          </div>

          {/* Mission & Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="font-serif text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide authentic Ayurvedic treatments that promote natural healing and holistic wellness.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">💚</div>
              <h3 className="font-serif text-2xl font-semibold mb-4">Our Values</h3>
              <p className="text-gray-600">
                Authenticity, compassion, and commitment to our patients' well-being.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="font-serif text-2xl font-semibold mb-4">Our Approach</h3>
              <p className="text-gray-600">
                Personalized treatments tailored to each individual's unique constitution.
              </p>
            </div>
          </div>

          {/* Ayurvedic Principles */}
          <div className="bg-primary-50 rounded-lg p-12 mb-16">
            <h2 className="font-serif text-4xl font-bold text-gray-800 mb-8 text-center">
              The Principles of Ayurveda
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-serif text-xl font-semibold mb-3">Doshas</h3>
                <p className="text-gray-600">
                  Ayurveda recognizes three fundamental energies (doshas): Vata, Pitta, and Kapha. 
                  Understanding your unique dosha composition helps create personalized treatment plans.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-serif text-xl font-semibold mb-3">Balance</h3>
                <p className="text-gray-600">
                  Health is achieved when there is balance between the doshas, proper digestion, 
                  and elimination of waste products from the body.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-serif text-xl font-semibold mb-3">Natural Healing</h3>
                <p className="text-gray-600">
                  Ayurveda uses natural remedies including herbs, oils, diet, and lifestyle modifications 
                  to restore balance and promote healing.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-serif text-xl font-semibold mb-3">Holistic Approach</h3>
                <p className="text-gray-600">
                  Ayurveda treats the whole person—body, mind, and spirit—rather than just the symptoms 
                  of a disease.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          {settings && (
            <div className="bg-gray-900 text-white rounded-lg p-12">
              <h2 className="font-serif text-4xl font-bold mb-8 text-center">
                Visit Our Clinic
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {settings.address && (
                  <div>
                    <div className="text-4xl mb-4">📍</div>
                    <h3 className="font-semibold mb-2">Address</h3>
                    <p className="text-gray-300">{settings.address}</p>
                  </div>
                )}
                {settings.phone && (
                  <div>
                    <div className="text-4xl mb-4">📞</div>
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <p className="text-gray-300">{settings.phone}</p>
                  </div>
                )}
                {settings.email && (
                  <div>
                    <div className="text-4xl mb-4">✉️</div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-gray-300">{settings.email}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;

