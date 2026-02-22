import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlog } from '../api/blog';
import { format } from 'date-fns';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await getBlog(slug);
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Blog Post Not Found</h2>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {blog.image && (
        <section className="relative h-96">
          <img
            src={`${API_URL}${blog.image}`}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="container-custom">
              <h1 className="font-serif text-5xl font-bold text-white mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center space-x-4 text-white">
                <span>{blog.author}</span>
                <span>•</span>
                <span>
                  {format(new Date(blog.publishedAt || blog.createdAt), 'MMMM dd, yyyy')}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {!blog.image && (
              <div className="mb-8">
                <h1 className="font-serif text-5xl font-bold text-gray-800 mb-4">
                  {blog.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-6">
                  <span>{blog.author}</span>
                  <span>•</span>
                  <span>
                    {format(new Date(blog.publishedAt || blog.createdAt), 'MMMM dd, yyyy')}
                  </span>
                </div>
              </div>
            )}

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link to="/blog" className="btn-outline">
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;

