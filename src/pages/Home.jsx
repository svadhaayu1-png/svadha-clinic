import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../api/services';
import { getTestimonials } from '../api/testimonials';
import { getBlogs } from '../api/blog';
import { getSettings } from '../api/settings';

const Home = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, testimonialsRes, blogsRes, settingsRes] = await Promise.all([
          getServices(true),
          getTestimonials(true),
          getBlogs(true),
          getSettings()
        ]);
        setServices(servicesRes.data.slice(0, 6));
        setTestimonials(testimonialsRes.data.slice(0, 3));
        setBlogs(blogsRes.data.slice(0, 3));
        setSettings(settingsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
                {settings?.heroTitle || 'Welcome to Svadha Ayurvedic Clinic'}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100">
                {settings?.heroSubtitle || 'Experience the healing power of Ayurveda'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-secondary text-center">
                  Book Consultation
                </Link>
                <Link to="/services" className="btn-outline text-white border-white hover:bg-white hover:text-primary-600">
                  Our Services
                </Link>
              </div>
            </div>
            <div className="relative">
              {settings?.heroImage ? (
                <img
                  src={`${API_URL}${settings.heroImage}`}
                  alt="Ayurvedic Clinic"
                  className="rounded-lg shadow-2xl"
                />
              ) : (
                <div className="bg-white/10 rounded-lg shadow-2xl p-20 flex items-center justify-center">
                  <span className="text-6xl">🌿</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-gray-800 mb-4">
              About Ayurveda
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {settings?.aboutText || 'Ayurveda is a 5,000-year-old system of natural healing that originated in India. It emphasizes balance in bodily systems through diet, herbal treatment, and yogic breathing.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="font-serif text-xl font-semibold mb-2">Natural Healing</h3>
              <p className="text-gray-600">Pure herbal treatments and natural remedies</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-5xl mb-4">⚖️</div>
              <h3 className="font-serif text-xl font-semibold mb-2">Balance</h3>
              <p className="text-gray-600">Restore harmony in body, mind, and spirit</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-5xl mb-4">💚</div>
              <h3 className="font-serif text-xl font-semibold mb-2">Holistic Wellness</h3>
              <p className="text-gray-600">Complete wellness approach for your health</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive Ayurvedic treatments for your wellness
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">
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
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold mb-2 text-gray-800">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    <span className="text-primary-600 font-medium">Learn More →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No services available at the moment.</p>
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-gray-800 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-lg text-gray-600">
              Real experiences from our valued patients
            </p>
          </div>
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="bg-gray-50 rounded-lg p-6 shadow-md"
                >
                  <div className="flex items-center mb-4">
                    {testimonial.image ? (
                      <img
                        src={`${API_URL}${testimonial.image}`}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary-200 flex items-center justify-center mr-4">
                        <span className="text-2xl">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      {testimonial.location && (
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      )}
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.message}"</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No testimonials available yet.</p>
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/testimonials" className="btn-outline">
              Read More Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-gray-800 mb-4">
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600">
              Insights on Ayurveda and wellness
            </p>
          </div>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {blog.image && (
                    <img
                      src={`${API_URL}${blog.image}`}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold mb-2 text-gray-800">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {blog.excerpt || blog.content.substring(0, 100) + '...'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{blog.author}</span>
                      <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No blog posts available yet.</p>
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/blog" className="btn-primary">
              Read All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="font-serif text-4xl font-bold mb-4">
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Book a consultation and experience the power of Ayurveda
          </p>
          <Link to="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
            Book Your Consultation Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

