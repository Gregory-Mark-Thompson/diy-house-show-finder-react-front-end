import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as bandService from '../../services/bandService';

const BandForm = (props) => {
  const { bandId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'News',
  });

  useEffect(() => {
    const fetchBand = async () => {
      const bandData = await bandService.show(bandId);
      setFormData(bandData);
    };
    if (bandId) fetchBand();
    return () => setFormData({ title: '', text: '', category: 'News' });
  }, [bandId]);


  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (bandId) {
      props.handleUpdateBand(bandId, formData);
    } else {
      props.handleAddBand(formData);
    }
  };

  return (
    <main>
      <h1>{bandId ? 'Edit Band' : 'New Band'}</h1>
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
          type='text'
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
          <option value='Rock'>Rock</option>
          <option value='Metal'>Metal</option>
          <option value='Punk'>Punk</option>
          <option value='R&B'>R&B</option>
          <option value='Rapp'>Rapp</option>
          <option value='Techno/Elctronic'>Techno/Elctronic</option>
          <option value='Country'>Country</option>
          <option value='Folk/World'>Folk/World</option>
        </select>
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default BandForm;