import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import { PostsContextProvider } from "./Context/PostsContext";

function App() {
  return (
    <PostsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </PostsContextProvider>
  );
}

export default App;
