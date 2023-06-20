import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import ReadPage from './pages/ReadPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TextEditor from './pages/Create';
import Profile from './pages/Profile';
import Update from './pages/Update';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/readArticle/:postId" element={<ReadPage />}></Route>
          <Route path="/create" element={<TextEditor />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/update/:postId" element={<Update />}></Route>
          <Route path="/profile/:userId" element={<Profile />}></Route>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
