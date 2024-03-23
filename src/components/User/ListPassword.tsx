import { UserData } from "./MainMenu";
import PasswordItem from "./PasswordItem";

interface props {
  data: UserData[];
}

const ListPassword = ({ data }: props) => {
  const getRandomClass = (): string => {
    return `color${Math.floor(Math.random() * (3 - 0 + 1)) + 0}`;
  };
  const items = data.map((item, index) => (
    <PasswordItem userPwd={item} className={getRandomClass()} />
  ));
  return <div className="list-container">{items}</div>;
};

export default ListPassword;
