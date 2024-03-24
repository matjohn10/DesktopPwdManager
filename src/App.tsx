import { useEffect, useState } from "react";
import MainMenu from "./components/User/MainMenu";
import Auth from "./components/Auth/Auth";
import Test from "./components/Test";

const App = () => {
  const [jwt, setJwt] = useState<string>("");
  useEffect(() => {
    (window as any).keys.getJwt().then((token: string) => setJwt(token));
  }, []);
  return (
    <>
      {jwt ? <MainMenu jwt={jwt} setJwt={setJwt} /> : <Auth setJwt={setJwt} />}
      {/* <Test /> */}
    </>
  );
};

export default App;
