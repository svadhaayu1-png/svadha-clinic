import { useEffect, useState } from 'react';
import { getTestimonials } from '../api/testimonials';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await getTestimonials(true);
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <h1 className="font-serif text-5xl font-bold mb-4">Testimonials</h1>
          <p className="text-xl text-gray-100">
            Real experiences from our valued patients
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-6">
                    {testimonial.image ? (
                      <img
                        src={`${API_URL}${testimonial.image}`}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-primary-200 flex items-center justify-center mr-4">
                        <span className="text-3xl font-bold text-primary-700">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {testimonial.name}
                      </h3>
                      {testimonial.location && (
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      )}
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-lg">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.message}"
                  </p>
                  <p className="text-sm text-gray-400 mt-4">
                    {new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="font-serif text-3xl font-semibold mb-4 text-gray-800">
                No Testimonials Yet
              </h2>
              <p className="text-gray-600">
                Check back soon to read testimonials from our patients.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="font-serif text-4xl font-bold mb-4">
            Share Your Experience
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Been to our clinic? We'd love to hear about your experience!
          </p>
          <a href="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;

