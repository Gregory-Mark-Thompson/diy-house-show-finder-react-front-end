import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as gigService from '../../services/gigService';

const GigForm = (props) => {
  const { gigId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'Rock',
  });

  useEffect(() => {
    const fetchGig = async () => {
      const gigData = await gigService.show(gigId);
      setFormData(gigData);
    };
    if (gigId) fetchGig();
    return () => setFormData({ title: '', text: '', category: 'Rock' });
  }, [gigId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (gigId) {
      props.handleUpdateGig(gigId, formData);
    } else {
      props.handleAddGig(formData);
    }
  };

  return (
    <main>
      <h1>{gigId ? 'Edit Gig' : 'New Gig'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title-input'>Title</label>
        <input
          required
          type='text'
          name='title'
          id='title-input'
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor='text-input'>Text</label>
        <textarea
          required
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor='category-input'>Category</label>
        <select
          required
          name='category'
          id='category-input'
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Rock">Rock</option>
          <option value="Metal">Metal</option>
          <option value="Punk">Punk</option>
          <option value="R&B">R&B</option>
          <option value="Rap">Rap</option>
          <option value="Techno/Electronic">Techno/Electronic</option>
          <option value="Country">Country</option>
          <option value="Folk/World">Folk/World</option>
        </select>
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default GigForm;