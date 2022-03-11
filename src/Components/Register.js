import { useState } from "react";
import slack from "../slack-logo.png";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmedPassword, setConfirmedPassword] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirmedPassword":
        setConfirmedPassword(e.target.value);
        break;
    }
  };

  const onClick = (e) => {
    navigate("/");
  };

  return (
    <div className="wrapper">
      <header>
        <div></div>
        <div className="center-column">
          <img src={slack} alt="slack logo" />
        </div>
        <div className="right-column"></div>
      </header>
      <div className="main-register">
        <div className="sub-header-register">
          <h1>First, enter your email</h1>
          <div>
            <p>
              We suggest using the{" "}
              <strong>email address you use at work.</strong>
            </p>
          </div>
        </div>
        <div className="form-container-register">
          <form onSubmit={onSubmit}>
            <div>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="name@work-email.com"
                onChange={onChange}
              ></input>
              <input
                required
                type="passwowrd"
                id="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={onChange}
              ></input>
              <input
                required
                type="passwowrd"
                id="password"
                name="password"
                placeholder="confirm password"
                value={confirmedPassword}
                onChange={onChange}
              ></input>
            </div>
            <button className="btn-login" type="button" onClick={onClick}>
              Sign Up
            </button>
          </form>
          <div className="terms-register">
            <p>
              By continuing, you're agreeing to our Customer Terms of Service,
              User Terms of Service, Privacy Policy, and Cookie Policy.
            </p>
          </div>
        </div>
        <div className="registered">
          <p>Already got a Slack account?</p>
          <Link to="/">Sign in to an existing account</Link>
        </div>
      </div>
      <footer>
        <div>Privacy & Terms</div>
        <div>Contact Us</div>
        <div>🌐 Change Region</div>
      </footer>
    </div>
  );
};

export default Register;
