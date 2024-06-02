import { observer } from "mobx-react-lite";
import { authStore } from "../stores/AuthStore";
import { useRef } from "react";
import Input from "../components/UIElements/Input";
import Button from "../components/UIElements/Button";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader, MoonLoader } from "react-spinners";

const Login = observer(() => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const authUser = async () => {
    try {
      console.log(emailRef.current!.value, passwordRef.current!.value);
      await authStore.login(
        emailRef.current!.value,
        passwordRef.current!.value
      );
      navigate("/home");
    } catch {
      alert("incorrect info");
    }
  };

  return (
    <div className="page-container">
      <div className="page-wrapper">
        <br></br>
        <div className="page-header_container">
          <div className="page-header_headline">ברוכים הבאים 👋 </div>
          <div className="page-header_subheadline">התחברו לחשבון שלכם</div>
        </div>
        <br></br>
        <Input placeholder="אימייל" type="text" ref={emailRef} />
        <Input placeholder="סיסמא" type="password" ref={passwordRef} />
        <Button onClick={authUser}>
          
          <div className="flex justify-center w-full">
          {authStore.loading ? <BarLoader color="white" /> : 'התחבר'}
          </div>        
        </Button>
        <br></br>
        <div
          style={{
            opacity: 0.2,
            display: "flex",
            gap: 6,
            width: "100%",
            alignItems: "center",
          }}
        >
          <div style={{ height: 1, flex: 1, background: "black" }}></div>
          <div>או</div>
          <div style={{ height: 1, flex: 1, background: "black" }}></div>
        </div>
        <br></br>
        <Link to="/register">
          <Button inverse>הרשם</Button>
        </Link>
      </div>
    </div>
  );
});

export default Login;
