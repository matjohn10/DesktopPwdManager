import { useState } from "react";
import AuthForm from "./AuthForm";

interface props {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = ({ setLogin }: props) => {
  const [img, setImg] = useState("btn-switch");
  return (
    <div className="login-reg-container">
      <div className="auth-header">
        <h1>Register</h1>
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
      <AuthForm type="register" />
    </div>
  );
};

export default Register;
