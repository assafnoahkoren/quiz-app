import { observer } from "mobx-react-lite";
import { authStore } from "../stores/AuthStore";
import { useRef } from "react";
import Input from "../components/UIElements/Input";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { Button } from "@mui/material";

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
      <div className="page-wraper">
        <br></br>
        <div className="page-header_container">
          <div className="page-header_headline">ברוכים הבאים 👋 </div>
          <div className="page-header_subheadline">התחברו לחשבון שלכם</div>
        </div>
        <br></br>
        <Input placeholder="אימייל" type="text" ref={emailRef} />
        <Input placeholder="סיסמא" type="password" ref={passwordRef} />
        <Button variant="contained" onClick={authUser}>
          <div className="flex justify-center w-full">
              {authStore.loading ? <BarLoader color="white" /> : 'התחבר'}
            </div> 
        </Button>
        <br></br>
        <div style={{ opacity: 0.2 }}>או</div>
        <br></br>
        <Link to="/register">
          <Button>הרשם</Button>
        </Link>
      </div>
    </div>
  );
});

export default Login;
