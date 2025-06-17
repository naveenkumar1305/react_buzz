import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import DataContext from './context/DataContext';

const EditPost = () => {
  const {posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody} = useContext(DataContext)
  const { id } = useParams();
  const post = posts.find(post => post.id.toString() === id);

  React.useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <main className="EditPost">
      {post ? (
        <>
          <h2>Edit Post</h2>
          <form className="editPostForm" onSubmit={(e) => {
            e.preventDefault();
            handleEdit(post.id);
          }}>
            <label htmlFor="editTitle">Title:</label>
            <input
              id="editTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="editBody">Post:</label>
            <textarea
              id="editBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </>
      ) : (
        <p style={{ marginTop: "2rem" }}>Post Not Found</p>
      )}
    </main>
  );
};

export default EditPost;
