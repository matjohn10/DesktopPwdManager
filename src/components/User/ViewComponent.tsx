const ViewComponent = () => {
  return (
    <div className="view-container">
      <div className="view-menu">
        <button className="generate-btn">
          <img
            src="static://images/security.png"
            alt="see-security"
            height={28}
            width={28}
          />
        </button>
        <button className="add-btn">
          <img
            src="static://images/add32.png"
            alt="add-password"
            height={32}
            width={32}
          />
        </button>
        <button className="setting-btn">
          <img
            src="static://images/setting32.png"
            alt="settings"
            height={24}
            width={24}
          />
        </button>
      </div>
      <div>Empty View</div>
    </div>
  );
};

export default ViewComponent;
