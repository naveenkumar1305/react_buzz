import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataContext from './context/DataContext';

const PostPage = () => {
  const {posts, handleDelete } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find(post => post.id.toString() === id);

  return (
    <main className="PostPage">
      {post ? (
        <article className="post">
          <h2>{post.title}</h2>
          <p className="postDate">{post.dateTime}</p>
          <p className="postBody">{post.body}</p>

          {/* ✅ Edit and Delete buttons */}
          <Link to={`/edit/${post.id}`}>
            <button className="editButton">Edit</button>
          </Link>
          <button
            className="deleteButton"
            onClick={() => handleDelete(post.id)}
          >
            Delete
          </button>
        </article>
      ) : (
        <section>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </section>
      )}
    </main>
  );
};

export default PostPage;
