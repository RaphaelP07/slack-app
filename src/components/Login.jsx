import slack from "../slack-logo.png";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Login = ({ loggedUser, setLoggedUser }) => {
  const navigate = useNavigate();
  const { users } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    localStorage.getItem("loggedUser") !== null
      ? navigate("/slack-app/dashboard")
      : navigate("/slack-app");
  }, []);

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

  const onSubmit = (e) => {
    e.preventDefault();

    if (currentUser.length === 0 || password !== currentUser[0].password) {
      setFormError(true);
      return;
    } else {
      if (currentUser[0].hasOwnProperty("firstName") === false) {
        navigate("/slack-app/setup");
        setLoggedUser(currentUser[0].email);
        localStorage.setItem("loggedUser", currentUser[0].email);
      } else {
        navigate("/slack-app/dashboard");
        setLoggedUser(currentUser[0].email);
        localStorage.setItem("loggedUser", currentUser[0].email);
      }
    }
  };

  let currentUser = users.filter((user) => {
    return user.email === email;
  });

  return (
    <div className="wrapper">
      <header>
        <div></div>
        <div className="center-column">
          <img
            src={slack}
            alt="slack logo"
            onClick={() => window.location.reload()}
          />
        </div>
        <div className="right-column"></div>
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
          <form onSubmit={onSubmit} noValidate>
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
              <input
                required
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={onChange}
              ></input>
              <span className={formError === false ? "visibility-hidden" : ""}>
                Incorrect email or password
              </span>
            </div>
            <button className="btn-login" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </main>
      <div className="registered">
        <p> New to Slack?</p>
        <Link to="/slack-app/register"> Create an account </Link>
      </div>
      <footer>
        <div>Privacy & Terms</div>
        <div>Contact Us</div>
        <div>🌐 Change Region</div>
      </footer>
    </div>
  );
};

export default Login;
