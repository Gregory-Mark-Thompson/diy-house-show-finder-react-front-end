const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const validateToken = async (token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/test-jwt/verify-token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.err || 'Invalid token');
    }
    return res.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      await validateToken(data.token); // Validate before storing
      localStorage.setItem('token', data.token);
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }

    throw new Error('Invalid response from server');
  } catch (err) {
    console.error('signUp error:', err);
    throw new Error(err.message);
  }
};

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      await validateToken(data.token); // Validate before storing
      localStorage.setItem('token', data.token);
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }

    throw new Error('Invalid response from server');
  } catch (err) {
    console.error('signIn error:', err);
    throw new Error(err.message);
  }
};

export { signUp, signIn, validateToken };