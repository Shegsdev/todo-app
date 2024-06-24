import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Todo />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
