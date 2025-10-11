import { Link } from 'react-router-dom';
import * as gigService from '../../services/gigService';
import { useState, useEffect } from 'react';

const GigList = (props) => {
  const [gigs, setGigs] = useState([]);
  const handleGigChange = (evt) => {
    handleGigSearch( evt.target.value );
    };

    const handleGigSearch = async (gigSearchCategory) => {
      console.log(gigSearchCategory)
        try {
          const gigs = await gigService.index(gigSearchCategory);
          setGigs(gigs);
        } catch (error) {
          console.error('Error selecting category:', error);
          throw error;
        }
      };

        useEffect(() => {
          const fetchGigs = async () => {
            try {
              const gigsData = await gigService.index('');
              console.log(gigsData);
              setGigs(Array.isArray(gigsData) ? gigsData : []);
            } catch (error) {
              console.error('Error fetching Gigs:', error);
              setGigs([navigate]);
            }
          };
          fetchGigs();
        }, []);

  return (
    <main>
      <select
        required
        name="category"
        id="category-input"
        onChange={handleGigChange}
        >
          <option value="">All Gigs</option>
          <option value="Rock">Rock</option>
          <option value="Metal">Metal</option>
          <option value="Punk">Punk</option>
          <option value="R&B">R&B</option>
          <option value="Rap">Rap</option>
          <option value="Techno/Electronic">Techno/Electronic</option>
          <option value="Country">Country</option>
          <option value="Folk/World">Folk/World</option>
      </select>
      {gigs && Array.isArray(gigs) && gigs.length > 0 ? (
        gigs.map((gig) => (
          <Link key={gig._id} to={`/gigs/${gig._id}`}>
            <article className="gigList">
              <header>
                <h2>{gig.title || 'Untitled'}</h2>
                <p>
                  {gig.author?.username
                    ? `${gig.author.username} posted on ${new Date(gig.createdAt).toLocaleDateString()}`
                    : 'Unknown author'}
                </p>
              </header>
              <p>{gig.text || 'No description'}</p>
            </article>
          </Link>
        ))
      ) : (
        <p>No gigs available.</p>
      )}
    </main>
  );
};

export default GigList;