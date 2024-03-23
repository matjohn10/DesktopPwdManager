import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

interface props {
  setJwt: React.Dispatch<React.SetStateAction<string>>;
}

const Auth = ({ setJwt }: props) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="auth-container">
        <h1>
          Crypto <span className="title-span-color">Chain</span>
        </h1>
        <p>
          Never forget a password again. Securely store all your logins with{" "}
          <strong>
            <i>Crypto Chain</i>.
          </strong>
        </p>
        {isLogin ? (
          <Login setJwt={setJwt} setLogin={setIsLogin} />
        ) : (
          <Register setLogin={setIsLogin} />
        )}
      </div>
      <div className="decorative">
        <img src="static://images/3dTest.png" alt="testing..." />
      </div>
    </>
  );
};

export default Auth;
