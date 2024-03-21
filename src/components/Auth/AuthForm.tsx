import { useState } from "react";
import MessageSpan from "../MessageSpan";
import { KEYS } from "../../types/keys";

interface props {
  type: "login" | "register";
  setJwt?: React.Dispatch<React.SetStateAction<string>>;
}

interface Message {
  text: string;
  error: boolean;
}

const AuthForm = ({ type, setJwt }: props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Info message
  const [message, setMessage] = useState<Message>();
  const [isMessage, setIsMessage] = useState(false);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const keys = (window as any).keys as KEYS;
  const handleSubmit = async () => {
    if (type === "login") {
      const res = await fetch(keys.server() + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (res.status === 401 || res.status === 500) {
        setMessage({ text: "Error. Try again!", error: true });
        setIsMessage(true);
        setPassword("");
        return;
      }
      const data = await res.json();
      setJwt(data.token);
    } else if (type === "register") {
      const res = await fetch(keys.server() + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (res.status === 401 || res.status === 500) {
        setMessage({ text: "Error. Try again!", error: true });
        setIsMessage(true);
        setPassword("");
        return;
      }
      if (res.status === 400) {
        // the username is already used, so change it
        setMessage({ text: "Username is already used.", error: true });
        setIsMessage(true);
        return;
      }
      if (res.status === 201) {
        // succesfull registration, so login
        setMessage({ text: "Successful! Time to login.", error: false });
        return;
      }
    }
  };
  return (
    <div className="auth-form">
      {isMessage ? <MessageSpan message={message} /> : void 0}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={onChangeUsername}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AuthForm;
