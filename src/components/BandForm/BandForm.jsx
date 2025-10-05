import { useState } from 'react';

const BandForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'Rock',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await props.handleAddBand(formData);
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
        <option value="Rapp">Rapp</option>
        <option value="Techno/Electronic">Techno/Electronic</option>
        <option value="Country">Country</option>
        <option value="Folk/World">Folk/World</option>
      </select>

      <button type="submit">Create Band</button>
    </form>
  );
};

export default BandForm;