import { useState } from 'react';
import { shareViaEmail } from '../services/shareService';

const ShareModal = ({ isOpen, onClose, summaryText }) => {
  const [formData, setFormData] = useState({
    recipientEmail: '',
    senderName: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (!formData.recipientEmail.trim()) {
      setMessage({ type: 'error', text: 'Please enter recipient email' });
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.recipientEmail.trim())) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      setLoading(false);
      return;
    }

    try {
      const result = await shareViaEmail(
        formData.recipientEmail,
        summaryText,
        formData.senderName
      );

      if (result.success) {
        setMessage({ type: 'success', text: 'Summary shared successfully! 🎉' });
        setTimeout(() => {
          onClose();
          setFormData({ recipientEmail: '', senderName: '' });
          setMessage({ type: '', text: '' });
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to share summary. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setFormData({ recipientEmail: '', senderName: '' });
      setMessage({ type: '', text: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">📧 Share Summary</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Email *
            </label>
            <input
              type="email"
              id="recipientEmail"
              name="recipientEmail"
              value={formData.recipientEmail}
              onChange={handleInputChange}
              placeholder="Enter recipient's email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name (Optional)
            </label>
            <input
              type="text"
              id="senderName"
              name="senderName"
              value={formData.senderName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
              disabled={loading}
            />
          </div>

          {message.text && (
            <div className={`p-3 rounded-lg text-sm font-medium ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.recipientEmail.trim()}
              className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                'Send Summary'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareModal;
