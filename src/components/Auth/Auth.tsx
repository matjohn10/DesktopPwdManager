import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

interface props {
  setJwt: React.Dispatch<React.SetStateAction<string>>;
}

const Auth = ({ setJwt }: props) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <h1>Crypto Chain</h1>
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
  );
};

export default Auth;
