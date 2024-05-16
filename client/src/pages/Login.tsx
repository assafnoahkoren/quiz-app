import { authStore } from "../stores/AuthStore";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(authStore.isLogged);

  const authUser = async () => {
    await authStore.login(email, password);
    setIsLogged(authStore.isLogged);
  };

  const handleLogout = () => {
    authStore.logout();
    setIsLogged(authStore.isLogged);
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
          {isLogged ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={authUser}>Login</button>
          )}
        </div>
      </h2>
    </div>
  );
};

export default Login;
