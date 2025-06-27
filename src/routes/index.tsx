import { Route, Routes } from "react-router-dom";
import ChatApp from "../pages/chatApp";
import Dashboard from "../pages/dashBoard";
import Board from "../pages/kanbanBoard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/Comparer" element={<Dashboard />} />
      <Route path="/chatApp" element={<ChatApp />} />
       <Route path="/kanbanboard" element={<Board />} />
    </Routes>
  );
}