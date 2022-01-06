import { Routes, Route } from "react-router-dom";
import Blog from "./Blog";
import Dashboard from "./Dashboard";
import Message from "./Message";
import Parametre from "./Parametre";
import Shop from "./Shop";

export const Router = () => (
    <Routes>
      <Route exact path="/" element={<Dashboard/>} />
      <Route path="/blog" element={<Blog/>} />
      <Route path="/shop" element={<Shop/>} />
      <Route path="/message" element={<Message/>} />
      <Route path="/parametre" element={<Parametre/>} /> 
    </Routes>
);