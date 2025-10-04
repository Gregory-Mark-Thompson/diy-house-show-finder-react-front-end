import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

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


const App = () => {
  const navigate = useNavigate();
  const [gigs, setGigs] = useState([]);
  const { user } = useContext(UserContext);
  
  const handleAddGig = async (gigFormData) => {
    const newGig = await gigService.create(gigFormData);
    setGigs([newGig, ...gigs]);
    navigate('/gigs');
  };

const handleDeleteGig = async (gigId) => {
  const deletedGig = await gigService.deleteGig(gigId);
  setGigs(gigs.filter((gig) => gig._id !== gigId));
  navigate('/gigs');
};

const handleUpdateGig = async (gigId, gigFormData) => {
  const updatedGig = await gigService.update(gigId, gigFormData);
  setGigs(gigs.map((gig) => (gigId === gig._id ? updatedGig : gig)));
  navigate(`/gigs/${gigId}`);
};

  useEffect(() => {
    const fetchAllGigs = async () => {
      const gigsData = await gigService.index();
  
      // console log to verify
      setGigs(gigsData);
    };
    if (user) fetchAllGigs();
  }, [user]);
  
  // return statement code here

  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path='/gigs' element={<GigList gigs={gigs} />} />
            <Route 
              path='/gigs/:gigId'
              element={<GigDetails handleDeleteGig={handleDeleteGig}/>}
            />
            <Route 
              path='/gigs/new' 
              element={<GigForm handleAddGig={handleAddGig} />}
            />
            <Route
              path='/gigs/:gigId/edit'
              element={<GigForm handleUpdateGig={handleUpdateGig}/>}
            />
            <Route
              path='/gigs/:gigId/comments/:commentId/edit'
              element={<CommentForm />}
            />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
