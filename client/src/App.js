import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UploadFile from "./components/UploadFile";


function App() {
  
  return (
    <div className="flex items-center flex-col mt-20 pb-4">     
    <Navbar />
     <Routes>
       <Route path="/" index element={<Home />} />
       <Route path="/upload" element={<UploadFile />} />
     </Routes>
    </div>
   
  );
}
export default App;
