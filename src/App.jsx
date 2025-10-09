import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import GigList from './components/GigList/GigList';
import * as gigService from './services/gigService';
import { UserContext } from './contexts/UserContext';
import GigDetails from './components/GigDetails/GigDetails';
import GigForm from './components/GigForm/GigForm';
import CommentForm from './components/CommentForm/CommentForm';
import BandDetails from './components/BandDetails/BandDetails';
import BandForm from './components/BandForm/BandForm';
import BandList from './components/BandList/BandList';

const App = () => {
  const navigate = useNavigate();
  const [gigs, setGigs] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [bands, setBands] = useState([]);
  
  useEffect(() => {
    let isMounted = true;
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token && isMounted) {
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
            throw new Error(errorData.err || `Token validation failed: ${res.status}`);
          }
          const data = await res.json();
          if (isMounted) setUser(data.decoded.payload);
        } catch (error) {
          console.error('Token validation failed:', error.message);
          if (isMounted) {
            localStorage.removeItem('token');
            setUser(null);
            if (window.location.pathname !== '/sign-in') {
              navigate('/sign-in');
            }
          }
        }
      }
    };
    validateToken();
    return () => { isMounted = false; };
  }, [setUser]);

  const handleAddGig = async (gigFormData) => {
    try {
      const newGig = await gigService.create(gigFormData);
      setGigs([newGig, ...gigs]);
      navigate('/gigs');
    } catch (error) {
      console.error('Error adding gig:', error);
      throw error;
    }
  };

  const handleDeleteGig = async (gigId) => {
    try {
      await gigService.deleteGig(gigId);
      setGigs(gigs.filter((gig) => gig._id !== gigId));
      navigate('/gigs');
    } catch (error) {
      console.error('Error deleting gig:', error);
    }
  };

  const handleUpdateGig = async (gigId, gigFormData) => {
    try {
      const updatedGig = await gigService.update(gigId, gigFormData);
      setGigs(gigs.map((gig) => (gig._id === gigId ? updatedGig : gig)));
      navigate(`/gigs/${gigId}`);
    } catch (error) {
      console.error('Error updating gig:', error);
      throw error;
    }
  };

  const handleAddComment = async (commentFormData, gigId) => {
    try {
      console.log('App handleAddComment:', { gigId, commentFormData });
      const newComment = await gigService.createComment(gigId, commentFormData);
      return newComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const handleUpdateComment = async (gigId, commentId, commentFormData) => {
    try {
      const updatedComment = await gigService.updateComment(gigId, commentId, commentFormData);
      return updatedComment;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  };

  // const handleUpdateBand = async (bandId, bandFormData) => {
  //   try {
  //     const updatedBand = await bandService.updateBand(bandId, bandFormData);
  //     setBands(bands.map((band) => (band._id === bandId ? updatedBand : band)));
  //     navigate(`/bands/${bandId}`);
  //   } catch (error) {
  //     console.error('Error updating band:', error);
  //     throw error;
  //   }
  // };


  useEffect(() => {
    const fetchGigs = async () => {
      if (user) {
        try {
          const gigsData = await gigService.index();
          setGigs(Array.isArray(gigsData) ? gigsData : []);
        } catch (error) {
          console.error('Error fetching gigs:', error);
          setGigs([]);
        }
      }
    };
    fetchGigs();
  }, [user]);

  return (
    <>
      <NavBar
      />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/bands" element={<BandList />} />
        <Route
          path="/bands/:bandId"
          element={
            <BandDetails
              user={user}
            />
          }
        />
        {user ? (
          <>
            <Route path="/gigs" element={<GigList gigs={gigs} />} />
            <Route path="/bands/new" element={<BandForm />} />
            <Route
              path="/bands/:bandId/edit"
              element={<BandForm />}
            />
            <Route path="/gigs/:gigId" element={<GigDetails handleDeleteGig={handleDeleteGig} />} />
            <Route path="/gigs/new" element={<GigForm handleAddGig={handleAddGig} />} />
            <Route
              path="/gigs/:gigId/edit"
              element={<GigForm handleUpdateGig={handleUpdateGig} />}
            />
            <Route
              path="/gigs/:gigId/comments/:commentId/edit"
              element={<CommentForm handleUpdateComment={handleUpdateComment} />}
            />
            <Route
              path="/gigs/:gigId/comments/new"
              element={<CommentForm handleAddComment={handleAddComment} />}
            />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;