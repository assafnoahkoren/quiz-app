import { Link } from "react-router-dom";
import Button from "../UIElements/Button";
import "./Navbar.scss";
import { authStore } from "../../stores/AuthStore";
import { observer } from "mobx-react-lite";

const Navbar = observer(() => {
  const handleLogout = () => {
    authStore.logout();
  };
  const navbarClass = authStore.isLogged ? "navbar logged" : "navbar";
  return (
    <div className={navbarClass}>
      {authStore.isLogged && (
        <Link to="/login">
          <Button inverse onClick={handleLogout}>
            התנתק
          </Button>
        </Link>
      )}
      <Link to="/homepage">
        <div className="navbar-logo">קוויז</div>
      </Link>
    </div>
  );
});

export default Navbar;
