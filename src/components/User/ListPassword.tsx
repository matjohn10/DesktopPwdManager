import PasswordItem from "./PasswordItem";

const ListPassword = () => {
  const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => (
    <PasswordItem test={item} />
  ));
  return <div className="list-container">{items}</div>;
};

export default ListPassword;
