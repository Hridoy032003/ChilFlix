
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";

import SingUp from "./routes/SingUp";
import SingIn from "./routes/SingIn";
import MoviePost from "./routes/MoviePost";
import MoviePostId from "./routes/MoviePostId";
import { useState } from "react";


function App() {
  const [token,setToken]=useState(true)
  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }
  useState(()=>{
    if(sessionStorage.getItem('token')){
      let data=JSON.parse(sessionStorage.getItem('token'))
    }
  },[token])
  return (


    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SingUp />} />
        <Route path="/Login" element={<SingIn setToken={setToken}/>} />
        {token ? <Route path="/Movie" element={<MoviePost />} /> : <Route path="/Login" element={<SingIn />} />}
        <Route path="/post/:id" element={<MoviePostId />} />
      </Routes>
    </Router>

  );
}

export default App;
