import { observer } from "mobx-react-lite";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Homepage";

const App = observer(() => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="*" element={<HomePage />}/>
      </Routes>
    </Router>
  );
});

export default App;
