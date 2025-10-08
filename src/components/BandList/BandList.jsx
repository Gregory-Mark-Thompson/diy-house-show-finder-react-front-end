import { Link } from 'react-router-dom';

const BandList = (props) => {
  const handleChange = (evt) => {
    props.handleBandSearch( evt.target.value );
  };
  return (
    <main>
      <select
        required
        name="category"
        id="category-input"
    //    value={formData.category}
        onChange={handleChange}
        >
          <option value="">All Shows</option>
          <option value="Rock">Rock</option>
          <option value="Metal">Metal</option>
          <option value="Punk">Punk</option>
          <option value="R&B">R&B</option>
          <option value="Rap">Rap</option>
          <option value="Techno/Electronic">Techno/Electronic</option>
          <option value="Country">Country</option>
          <option value="Folk/World">Folk/World</option>
        </select>
      {props.bands && Array.isArray(props.bands) ? (
        props.bands.map((band) => (
          band && band._id ? (
            <Link key={band._id} to={`/bands/${band._id}`}>
              <article className="bandList">
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