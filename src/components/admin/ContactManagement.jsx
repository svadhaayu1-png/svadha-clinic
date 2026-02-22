import { useState, useEffect } from 'react';
import { getContacts, updateContact, deleteContact } from '../../api/contact';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  const fetchContacts = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const { data } = await getContacts(params);
      setContacts(data);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateContact(id, { status });
      toast.success('Status updated successfully');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await deleteContact(id);
      toast.success('Message deleted successfully');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-3xl font-bold text-gray-800">Messages & Consultations</h2>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setLoading(true); }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Messages</option>
            <option value="pending">Pending</option>
            <option value="responded">Responded</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                      {contact.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>📧 {contact.email}</span>
                      {contact.phone && <span>📞 {contact.phone}</span>}
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        contact.type === 'consultation'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {contact.type === 'consultation' ? 'Consultation' : 'Contact'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={contact.status}
                      onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="responded">Responded</option>
                      <option value="archived">Archived</option>
                    </select>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {contact.subject && (
                  <div className="mb-3">
                    <span className="font-semibold text-gray-700">Subject: </span>
                    <span className="text-gray-600">{contact.subject}</span>
                  </div>
                )}
                {contact.issue && (
                  <div className="mb-3">
                    <span className="font-semibold text-gray-700">Issue: </span>
                    <span className="text-gray-600">{contact.issue}</span>
                  </div>
                )}
                {contact.preferredTime && (
                  <div className="mb-3">
                    <span className="font-semibold text-gray-700">Preferred Time: </span>
                    <span className="text-gray-600">{contact.preferredTime}</span>
                  </div>
                )}
                <div className="mb-3">
                  <span className="font-semibold text-gray-700">Message: </span>
                  <p className="text-gray-600 mt-1 whitespace-pre-wrap">{contact.message}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(contact.createdAt), 'MMM dd, yyyy HH:mm')}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No messages found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactManagement;

