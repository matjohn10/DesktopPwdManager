import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

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
    const res = await (window as any).server.refresh(userId);
    // check status
    if (res.status !== 200) {
      window.localStorage.removeItem("jwt");
      setJwt("");
      return;
    }
    window.localStorage.setItem("jwt", res.data.token);
    setJwt(res.data.token);
  };

  const fetchUserData = async (user: string) => {
    const res = await (window as any).server.getUserData(user, jwt);
    if (res.status === 401) {
      // The refresh token is expired or refresh token of another user
      // clear user data and jwt, user automatically logged out
      window.localStorage.removeItem("jwt");
      setData([]);
      setUserId("");
      setJwt("");
      return;
    }
    if (res.status === 404) {
      console.log("Error with the querying the DB.");
      return;
    }
    setData(res.data);
  };

  useEffect(() => {
    const decodedJwt = jwtDecode(jwt) as JWT;
    //console.log(jwt);
    if (Date.now() > (decodedJwt.exp || 1) * 1000) {
      console.log("Send server request for refresh token");
      fetchRefresh();
    } else {
      setUserId(decodedJwt.userId);
      fetchUserData(decodedJwt.userId);
    }
  }, []);
  return (
    <div>
      <h3>User Info:</h3>
      <ul>
        {data.map((web) => (
          <li>{web.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MainMenu;
