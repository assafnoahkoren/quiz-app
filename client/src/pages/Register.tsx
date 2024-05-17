import { useState } from "react";
import { authStore } from "../stores/AuthStore";
import Button from "../components/UIElements/Button";
import Input from "../components/UIElements/Input";
import { Link } from "react-router-dom";
import Card from "../components/UIElements/Card";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    await authStore.register(email, password, name);
  };
  return (
    <Card>
      <h1>Register</h1>
      <Input
        label="Name"
        type="text"
        placeholder="Enter name..."
        value={name}
        onChange={setName}
      />
      <Input
        label="Email"
        type="text"
        placeholder="Enter email..."
        value={email}
        onChange={setEmail}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password..."
        value={password}
        onChange={setPassword}
      />
      <Button onClick={registerUser}>Register</Button>
      <h4>
        already have an account? <Link to="/login">login</Link>
      </h4>
    </Card>
  );
};

export default Register;
