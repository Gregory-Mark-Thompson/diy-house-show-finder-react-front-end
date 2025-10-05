import { useState, useEffect, useContext } from 'react';
import * as gigService from '../../services/gigService';
import { useParams, Link } from 'react-router-dom';
import CommentForm from '../CommentForm/CommentForm';
import { UserContext } from '../../contexts/UserContext';

const GigDetails = (props) => {
  const { gigId } = useParams();
  const { user } = useContext(UserContext);
  const [gig, setGig] = useState(null);
  console.log('gigId', gigId);

  useEffect(() => {
    const fetchGig = async () => {
      const gigData = await gigService.show(gigId);
      setGig(gigData);
    };
    fetchGig();
  }, [gigId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await gigService.createComment(gigId, commentFormData);
    setGig({ ...gig, comments: [...gig.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    const deletedComment = await gigService.deleteComment(gigId, commentId);
    setGig({
      ...gig,
      comments: gig.comments.filter((comment) => comment._id !== commentId),
    });
  };


  console.log('gig state:', gig);

  if (!gig) return <main>Loading...</main>;

  const visibleComments = gig.comments.filter(
    (comment) => user && (comment.author._id === user._id || gig.author._id === user._id)
  );

  return (
    <main>
      <section>
        <header>
          <p>{gig.category.toUpperCase()}</p>
          <h1>{gig.title}</h1>
          <p>
            {`${gig.author.username} posted on
            ${new Date(gig.createdAt).toLocaleDateString()}`}
          </p>
            {gig.author._id === user._id && (
              <>
            <Link to={`/gigs/${gigId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteGig(gigId)}>
              Delete
            </button>

              </>
            )}
        </header>
        <p>{gig.text}</p>
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
            <Link to={`/gigs/${gigId}/comments/${comment._id}/edit`}>Edit</Link>

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

export default GigDetails;