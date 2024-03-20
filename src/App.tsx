import { useState } from "react";
import MainMenu from "./components/MainMenu";
import Auth from "./components/Auth/Auth";

const App = () => {
  const [jwt, setJwt] = useState("");
  return (
    <>
      {jwt ? <MainMenu jwt={jwt} setJwt={setJwt} /> : <Auth setJwt={setJwt} />}
    </>
  );
};

export default App;
