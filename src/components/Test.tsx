import { useState } from "react";

const Test = () => {
  const [leftcn, setLeftcn] = useState("left-door");
  const [rightcn, setRightcn] = useState("right-door");
  const [lockcn, setLockcn] = useState("lock");
  const test = () => {
    setLeftcn((prev) => prev + " animate-left");
    setRightcn((prev) => prev + " animate-right");
    setLockcn((prev) => prev + " rotate-lock");
  };
  const reset = () => {
    setLeftcn((prev) => prev + " animate-back-left");
    setRightcn((prev) => prev + " animate-back-right");
  };
  return (
    <div className="test-container">
      <div className="login-content">
        <h1>Test</h1>
        <div className={leftcn}></div>
        <div className={rightcn}>
          <div className={lockcn}>
            <img
              src="static://images/vault64.png"
              alt="vault-handle"
              height={64}
              width={64}
            />
          </div>
        </div>
      </div>
      <button onClick={test}>TEST</button>
      <button onClick={reset}>RESET</button>
    </div>
  );
};

export default Test;
