import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setReset(true);
  };

  return (
    <nav>
      {user ? (
        <ul>
          <li>Welcome, {user.username}</li>
          <li><Link onClick={() => setReset(true)} to='/'>Home</Link></li>
          <li><Link onClick={() => setReset(true)} to='/gigs'>Gigs Looking for Bands/Acts</Link></li>
          <li><Link onClick={() => setReset(true)} to='/gigs/new'>Create your own Gig Looking for Bands/Acts</Link></li>
          <li><Link onClick={() => setReset(true)} to='/bands'>Shows open to the Public</Link></li>
          <li><Link onClick={() => setReset(true)} to='/bands/new'>Create your own Show open to the Public</Link></li>
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link onClick={() => setReset(true)} to='/'>Home</Link></li>
          <li><Link onClick={() => setReset(true)} to='/bands'>Shows open to the Public</Link></li>
          <li><Link onClick={() => setReset(true)} to='/sign-in'>Sign In</Link></li>
          <li><Link onClick={() => setReset(true)} to='/sign-up'>Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;