import { Link } from 'react-router-dom';

const BandList = (props) => {
  return (
    <main>
      {props.bands && Array.isArray(props.bands) ? (
        props.bands.map((band) => (
          band && band._id ? (
            <Link key={band._id} to={`/bands/${band._id}`}>
              <article>
                <header>
                  <h2>{band.title || 'Untitled'}</h2>
                  <p>
                    {band.author && band.author.username
                      ? `${band.author.username} posted on ${new Date(band.createdAt || Date.now()).toLocaleDateString()}`
                      : `Posted on ${new Date(band.createdAt || Date.now()).toLocaleDateString()}`}
                  </p>
                </header>
                <p>{band.text || 'No description'}</p>
              </article>
            </Link>
          ) : null
        ))
      ) : (
        <p>No bands available yet. Be the first to post one!</p>
      )}
    </main>
  );
};

export default BandList;