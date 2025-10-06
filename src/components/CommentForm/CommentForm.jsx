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
    console.log('CommentForm params:', { gigId, commentId, parent });
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
    setError(null);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      if (!formData.text.trim()) {
        setError('Comment text cannot be empty');
        return;
      }
      const commentData = { text: formData.text.trim(), parent };
      console.log('Submitting comment:', {
        gigId: String(gigId),
        commentData,
        serialized: JSON.stringify(commentData)
      });
      if (commentId) {
        await handleUpdateComment(String(gigId), commentId, commentData);
      } else {
        await handleAddComment(commentData, String(gigId));
      }
      navigate(`/gigs/${gigId}`);
    } catch (error) {
      setError(error.message || 'Failed to submit comment');
      console.error('Comment submit error:', error.message, error);
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