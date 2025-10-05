import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';  // <-- v6 imports (no Router/Route/hashHistory)

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
import * as bandService from './services/bandService';
import BandDetails from './components/BandDetails/BandDetails';
import BandForm from './components/BandForm/BandForm';
import BandList from './components/BandList/BandList';

const App = () => {
  const navigate = useNavigate();  // <-- v6 hook for navigation (replaces hashHistory.push)
  const [gigs, setGigs] = useState([]);
  const { user } = useContext(UserContext);
  const [bands, setBands] = useState([]);

  const handleAddGig = async (gigFormData) => {
    const newGig = await gigService.create(gigFormData);
    setGigs([newGig, ...gigs]);
    navigate('/gigs');
  };

  const handleDeleteGig = async (gigId) => {
    await gigService.deleteGig(gigId);
    setGigs(gigs.filter((gig) => gig._id !== gigId));
    navigate('/gigs');
  };

  const handleUpdateGig = async (gigId, gigFormData) => {
    const updatedGig = await gigService.update(gigId, gigFormData);
    setGigs(gigs.map((gig) => (gig._id === gigId ? updatedGig : gig)));
    navigate(`/gigs/${gigId}`);
  };

  useEffect(() => {
    const fetchAll = async () => {
      if (user) {
        const [gigsData, bandsData] = await Promise.all([
          gigService.index(),
          bandService.indexBand(),
        ]);
        setGigs(gigsData);
        setBands(bandsData);
      }
    };
    fetchAll();
  }, [user]);

  const handleAddBand = async (bandFormData) => {
    const newBand = await bandService.createBand(bandFormData);
    setBands([newBand, ...bands]);
    navigate('/bands');
  };

  const handleDeleteBand = async (bandId) => {
    await bandService.deleteBand(bandId);
    setBands(bands.filter((band) => band._id !== bandId));
    navigate('/bands');
  };

  const handleUpdateBand = async (bandId, bandFormData) => {
    const updatedBand = await bandService.updateBand(bandId, bandFormData);
    setBands(bands.map((band) => (band._id === bandId ? updatedBand : band)));
    navigate(`/bands/${bandId}`);
  };

  return (
    <>
      <NavBar />
      <Routes>  {/* <-- v6 Routes wrapper */}
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/bands" element={<BandList bands={bands} />} />
        <Route
          path="/bands/:bandId"
          element={
            <BandDetails
              handleDeleteBand={handleDeleteBand}
              user={user}
            />
          }
        />
        {user ? (
          <>
            <Route path="/gigs" element={<GigList gigs={gigs} />} />
            <Route path="/bands/new" element={<BandForm handleAddBand={handleAddBand} />} />
            <Route
              path="/bands/:bandId/edit"
              element={
                <BandForm
                  handleUpdateBand={handleUpdateBand}
                />
              }
            />
            <Route path="/gigs/:gigId" element={<GigDetails handleDeleteGig={handleDeleteGig} />} />
            <Route path="/gigs/new" element={<GigForm handleAddGig={handleAddGig} />} />
            <Route
              path="/gigs/:gigId/edit"
              element={<GigForm handleUpdateGig={handleUpdateGig} />}
            />
            <Route
              path="/gigs/:gigId/comments/:commentId/edit"
              element={<CommentForm />}
            />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;