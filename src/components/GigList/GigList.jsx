import { Link } from 'react-router-dom';

const GigList = ({ gigs }) => {
  return (
    <main>
      {gigs && Array.isArray(gigs) && gigs.length > 0 ? (
        gigs.map((gig) => (
          <Link key={gig._id} to={`/gigs/${gig._id}`}>
            <article>
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