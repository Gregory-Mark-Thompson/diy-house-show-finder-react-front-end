import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as bandService from "../../services/bandService"

const BandForm = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'Rock',
  });

  // const handleAddBand = async (bandFormData) => {
  //    try {

  //      setBands([newBand, ...bands]);

  //    } catch (error) {
  //      console.error('Error adding band:', error);
  //      throw error;
  //    }
  //  };

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newBand = await bandService.createBand(formData);
      navigate('/bands');
      setFormData({ title: '', text: '', category: 'Rock' });
    } catch (err) {
      alert('Failed to create band: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input
        required
        type="text"
        name="title"
        id="title-input"
        value={formData.title}
        onChange={handleChange}
      />

      <label htmlFor="text-input">Description</label>
      <textarea
        required
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />

      <label htmlFor="category-input">Category</label>
      <select
        required
        name="category"
        id="category-input"
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
        
      <button type="submit">Create Show</button>
    </form>
  );
};

export default BandForm;