import { observer } from "mobx-react-lite";
import { authStore } from "../stores/AuthStore";
import { useState } from "react";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authUser = async () => {
    await authStore.login(email, password);
  };

  const handleLogout = () => {
    authStore.logout();
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <h2>
        <div>
          {authStore.isLogged ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={authUser}>Login</button>
          )}
        </div>
      </h2>
    </div>
  );
});

export default Login;
