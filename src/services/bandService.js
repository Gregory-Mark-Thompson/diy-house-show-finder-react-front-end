const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/bands`;

const indexBand = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(BASE_URL, {
      headers,
    });
    if (!res.ok) throw new Error(`Failed to fetch bands: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('indexBand error:', error.message);
    return [];
  }
};

const showBand = async (bandId) => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${BASE_URL}/${bandId}`, {
      headers,
    });
    if (!res.ok) throw new Error(`Failed to fetch band: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('showBand error:', error.message);
    throw error;
  }
};

const createBand = async (bandFormData) => {
  try {
    console.log('Creating band with data:', JSON.stringify(bandFormData, null, 2));
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bandFormData),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('createBand error:', error.message);
    throw error;
  }
};

const deleteBand = async (bandId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');
    const res = await fetch(`${BASE_URL}/${bandId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`Failed to delete band: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('deleteBand error:', error.message);
    throw error;
  }
};

const updateBand = async (bandId, bandFormData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');
    const res = await fetch(`${BASE_URL}/${bandId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bandFormData),
    });
    if (!res.ok) throw new Error(`Failed to update band: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('updateBand error:', error.message);
    throw error;
  }
};

export { indexBand, showBand, createBand, deleteBand, updateBand };