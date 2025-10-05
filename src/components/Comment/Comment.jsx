import { Link, useNavigate } from 'react-router-dom';

const Comment = ({ comment, gigId, user, gig, handleDeleteComment }) => {
  const navigate = useNavigate();

  const handleReply = () => {
    console.log('Navigating to reply form with:', { gigId, parent: comment._id });
    navigate(`/gigs/${gigId}/comments/new`, { state: { parent: comment._id } });
  };

  return (
    <article key={comment._id}>
      <header>
        <p>
          {comment.author?.username
            ? `${comment.author.username} posted on ${new Date(comment.createdAt).toLocaleDateString()}`
            : 'Unknown'}
        </p>
        {comment.author?._id === user?._id && (
          <>
            <Link to={`/gigs/${gigId}/comments/${comment._id}/edit`}>Edit</Link>
            <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
          </>
        )}
      </header>
      <p>{comment.text}</p>
      {user && <button onClick={handleReply}>Reply</button>}
      {comment.children?.length > 0 && (
        <section style={{ marginLeft: '20px' }}>
          {comment.children.map((child) => (
            <Comment
              key={child._id}
              comment={child}
              gigId={gigId}
              user={user}
              gig={gig}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
        </section>
      )}
    </article>
  );
};

export default Comment;