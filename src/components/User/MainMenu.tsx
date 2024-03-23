import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import NavBar from "./NavBar";
import ListPassword from "./ListPassword";
import ViewComponent from "./ViewComponent";

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

  const fetchRefresh = async (user_id: string) => {
    const res = await (window as any).server.refresh(user_id);
    // check status
    if (res.status !== 200) {
      //window.localStorage.removeItem("jwt");
      await (window as any).keys.delJwt();
      setJwt("");
      return;
    }
    (window as any).keys.getJwt().then((token: string) => setJwt(token));
    console.log("Refresh token succeed: ", res.data.token);
    setJwt(res.data.token);
    setUserId(user_id);
    fetchUserData(user_id, res.data.token);
  };

  const fetchUserData = async (user: string, newJwt: string) => {
    const res = await (window as any).server.getUserData(user, newJwt);
    if (res.status === 401) {
      // The refresh token is expired or refresh token of another user
      // clear user data and jwt, user automatically logged out
      await (window as any).keys.delJwt();
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
      fetchRefresh(decodedJwt.userId);
    } else {
      setUserId(decodedJwt.userId);
      fetchUserData(decodedJwt.userId, jwt);
    }
  }, []);

  return (
    <>
      <NavBar
        setJwt={setJwt}
        setData={setData}
        userId={userId}
        setUserId={setUserId}
      />
      <div className="main-container">
        <ListPassword data={data} />
        <ViewComponent />
      </div>
      <div className="Clearbit">
        <a href="https://clearbit.com">Logos provided by Clearbit</a>
      </div>
    </>
  );
};

export default MainMenu;
