import { useState } from "react";
import "./App.css";
import LoginPage from "./Components/LoginPage";
import MultiStepForm from "./Components/MultiStepForm";

function App() {
  const [auth, setAuth] = useState("");
  const [isAuth, setIsAuth] = useState(true);
  if (isAuth == true) {
    return (
      <>
      <LoginPage setIsAuth={setIsAuth} auth={auth} setAuth={setAuth} />
      </>
    );
  }
  else {
    return (
      <>
        <MultiStepForm auth={auth} />
      </>
    );
  }
}

export default App;
