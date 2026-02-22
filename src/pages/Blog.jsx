import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../api/blog';
import { format } from 'date-fns';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await getBlogs(true);
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <h1 className="font-serif text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-100">
            Insights on Ayurveda, wellness, and natural healing
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                      <span>{blog.author}</span>
                      <span>
                        {format(new Date(blog.publishedAt || blog.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl font-semibold mb-3 text-gray-800">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.excerpt || blog.content.substring(0, 150) + '...'}
                    </p>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="text-primary-600 font-medium inline-flex items-center">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="font-serif text-3xl font-semibold mb-4 text-gray-800">
                No Articles Yet
              </h2>
              <p className="text-gray-600">
                We're working on creating valuable content. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;

