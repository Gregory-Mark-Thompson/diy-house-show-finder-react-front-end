import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import * as gigService from '../../services/gigService';

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });
  const { gigId, commentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
  const fetchGig = async () => {
    const gigData = await gigService.show(gigId);
    // Find comment in fetched gig data
    setFormData(gigData.comments.find((comment) => comment._id === commentId));
  };
  if (gigId && commentId) fetchGig();
}, [gigId, commentId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

const handleSubmit = (evt) => {
  evt.preventDefault();
  if (gigId && commentId) {
    gigService.updateComment(gigId, commentId, formData);
    navigate(`/gigs/${gigId}`);
  } else {
    props.handleAddComment(formData);
  }
  setFormData({ text: '' });
};

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>Your comment:</label>
      <textarea
        required
        type='text'
        name='text'
        id='text-input'
        value={formData.text}
        onChange={handleChange}
      />
      <button type='submit'>SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;