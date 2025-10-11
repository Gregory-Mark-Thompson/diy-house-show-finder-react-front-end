import { useState, useEffect, useContext } from 'react';
import * as gigService from '../../services/gigService';
import { useParams, Link } from 'react-router-dom';
import CommentForm from '../CommentForm/CommentForm';
import Comment from '../Comment/Comment';
import { UserContext } from '../../contexts/UserContext';

const GigDetails = ({ handleDeleteGig }) => {
  const { gigId } = useParams();
  const { user } = useContext(UserContext);
  const [gig, setGig] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log('GigDetails gigId:', gigId);
    const fetchData = async () => {
      try {
        const [gigData, commentsData] = await Promise.all([
          gigService.show(gigId),
          gigService.indexComments(gigId),
        ]);
        setGig(gigData);
        setComments(commentsData);
      } catch (error) {
        console.error('GigDetails fetch error:', error);
      }
    };
    fetchData();
  }, [gigId]);

const handleAddComment = async (commentFormData, gigIdFromForm) => {
  console.log('handleAddComment:', {
    gigId: String(gigId),
    gigIdFromForm,
    commentFormData,
    serialized: JSON.stringify(commentFormData)
  });
  if (gigIdFromForm !== gigId) {
    console.error('Gig ID mismatch:', { gigId, gigIdFromForm });
    throw new Error('Gig ID mismatch');
  }
  await gigService.createComment(String(gigId), commentFormData);
  const updatedComments = await gigService.indexComments(String(gigId));
  setComments(updatedComments);
};

  const handleDeleteComment = async (commentId) => {
    await gigService.deleteComment(gigId, commentId);
    const updatedComments = await gigService.indexComments(gigId);
    setComments(updatedComments);
  };

  if (!gig) return <main>Loading...</main>;

  return (
    <main>
      <section className="gigClass">
        <header>
          <p>{gig.category?.toUpperCase() || 'N/A'}</p>
          <h1>{gig.title || 'Untitled'}</h1>
          <p>
            {gig.author?.username
              ? `${gig.author.username} posted on ${new Date(gig.createdAt).toLocaleDateString()}`
              : 'Unknown author'}
          </p>
          {gig.author?._id === user?._id && (
            <>
              <Link to={`/gigs/${gigId}/edit`}>Edit</Link>
              <button onClick={() => handleDeleteGig(gigId)}>Delete</button>
            </>
          )}
        </header>
        <p><strong>Place: </strong>{gig.location || 'No location listed'}</p>
              <p><strong>Day & Time: </strong>
                {gig.date
                  ? new Date(gig.date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true, // Use 12-hour format with AM/PM
                    })
                  : 'No date or time listed'}
              </p>
        <p style = {{maxWidth: "50%"}}><strong>Gig Details: </strong>{gig.text || 'No description'}</p>
      </section>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!comments.length && <p>No comments yet.</p>}
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            gigId={gigId}
            user={user}
            gig={gig}
            handleDeleteComment={handleDeleteComment}
          />
        ))}
      </section>
    </main>
  );
};

export default GigDetails;