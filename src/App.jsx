import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Form from "./components/Form";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Form text="Signup" />} />
        <Route path="/login" element={<Form text="Login" />} />
        <Route path="/dashboard" element={<Form text="Dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
