import { useEffect, useState } from "react";
import MessageSpan from "../MessageSpan";
import { KEYS } from "../../types/keys";

interface props {
  type: "login" | "register";
  setJwt?: React.Dispatch<React.SetStateAction<string>>;
  setLogin?: (value: React.SetStateAction<boolean>) => void;
  setLeftcn?: React.Dispatch<React.SetStateAction<string>>;
  setRightcn?: React.Dispatch<React.SetStateAction<string>>;
  setLockcn?: React.Dispatch<React.SetStateAction<string>>;
  setTitle?: React.Dispatch<React.SetStateAction<string>>;
}

interface Message {
  text: string;
  error: boolean;
}

const AuthForm = ({
  type,
  setJwt,
  setLogin,
  setLeftcn,
  setLockcn,
  setRightcn,
  setTitle,
}: props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (setJwt)
      (window as any).keys.getJwt().then((token: string) => setJwt(token));
  }, []);

  //Info message
  const [message, setMessage] = useState<Message>();
  const [isMessage, setIsMessage] = useState(false);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  // DECORATIVE FUNCTION
  const decorate = () => {
    setLeftcn((prev) => prev + " animate-left");
    setRightcn((prev) => prev + " animate-right");
    setLockcn((prev) => prev + " rotate-lock");
    setTimeout(() => setTitle("Login"), 1100);
  };

  const handleSubmit = async () => {
    if (type === "login") {
      const res = await (window as any).server.login({ username, password });
      if (res.status === 401) {
        setMessage({ text: "Wrong username or password.", error: true });
        setIsMessage(true);
        setPassword("");
        return;
      }
      if (res.status === 500) {
        setMessage({ text: "Server Error!", error: true });
        setIsMessage(true);
        setPassword("");
        return;
      }
      //window.localStorage.setItem("jwt", res.data.token);
      (window as any).keys.saveJwt(res.data.token);
      setJwt(res.data.token);
    } else if (type === "register") {
      const res = await (window as any).server.register({ username, password });
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
        decorate();
        setTimeout(() => setLogin(true), 4850);
        // maybe implement a cool animation on registration that leads to login??
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
