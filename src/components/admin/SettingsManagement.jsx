import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../../api/settings';
import toast from 'react-hot-toast';

const SettingsManagement = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    clinicName: '',
    address: '',
    phone: '',
    email: '',
    heroTitle: '',
    heroSubtitle: '',
    aboutText: '',
    heroImage: null,
    mapEmbed: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: ''
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await getSettings();
      setSettings(data);
      setFormData({
        clinicName: data.clinicName || '',
        address: data.address || '',
        phone: data.phone || '',
        email: data.email || '',
        heroTitle: data.heroTitle || '',
        heroSubtitle: data.heroSubtitle || '',
        aboutText: data.aboutText || '',
        heroImage: null,
        mapEmbed: data.mapEmbed || '',
        socialMedia: data.socialMedia || {
          facebook: '',
          instagram: '',
          twitter: '',
          youtube: ''
        }
      });
    } catch (error) {
      toast.error('Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value
      }
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, heroImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(formData);
      toast.success('Settings updated successfully');
      fetchSettings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update settings');
    }
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-3xl font-bold text-gray-800 mb-6">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Clinic Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-serif text-xl font-semibold text-gray-800 mb-4">Clinic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name</label>
              <input
                type="text"
                name="clinicName"
                value={formData.clinicName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-serif text-xl font-semibold text-gray-800 mb-4">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
              <input
                type="text"
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
              <input
                type="text"
                name="heroSubtitle"
                value={formData.heroSubtitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              {settings?.heroImage && !formData.heroImage && (
                <img
                  src={`${API_URL}${settings.heroImage}`}
                  alt="Current hero"
                  className="mt-2 w-64 h-48 object-cover rounded"
                />
              )}
            </div>
          </div>
        </div>

        {/* About Text */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-serif text-xl font-semibold text-gray-800 mb-4">About Text</h3>
          <textarea
            name="aboutText"
            rows={6}
            value={formData.aboutText}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="About clinic description"
          />
        </div>

        {/* Social Media */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-serif text-xl font-semibold text-gray-800 mb-4">Social Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
              <input
                type="url"
                name="facebook"
                value={formData.socialMedia.facebook}
                onChange={handleSocialMediaChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
              <input
                type="url"
                name="instagram"
                value={formData.socialMedia.instagram}
                onChange={handleSocialMediaChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
              <input
                type="url"
                name="twitter"
                value={formData.socialMedia.twitter}
                onChange={handleSocialMediaChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
              <input
                type="url"
                name="youtube"
                value={formData.socialMedia.youtube}
                onChange={handleSocialMediaChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Map Embed */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-serif text-xl font-semibold text-gray-800 mb-4">Map Embed</h3>
          <textarea
            name="mapEmbed"
            rows={4}
            value={formData.mapEmbed}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Paste Google Maps embed code here"
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default SettingsManagement;

