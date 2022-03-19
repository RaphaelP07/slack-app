import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from "../context/GlobalState";
import slack from "../images/slack-logo.png";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string(),
  confirmedPassword: yup.string().oneOf([yup.ref("password"), null]),
});

const Register = () => {
  const { baseURL } = useContext(GlobalContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitSuccessful },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors)

  useEffect(() => {
    if (isSubmitSuccessful) {
      const values = getValues();
      console.log(values);
      axios
        .post(`${baseURL}/auth?`, {
          email: values.email,
          password: values.password,
          password_confirmation: values.confirmPass,
          mode: "no-cors",
        })
        .then((res) => {
          navigate("/slack-app");
        })
        .catch((error) => {
          const { full_messages, ...errors } = error.response.data.errors;
          Object.keys(errors).forEach((name) => {
            setError(name, {
              type: "manual",
              message: error.response.data.errors.full_messages[0],
            });
          });
        });
    }
  }, [isSubmitSuccessful]);

  const onSubmit = (form, e) => {
    e.preventDefault();
  };

  return (
    <div className="wrapper">
      <header>
        <div></div>
        <div className="center-column">
          <Link to="/slack-app">
            {" "}
            <img src={slack} alt="slack logo" />{" "}
          </Link>
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
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="name@work-email.com"
                {...register("email")}
              ></input>
              <span>{errors.email?.message}</span>
              <input
                required
                type="password"
                id="password"
                name="password"
                placeholder="password"
                {...register("password")}
              ></input>
              <span>{errors.password?.message}</span>
              <input
                required
                type="password"
                id="confirmedPassword"
                name="confirmedPassword"
                placeholder="confirm password"
                {...register("confirmedPassword")}
              ></input>
              <span>
                {errors.confirmedPassword && "password does not match"}
              </span>
            </div>
            <button className="btn-signup" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="registered">
        <p>Already got a Lacks account?</p>
        <Link to="/slack-app">Sign in to an existing account</Link>
      </div>
      <footer>
        <div>© 2022 Raphael Padua and Ronny Pinoon</div>
      </footer>
    </div>
  );
};

export default Register;
