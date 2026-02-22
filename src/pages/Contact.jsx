import { useState } from 'react';
import { useEffect } from 'react';
import { submitContact } from '../api/contact';
import { getSettings } from '../api/settings';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'contact',
    preferredTime: '',
    issue: ''
  });
  const [isConsultation, setIsConsultation] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitContact({
        ...formData,
        type: isConsultation ? 'consultation' : 'contact'
      });
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        type: 'contact',
        preferredTime: '',
        issue: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <h1 className="font-serif text-5xl font-bold mb-4">
            {isConsultation ? 'Book a Consultation' : 'Contact Us'}
          </h1>
          <p className="text-xl text-gray-100">
            {isConsultation
              ? 'Schedule your Ayurvedic consultation today'
              : 'Get in touch with us for any inquiries'}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setIsConsultation(false)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    !isConsultation
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Contact
                </button>
                <button
                  onClick={() => setIsConsultation(true)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    isConsultation
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Book Consultation
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {isConsultation ? (
                  <>
                    <div>
                      <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-2">
                        Health Issue / Concern *
                      </label>
                      <textarea
                        id="issue"
                        name="issue"
                        required
                        rows={3}
                        value={formData.issue}
                        onChange={handleChange}
                        placeholder="Please describe your health concern or what you'd like to discuss"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time
                      </label>
                      <input
                        type="text"
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        placeholder="e.g., Morning, Afternoon, Evening"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={isConsultation ? "Additional information or questions" : "Your message"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : isConsultation ? 'Book Consultation' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="font-serif text-3xl font-bold text-gray-800 mb-6">
                  Get in Touch
                </h2>
                {settings && (
                  <div className="space-y-6">
                    {settings.address && (
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">📍</div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                          <p className="text-gray-600">{settings.address}</p>
                        </div>
                      </div>
                    )}
                    {settings.phone && (
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">📞</div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                          <a href={`tel:${settings.phone}`} className="text-primary-600 hover:underline">
                            {settings.phone}
                          </a>
                        </div>
                      </div>
                    )}
                    {settings.email && (
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">✉️</div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                          <a href={`mailto:${settings.email}`} className="text-primary-600 hover:underline">
                            {settings.email}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {settings?.mapEmbed && (
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4">
                    Location
                  </h3>
                  <div
                    className="w-full h-64 rounded-lg overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: settings.mapEmbed }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

