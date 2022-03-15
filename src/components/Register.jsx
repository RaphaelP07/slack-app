import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from "../context/GlobalState";
import slack from "../slack-logo.png";
import * as yup from "yup";
import axios from "axios";

const baseURL = "http://206.189.91.54/api/v1/";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(12).required(),
  confirmedPassword: yup.string().oneOf([yup.ref("password"), null]),
});

const Register = () => {
  const { users, addAccount } = useContext(GlobalContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  if (isSubmitSuccessful) {
    const values = getValues();
    console.log(values);
    axios
      .post(`${baseURL}auth?`, {
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPass,
        mode: "no-cors",
      })
      .then((res) => {
        console.log(res);
      });
    navigate("/slack-app");
  }

  const onSubmit = (form, e) => {
    e.preventDefault();

    const values = getValues();
    console.log(values);
    axios
      .post(`${baseURL}auth?`, {
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPass,
      })
      .then((res) => {
        console.log(res);
      });
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
          <div className="terms-register">
            <p>
              By continuing, you're agreeing to our Customer Terms of Service,
              User Terms of Service, Privacy Policy, and Cookie Policy.
            </p>
          </div>
        </div>
      </div>
      <div className="registered">
        <p>Already got a Slack account?</p>
        <Link to="/slack-app">Sign in to an existing account</Link>
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
