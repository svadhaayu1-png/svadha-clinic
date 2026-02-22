import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../api/services';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await getServices(true);
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <h1 className="font-serif text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-100">
            Comprehensive Ayurvedic treatments for your wellness
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Link
                  key={service._id}
                  to={`/services/${service._id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {service.image && (
                    <img
                      src={`${API_URL}${service.image}`}
                      alt={service.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                        {service.category}
                      </span>
                      {service.duration && (
                        <span className="text-sm text-gray-500">⏱️ {service.duration}</span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl font-semibold mb-3 text-gray-800">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    {service.benefits && service.benefits.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {service.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-primary-600 mr-2">✓</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {service.price && (
                      <p className="text-primary-600 font-semibold mb-4">
                        Starting from {service.price}
                      </p>
                    )}
                    <span className="text-primary-600 font-medium inline-flex items-center">
                      Learn More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🌿</div>
              <h2 className="font-serif text-3xl font-semibold mb-4 text-gray-800">
                Services Coming Soon
              </h2>
              <p className="text-gray-600 mb-8">
                We're working on adding our services. Please check back soon.
              </p>
              <Link to="/contact" className="btn-primary">
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="font-serif text-4xl font-bold mb-4">
            Ready to Experience Our Services?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Book a consultation to discuss which treatment is right for you
          </p>
          <Link to="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
            Book Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;

