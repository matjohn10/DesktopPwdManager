import { useState } from "react";
import AuthForm from "./AuthForm";

interface props {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = ({ setLogin }: props) => {
  const [img, setImg] = useState("btn-switch");

  // Decorative states
  const [leftcn, setLeftcn] = useState("left-door");
  const [rightcn, setRightcn] = useState("right-door");
  const [lockcn, setLockcn] = useState("lock");
  const [title, setTitle] = useState("Register");
  return (
    <div className="login-reg-container">
      <div className="auth-header">
        <h1>{title}</h1>
        <button
          onClick={() => {
            setImg("btn-switch rotate");
            setTimeout(() => setLogin(true), 550);
          }}
        >
          <img
            className={img}
            width="24"
            height="24"
            src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/000000/external-switch-graphic-design-tanah-basah-glyph-tanah-basah.png"
            alt="Switch Form"
          />
        </button>
      </div>
      <AuthForm
        type="register"
        setLogin={setLogin}
        setLeftcn={setLeftcn}
        setLockcn={setLockcn}
        setRightcn={setRightcn}
        setTitle={setTitle}
      />

      {/* DECORATIVE CONTENT */}
      <div className={leftcn}>
        <img src="static://images/texture.jpeg" alt="texture" />
      </div>
      <div className={rightcn}>
        <img src="static://images/texture.jpeg" alt="texture" />
        <div className={lockcn}>
          <img
            src="static://images/vault64.png"
            alt="vault-handle"
            height={64}
            width={64}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
