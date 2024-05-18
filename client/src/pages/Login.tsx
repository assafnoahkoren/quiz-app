import { observer } from "mobx-react-lite";
import { authStore } from "../stores/AuthStore";
import { useRef, useState } from "react";
import Input from "../components/UIElements/Input";
import Button from "../components/UIElements/Button";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/UIElements/Card";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const authUser = async () => {
    try {
      console.log(emailRef.current!.value, passwordRef.current!.value);
      await authStore.login(emailRef.current!.value, passwordRef.current!.value);
      navigate("/homepage");
    } catch {
      alert("incorrect info");
    }
  };

  return (
    <Card>
      <h1>Login</h1>
      <Input
        label="Email"
        placeholder="Enter email..."
        type="text"
        ref={emailRef}
      />
      <Input
        label="Password"
        placeholder="Enter password..."
        type="text"
        ref={passwordRef}
      />
      <Button onClick={authUser}>Login</Button>
      <h4>
        don't have an account? <Link to="/register">register</Link>
      </h4>
    </Card>
  );
});

export default Login;
