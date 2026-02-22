import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getService } from '../api/services';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await getService(id);
        setService(data);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Service Not Found</h2>
          <Link to="/services" className="btn-primary">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {service.image && (
        <section className="relative h-96">
          <img
            src={`${API_URL}${service.image}`}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="container-custom">
              <h1 className="font-serif text-5xl font-bold text-white mb-4">
                {service.title}
              </h1>
              <div className="flex items-center space-x-4 text-white">
                <span className="bg-primary-600 px-4 py-2 rounded-full text-sm">
                  {service.category}
                </span>
                {service.duration && (
                  <span className="flex items-center">
                    <span className="mr-2">⏱️</span>
                    {service.duration}
                  </span>
                )}
                {service.price && (
                  <span className="flex items-center">
                    <span className="mr-2">💰</span>
                    {service.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {!service.image && (
              <div className="mb-8">
                <h1 className="font-serif text-5xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h1>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm">
                    {service.category}
                  </span>
                  {service.duration && (
                    <span className="text-gray-600">⏱️ {service.duration}</span>
                  )}
                  {service.price && (
                    <span className="text-gray-600">💰 {service.price}</span>
                  )}
                </div>
              </div>
            )}

            <div className="prose max-w-none mb-12">
              <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {service.description}
              </div>
            </div>

            {service.benefits && service.benefits.length > 0 && (
              <div className="bg-primary-50 rounded-lg p-8 mb-12">
                <h2 className="font-serif text-3xl font-bold text-gray-800 mb-6">
                  Key Benefits
                </h2>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-600 text-xl mr-3 mt-1">✓</span>
                      <span className="text-gray-700 text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-gray-800">
                Interested in This Service?
              </h3>
              <p className="text-gray-600 mb-6">
                Book a consultation to learn more and discuss how this treatment can benefit you.
              </p>
              <Link to="/contact" className="btn-primary">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;

