import { Link } from "react-router-dom";
import Button from "../UIElements/Button";
import "./Navbar.scss";
import { authStore } from "../../stores/AuthStore";
import { observer } from "mobx-react-lite";

const Navbar = observer(() => {
  const handleLogout = () => {
    authStore.logout();
  };
  const navbarClass = authStore.isLogged ? "logged" : "";
  return (
    <div className={`navbar ${navbarClass}`}>
      {authStore.isLogged && (
        <div className="p-2 text-red-500 flex gap-1 items-center" onClick={handleLogout}>
          <i className="fa-regular fa-right-from-bracket"></i>
          <span> 
            התנתק
          </span>
        </div>
      )}
      <Link to="/homepage">
        <div className="navbar-logo">קוויז</div>
      </Link>
    </div>
  );
});

export default Navbar;
