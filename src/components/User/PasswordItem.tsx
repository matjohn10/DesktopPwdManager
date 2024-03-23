import { UserData } from "./MainMenu";

interface props {
  userPwd: UserData;
  className: string;
}

const PasswordItem = ({ userPwd, className }: props) => {
  return (
    <div className={"password-container " + className}>
      <div className="compgany-container">
        <div className="compagny-logo">
          <img src={"https://logo.clearbit.com/" + userPwd.name} alt="Logo" />
        </div>
        <h3>{userPwd.name}</h3>
      </div>

      <div className="password-btns-container">Buttons</div>
    </div>
  );
};

export default PasswordItem;
