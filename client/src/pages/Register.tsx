import { useState } from "react";
import { authStore } from "../stores/AuthStore";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const registerUser = async () => {
        await authStore.register(email, password, name);
    };
    return (
    <div>
        <h1>Register</h1>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default Register;
