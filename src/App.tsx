import { LoginPage } from "./pages/Login";
import "./App.css";
import LoginImage from "./assets/loginBackground.png";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/signin"
          element={
            <LoginPage
              form_title="Sign into QuickGrade"
              id_or_email="Student Registration Number"
              placeholder="Enter your Registration number"
              backgroundImage={LoginImage}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;