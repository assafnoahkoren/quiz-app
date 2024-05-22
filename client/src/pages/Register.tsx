import { useRef } from "react";
import { authStore } from "../stores/AuthStore";
import Button from "../components/UIElements/Button";
import Input from "../components/UIElements/Input";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const registerUser = async () => {
    if (
      emailRef.current!.value &&
      passwordRef.current!.value &&
      nameRef.current!.value
    ) {
      await authStore.register(
        emailRef.current!.value,
        passwordRef.current!.value,
        nameRef.current!.value
      );
      navigate("/homepage");
    } else {
      alert("enter required inputs");
    }
  };
  return (
    <div className="page-container">
      <div className="page-wraper">
        <br></br>
        <div className="page-header_container">
          <div className="page-header_headline">ברוכים הבאים 👋 </div>
          <div className="page-header_subheadline">יצירת חשבון חדש</div>
        </div>
        <br></br>
        <Input type="text" placeholder="שם מלא" ref={nameRef} />
        <Input type="text" placeholder="אימייל" ref={emailRef} />
        <Input type="password" placeholder="סיסמא" ref={passwordRef} />
        <Button onClick={registerUser}>הרשם</Button>
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

        <Link to="/login">
          <Button inverse>התחבר</Button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
