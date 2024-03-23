import { UserData } from "./MainMenu";

interface props {
  setJwt: React.Dispatch<React.SetStateAction<string>>;
  setData: (value: React.SetStateAction<UserData[]>) => void;
  setUserId: (value: React.SetStateAction<string>) => void;
}

const NavBar = ({ setJwt, setData, setUserId }: props) => {
  const logout = async () => {
    await (window as any).keys.delJwt();
    setData([]);
    setUserId("");
    setJwt("");
  };
  return (
    <div className="navbar-container">
      <nav>
        <div className="nav-logo-container">
          <span>CC</span>
          <img
            src="static://images/logoTemp.svg"
            alt="Logo"
            height={52}
            width={52}
          />
        </div>
        <div className="search-bar-container">
          <input type="text" placeholder="Search a Password..." />
        </div>
        <div className="nav-settings">
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
          <button className="settings-btn">
            <img
              src="static://images/menu.png"
              alt="Settings"
              height={24}
              width={24}
            />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
