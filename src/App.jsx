import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form text="Signup" />} />
        <Route path="/login" element={<Form text="Login" />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
