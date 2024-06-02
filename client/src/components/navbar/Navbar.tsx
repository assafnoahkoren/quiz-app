import { Link } from "react-router-dom";
import Button from "../UIElements/Button";
import "./Navbar.scss";
import { authStore } from "../../stores/AuthStore";
import { observer } from "mobx-react-lite";
import NiceModal from "@ebay/nice-modal-react";

const Navbar = observer(() => {
  const handleLogout = () => {
    authStore.logout();
  };
  const navbarClass = authStore.isLogged ? "logged" : "";
  return (
    <div className={`navbar ${navbarClass}`}>
      {authStore.isLogged && (
        <div
          className="p-2 text-red-500 flex gap-1 items-center"
          onClick={handleLogout}
        >
          <i className="fa-regular fa-right-from-bracket"></i>
          <span>התנתק</span>
        </div>
      )}
      {authStore.hasRole("admin") && <Button inverse onClick={() => NiceModal.show("AddQuestionsModal")}>הוספת שאלות</Button>}
      <Link to="/home">
        <div className="navbar-logo">קוויז</div>
      </Link>
    </div>
  );
});

export default Navbar;
