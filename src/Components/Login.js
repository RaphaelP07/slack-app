import slack from "../slack-logo.png";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Login = ({ loggedUser, setLoggedUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { users } = useContext(GlobalContext);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

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
    }
  };

  const onClick = (e) => {
    let currentUser = users.filter((user) => {
      return user.email === email;
    });

    if (currentUser.length <= 0) {
      setEmailError("Email Address does not exist!");
    } else {
      if (currentUser.length > 0) {
        if (currentUser[0].password !== password) {
          setPasswordError("Incorrect password");
        } else {
          navigate("/setup");
          setLoggedUser(currentUser[0].email);
        }
      }
    }
  };

  return (
    <div className="wrapper">
      <header>
        <div></div>
        <div className="center-column">
          <img src={slack} alt="slack logo" />
        </div>
        <div className="right-column">
          <p> New to Slack?</p>
          <Link to="/register"> Create an account </Link>
        </div>
      </header>
      <main>
        <div className="sub-header">
          <h1>Sign in to Slack</h1>
          <div>
            <p>
              We suggest using the{" "}
              <strong>email address you use at work.</strong>
            </p>
          </div>
        </div>
        <hr className="horizontal-ruler" />
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <div>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="name@work-email.com"
                value={email}
                onChange={onChange}
              ></input>
              <span>{emailError}</span>
              <input
                required
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={onChange}
              ></input>
              <span>{passwordError}</span>
            </div>
            <button className="btn-login" type="submit" onClick={onClick}>
              Sign In
            </button>
          </form>
        </div>
      </main>
      <footer>
        <div>Privacy & Terms</div>
        <div>Contact Us</div>
        <div>🌐 Change Region</div>
      </footer>
    </div>
  );
};

export default Login;
