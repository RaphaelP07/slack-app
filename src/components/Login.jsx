import slack from "../slack-logo.png";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";

const Login = ({ loggedUser, setLoggedUser, setLoggedID }) => {
  const navigate = useNavigate();
  const { users, baseURL, setHeaders } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    axios
      .post(`${baseURL}auth/sign_in?`, {
        email: email,
        password: password,
        mode: "no-cors",
      })
      .then((res) => {
        // console.log(res);
        const headersObj = {
          ["access-token"]: Object.values(res.headers)[0],
          client: res.headers.client,
          expiry: res.headers.expiry,
          uid: res.headers.uid,
        };
        const id = res.data.data.id;
        setHeaders(headersObj);
        setLoggedUser(email);
        setLoggedID(id);
        localStorage.setItem("loggedID", id);
        localStorage.setItem("loggedUser", email);
        localStorage.setItem("headers", JSON.stringify(headersObj));
        navigate("/slack-app/dashboard");
      });
    // .catch((error) => {
    //   const { full_messages, ...errors } = error.response.data.errors;
    //   Object.keys(errors).forEach((name) => {
    //     setError(name, {
    //       type: "manual",
    //       message: error.response.data.errors.full_messages[0],
    //     });
    //   });
    // });
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
