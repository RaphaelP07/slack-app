import Login from "./components/Login";
import Register from "./components/Register";
import Setup from "./components/Setup";
import ErrorPage from "./components/ErrorPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
