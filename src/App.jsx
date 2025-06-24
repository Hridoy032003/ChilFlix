
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";

import SingUp from "./routes/SingUp";
import SingIn from "./routes/SingIn";
import MoviePost from "./routes/MoviePost";
import MoviePostId from "./routes/MoviePostId";


function App() {
  return (


    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SingUp />} />
        <Route path="/Login" element={<SingIn />} />
        <Route path="/Movie" element={<MoviePost />} />
        <Route path="/post/:id" element={<MoviePostId />} />
      </Routes>
    </Router>

  );
}

export default App;
