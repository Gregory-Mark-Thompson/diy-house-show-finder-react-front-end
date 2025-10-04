import { Link } from 'react-router';

const GigList = (props) => {
    return (
    <main>
      {props.gigs.map((gig) => (
        <Link key={gig._id} to={`/gigs/${gig._id}`}>
          <article>
            <header>
              <h2>{gig.title}</h2>
              <p>
                {`${gig.author.username} posted on
                ${new Date(gig.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{gig.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default GigList;