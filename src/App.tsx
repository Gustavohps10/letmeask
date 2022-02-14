import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>HELLO WORLD</div>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
