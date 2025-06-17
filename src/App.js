 
  import { Routes, Route, useNavigate } from 'react-router-dom';
  import Header from './Header';
  import Nav from './Nav';
  import Home from './Home';
  import NewPost from './NewPost';
  import PostPage from './PostPage';
  import EditPost from './EditPost';  // ✅ Import EditPost component
  import About from './About';
  import Missing from './Missing';
  import Footer from './Footer';
  import { DataProvider } from './context/DataContext';


  function App() {
    
    return (
      <div className="App">
        <Header title="Scroll Buzz" />
        <DataProvider>
        <Nav />

        <Routes>
          <Route path="/" element={
            <Home />} />

          <Route path="post">
            <Route
              index
              element={
                <NewPost />
              }
            />
            <Route
              path=":id"
              element={
                <PostPage />
              }
            />
          </Route>

          {/* ✅ Edit Post Route */}
          <Route
            path="edit/:id"
            element={
              <EditPost />
            }
          />

          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>

        <Footer />
      </DataProvider>
      </div>
    );
  }

  export default App;
