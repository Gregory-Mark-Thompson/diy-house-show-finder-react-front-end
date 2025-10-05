import { Link } from 'react-router';

const BandList = (props) => {
  return (
    <main>
      {props.bands && props.bands.length > 0 ? (
        props.bands.map((band) => (
          <Link key={band._id} to={`/bands/${band._id}`}>
            <article>
              <header>
                <h2>{band.title}</h2>
                <p>
                  {band.author && band.author.username
                    ? `${band.author.username} posted on ${new Date(band.createdAt).toLocaleDateString()}`
                    : `Posted on ${new Date(band.createdAt).toLocaleDateString()}`}
                </p>
              </header>
              <p>{band.text}</p>
            </article>
          </Link>
        ))
      ) : (
        <p>No bands available.</p>
      )}
    </main>
  );
};

export default BandList;