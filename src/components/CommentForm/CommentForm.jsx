import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import * as gigService from '../../services/gigService';

const CommentForm = ({ handleAddComment, handleUpdateComment }) => {
  const [formData, setFormData] = useState({ text: '' });
  const [error, setError] = useState(null);
  const { gigId, commentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const parent = location.state?.parent || null;

  useEffect(() => {
    if (commentId) {
      const fetchComment = async () => {
        try {
          const comments = await gigService.indexComments(gigId);
          const comment = comments.find((c) => c._id === commentId);
          if (comment) {
            setFormData({ text: comment.text });
          } else {
            setError('Comment not found');
          }
        } catch (err) {
          setError('Failed to load comment');
          console.error('Fetch comment error:', err);
        }
      };
      fetchComment();
    }
  }, [gigId, commentId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      if (commentId) {
        await handleUpdateComment(gigId, commentId, formData);
      } else {
        await handleAddComment(gigId, { ...formData, parent });
      }
      navigate(`/gigs/${gigId}`);
    } catch (error) {
      setError(error.message || 'Failed to submit comment');
      console.error('Comment submit error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;