const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/gigs`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (gigId) => {
  try {
    const res = await fetch(`${BASE_URL}/${gigId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (gigFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gigFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteGig = async (gigId) => {
  try {
    const res = await fetch(`${BASE_URL}/${gigId}`, {
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

const createComment = async (gigId, commentFormData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');
    if (typeof gigId !== 'string') throw new Error('Invalid gigId');
    const res = await fetch(`${BASE_URL}/${gigId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to create comment: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('createComment error:', error.message);
    throw error;
  }
};

const deleteComment = async (gigId, commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${gigId}/comments/${commentId}`, {
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

async function update(gigId, gigFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${gigId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gigFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const indexComments = async (gigId) => {
  try {
    const res = await fetch(`${BASE_URL}/${gigId}/comments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) throw new Error(`Failed to fetch comments: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('indexComments error:', error);
    return [];
  }
};

const updateComment = async (gigId, commentId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${gigId}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { 
    index,
    show,
    create,
    deleteGig,
    update,
    createComment,
    indexComments,
    deleteComment,
    updateComment,
};