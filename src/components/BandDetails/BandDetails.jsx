import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as bandService from '../../services/bandService';



const BandDetails = ({ user }) => {
  const { bandId } = useParams();
  const [band, setBand] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate ();

 const handleDeleteBand = async (bandId) => {
    try {
      await bandService.deleteBand(bandId);
      navigate('/bands');
    } catch (error) {
      console.error('Error deleting band:', error);
    }
  };

  useEffect(() => {
    const fetchBand = async () => {
      if (!bandId || bandId === 'undefined') {
        setError('Band ID is missing or undefined');
        return;
      }
      try {
        console.log('Fetching band with ID:', bandId);
        const bandData = await bandService.showBand(bandId);
        console.log('Band data received:', bandData);
        setBand(bandData);
        setError(null);
      } catch (error) {
        console.error('Error fetching band:', error.message, error.stack);
        setError(error.message || 'Failed to load band details');
      }
    };
    fetchBand();
  }, [bandId]);
console.log(user);
  console.log('bandId:', bandId);
  console.log('band state:', band);
  console.log('error state:', error);

  if (error) return <main>Error: {error}</main>;
  if (!band) return <main>Loading...</main>;

  return (
    <main>
      <section className="bandClass">
        <header>
          <p>{band.category ? band.category.toUpperCase() : 'N/A'}</p>
          <h1>{band.title || 'Untitled'}</h1>
          <p>
            {band.author && band.author.username
              ? `${band.author.username} posted on ${new Date(band.createdAt || Date.now()).toLocaleDateString()}`
              : `Posted on ${new Date(band.createdAt || Date.now()).toLocaleDateString()}`}
          </p>
          {user && band.author && band.author._id === user._id && (
            <button onClick={() => handleDeleteBand(bandId)}>Delete</button>
          )}
        </header>
        <p><strong>Place: </strong>{band.location || 'No location listed'}</p>
              <p><strong>Day & Time: </strong>
                {band.date
                  ? new Date(band.date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })
                  : 'No date or time listed'}
              </p>
        <p style = {{maxWidth: "50%"}}><strong>Show Details: </strong>{band.text || 'No description'}</p>
      </section>
    </main>
  );
};

export default BandDetails;