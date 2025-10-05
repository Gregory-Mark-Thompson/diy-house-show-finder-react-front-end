import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import * as bandService from '../../services/bandService';

const BandDetails = (props) => {
  const { bandId } = useParams();
  const [band, setBand] = useState(null);
  console.log('bandId', bandId);

  useEffect(() => {
    const fetchBand = async () => {
      try {
        const bandData = await bandService.showBand(bandId); // Fixed: showBand, not show
        setBand(bandData);
      } catch (error) {
        console.error('Error fetching band:', error);
        setBand(null);
      }
    };
    fetchBand();
  }, [bandId]);

  console.log('band state:', band);

  if (!band) return <main>Loading...</main>;

  return (
    <main>
      <section>
        <header>
          <p>{band.category ? band.category.toUpperCase() : 'N/A'}</p>
          <h1>{band.title || 'Untitled'}</h1>
          <p>
            {band.author && band.author.username
              ? `${band.author.username} posted on ${new Date(band.createdAt || Date.now()).toLocaleDateString()}`
              : `Posted on ${new Date(band.createdAt || Date.now()).toLocaleDateString()}`}
          </p>
          {band.author && band.author._id && (
            <button onClick={() => props.handleDeleteBand(bandId)}>
              Delete
            </button>
          )}
        </header>
        <p>{band.text || 'No description'}</p>
      </section>
    </main>
  );
};

export default BandDetails;