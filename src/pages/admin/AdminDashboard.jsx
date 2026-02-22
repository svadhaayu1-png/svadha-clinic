import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { getStats } from '../../api/contact';
import toast from 'react-hot-toast';
import ServicesManagement from '../../components/admin/ServicesManagement';
import TestimonialsManagement from '../../components/admin/TestimonialsManagement';
import BlogManagement from '../../components/admin/BlogManagement';
import ContactManagement from '../../components/admin/ContactManagement';
import SettingsManagement from '../../components/admin/SettingsManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'services', label: 'Services', icon: '🌿' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬' },
    { id: 'blog', label: 'Blog', icon: '📝' },
    { id: 'contact', label: 'Messages', icon: '📧' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Svadha Logo" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hidden">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h1 className="font-serif text-2xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container-custom px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-x-auto">
          <div className="flex space-x-1 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="font-serif text-3xl font-bold text-gray-800 mb-6">
                Dashboard Overview
              </h2>
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
              ) : stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg p-6 text-white">
                    <div className="text-4xl mb-2">🌿</div>
                    <h3 className="text-lg font-semibold mb-2">Services</h3>
                    <p className="text-3xl font-bold">{stats.services}</p>
                  </div>
                  <div className="bg-gradient-to-br from-ayurveda-500 to-ayurveda-600 rounded-lg p-6 text-white">
                    <div className="text-4xl mb-2">💬</div>
                    <h3 className="text-lg font-semibold mb-2">Testimonials</h3>
                    <p className="text-3xl font-bold">{stats.testimonials}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <div className="text-4xl mb-2">📝</div>
                    <h3 className="text-lg font-semibold mb-2">Blog Posts</h3>
                    <p className="text-3xl font-bold">{stats.blogs}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <div className="text-4xl mb-2">📧</div>
                    <h3 className="text-lg font-semibold mb-2">Messages</h3>
                    <p className="text-3xl font-bold">{stats.contacts}</p>
                    {stats.pendingContacts > 0 && (
                      <p className="text-sm mt-2 opacity-90">
                        {stats.pendingContacts} pending
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">No data available</p>
              )}
            </div>
          )}

          {activeTab === 'services' && <ServicesManagement />}
          {activeTab === 'testimonials' && <TestimonialsManagement />}
          {activeTab === 'blog' && <BlogManagement />}
          {activeTab === 'contact' && <ContactManagement />}
          {activeTab === 'settings' && <SettingsManagement />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

