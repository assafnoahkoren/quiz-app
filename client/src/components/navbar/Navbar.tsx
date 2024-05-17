import { Link } from "react-router-dom";
import Button from "../UIElements/Button";
import "./Navbar.scss";
import { authStore } from "../../stores/AuthStore";
import { observer } from "mobx-react-lite";

const Navbar = observer(() => {
  const handleLogout = () => {
    authStore.logout();
  };
  return (
    <div className="navbar">
      {authStore.isLogged ? (
        <Link to="/">
          <Button onClick={handleLogout}>Logout</Button>
        </Link>
      ) : (
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
});

export default Navbar;
