import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Form text="Signup" />} />
        <Route path="/login" element={<Form text="Login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
