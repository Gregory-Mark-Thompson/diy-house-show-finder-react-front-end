const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/bands`;

const indexBand = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const showBand = async (bandId) => {
  try {
    const res = await fetch(`${BASE_URL}/${bandId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createBand = async (bandFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bandFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteBand = async (bandId) => {
  try {
    const res = await fetch(`${BASE_URL}/${bandId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

async function updateBand(bandId, bandFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${bandId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bandFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export { 
    indexBand,
    showBand,
    createBand,
    deleteBand,
    updateBand,
};