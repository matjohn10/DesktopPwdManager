import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { KEYS } from "../types/keys";

interface props {
  jwt: string;
  setJwt: React.Dispatch<React.SetStateAction<string>>;
}

interface JWT extends JwtPayload {
  userId: string;
}
export interface UserData {
  _id: string;
  userId: string;
  username: string;
  password: string;
  iv: string;
  name: string;
  lastModified: Date;
  description: string;
  __v: number;
}

const MainMenu = ({ jwt, setJwt }: props) => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState<UserData[]>([]);

  const fetchRefresh = async () => {
    const res = await fetch(keys.server() + "/refresh", {
      method: "GET",
    });
    // check status
    if (res.status === 401) {
      setJwt("");
    }
    const data = await res.json();
    setJwt(data.token);
  };
  const keys = (window as any).keys as KEYS;
  const fetchUserData = async (user: string) => {
    const res = await fetch(keys.server() + "/api/" + user, {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (res.status === 401) {
      // The refresh token is expired or refresh token of another user
      // clear user data and jwt, user automatically logged out

      //localStorage.removeItem("jwt");
      setData([]);
      setUserId("");
      setJwt("");
      return;
    }
    if (res.status === 404) {
      console.log("Error with the querying the DB.");
      return;
    }
    const data = (await res.json()) as UserData[];
    setData(data);
  };

  useEffect(() => {
    const decodedJwt = jwtDecode(jwt) as JWT;
    console.log(jwt);
    if (Date.now() > (decodedJwt.exp || 1) * 1000) {
      console.log("Send server request for refresh token");
      fetchRefresh();
    } else {
      setUserId(decodedJwt.userId);
      fetchUserData(decodedJwt.userId);
    }
  }, []);
  return <div>MainMenu</div>;
};

export default MainMenu;
