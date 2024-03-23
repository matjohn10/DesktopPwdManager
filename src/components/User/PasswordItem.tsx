interface props {
  test: number;
}

const PasswordItem = ({ test }: props) => {
  return <div className="password-container">{test}</div>;
};

export default PasswordItem;
