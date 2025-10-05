import { useState, useEffect, useContext } from 'react';
import * as bandService from '../../services/bandService';
import { useParams, Link } from 'react-router';
import CommentForm from '../CommentForm/CommentForm';
import { UserContext } from '../../contexts/UserContext';

const BandDetails = (props) => {
  const { bandId } = useParams();
  const { user } = useContext(UserContext);
  const [band, setBand] = useState(null);
  console.log('bandId', bandId);

  useEffect(() => {
    const fetchBand = async () => {
      const bandData = await bandService.show(bandId);
      setBand(bandData);
    };
    fetchBand();
  }, [bandId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await bandService.createComment(bandId, commentFormData);
    setBand({ ...band, comments: [...band.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    const deletedComment = await bandService.deleteComment(bandId, commentId);
    setBand({
      ...band,
      comments: band.comments.filter((comment) => comment._id !== commentId),
    });
  };


  console.log('band state:', band);

  if (!band) return <main>Loading...</main>;

  const visibleComments = band.comments.filter(
    (comment) => user && (comment.author._id === user._id || band.author._id === user._id)
  );

  return (
    <main>
      <section>
        <header>
          <p>{band.category.toUpperCase()}</p>
          <h1>{band.title}</h1>
          <p>
            {`${band.author.username} posted on
            ${new Date(band.createdAt).toLocaleDateString()}`}
          </p>
            {band.author._id === user._id && (
              <>
            <Link to={`/bands/${bandId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteBand(bandId)}>
              Delete
            </button>

              </>
            )}
        </header>
        <p>{band.text}</p>
      </section>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment}/>
        {!visibleComments.length && <p>There are no comments.</p>}
        {visibleComments.map((comment) => (
            <article key={comment._id}>
                <header>
                    <p>
                        {`${comment.author.username} posted on
                        ${new Date(comment.createdAt).toLocaleDateString()}`}
                    </p>
        {comment.author._id === user._id && (
          <>
            <Link to={`/bands/${bandId}/comments/${comment._id}/edit`}>Edit</Link>

            <button onClick={() => handleDeleteComment(comment._id)}>
              Delete
            </button>
          </>
        )}
                </header>
                <p>{comment.text}</p>
            </article>
        ))}
      </section>
    </main>
  );
}

export default BandDetails;