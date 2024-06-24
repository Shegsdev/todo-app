import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";
import About from "./components/About";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/todos" element={<Todo />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
