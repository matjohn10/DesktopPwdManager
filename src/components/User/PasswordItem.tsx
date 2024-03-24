import { formatWebName } from "../../utils/stringFormat";
import { UserData } from "./MainMenu";

interface props {
  userPwd: UserData;
  className: string;
}

const PasswordItem = ({ userPwd, className }: props) => {
  return (
    <div className={"password-container " + className}>
      <div className="password-all-info">
        <div className="compagny-container">
          <div className="compagny-logo">
            <img src={"https://logo.clearbit.com/" + userPwd.name} alt="Logo" />
          </div>
        </div>
        <div className="pastille-info-container">
          <h3>{formatWebName(userPwd.name)}</h3>
          <p>{userPwd.username}</p>
        </div>
      </div>
      <div className="password-btns-container">
        <button>View</button>
        <button>Edit</button>
      </div>
    </div>
  );
};

export default PasswordItem;
