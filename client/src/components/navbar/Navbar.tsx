import "./Navbar.scss";
import { authStore } from "../../stores/AuthStore";
import { observer } from "mobx-react-lite";
import { uiStore } from "../../stores/UIStore";

const Navbar = observer(() => {

  const navbarClass = authStore.isLogged ? "logged" : "";
  return (
    <div className={`navbar ${navbarClass}`}>
      <div className="navbar-logo flex-1">קוויז</div>
      {authStore.isLogged && (
        <div onClick={() => uiStore.menuOpen = !uiStore.menuOpen}>
          <i className="fas fa-bars text-blue-5 p-3 me-2"></i>
        </div>
      )}
    </div>
  );
});

export default Navbar;
