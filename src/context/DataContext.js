import { createContext , useState , useEffect, Children } from "react";
import Post from "../Post";
import PostLayout from "../PostLayout"
import { format } from 'date-fns';
import api from '../api/ApiPost';
import EditPost from '../EditPost';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const DataContext = createContext({});

export const DataProvider = ({children}) =>{
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');

    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');

    const inputRef = useRef('');
    const navigate = useNavigate();
    const {width} = useWindowSize();
    const {data, fetchError , isLoading}= useAxiosFetch('http://localhost:3500/posts')

    useEffect(() => {
      setPosts(data);
    },[data])

    // Filter posts based on search
    useEffect(() => {
      const filteredResults = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResult(filteredResults.reverse());
    }, [posts, search]);

    // Add new post
    const handleSubmit = async (e) => {
    e.preventDefault();

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, dateTime, body: postBody };

    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');  // ✅ Redirect to Home after posting
    } catch (err) {
      console.error("❌ Error creating post:", err.message);
    }
  };


    // Delete post
    const handleDelete = async (id) => {
      try {
        await api.delete(`/posts/${id}`);
        const postList = posts.filter(post => post.id !== id);
        setPosts(postList);
        navigate('/');
      } catch (err) {
        console.error("❌ Error deleting post:", err.message);
      }
    };

    // Edit existing post
    const handleEdit = async (id) => {
      const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
      const updatedPost = { id, title: editTitle, dateTime, body: editBody };

      try {
        const response = await api.put(`/posts/${id}`, updatedPost);
        setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
        setEditTitle('');
        setEditBody('');
        navigate('/');
      } catch (err) {
        console.error("❌ Error editing post:", err.message);
      }
    };

    return (
        <DataContext.Provider value={{
            width, search, setSearch, 
            searchResult, fetchError , isLoading,
            handleSubmit, postTitle, setPostTitle, postBody, setPostBody, 
            posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody, 
            handleDelete
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext