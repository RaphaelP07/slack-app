import { useState } from "react";
import slack from "../slack-logo.png";

const Setup = () => {
  // const [gender, setGender] = useState("default");
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [nickname, setNickname] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    switch (e.target.id) {
      // case "gender":
      //   setGender(e.target.value);
      //   break;
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "nickname":
        setNickname(e.target.value);
        break;
    }
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
      <main>
        <div className="sub-header">
          <h1>Let's get you started!</h1>
          <div>
            <p>
              Tell us how you'd<strong> like to be called</strong>
            </p>
          </div>
        </div>
        <div className="form-container-setup">
          <form onSubmit={onSubmit}>
            <div>
              {/* <select
                defaultValue={gender}
                id="gender"
                onChange={onChange}
                className="select-gender"
              >
                <option value="default" disabled hidden>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select> */}
              <input
                required
                type="firstName"
                id="firstName"
                name="firstName"
                placeholder="First name"
                value={firstName}
                onChange={onChange}
              ></input>
              <input
                required
                type="nickname"
                id="nickname"
                name="nickname"
                placeholder="Last name"
                value={lastName}
                onChange={onChange}
              ></input>
              <input
                required
                type="nickname"
                id="nickname"
                name="nickname"
                placeholder="Nickname"
                value={nickname}
                onChange={onChange}
              ></input>
            </div>
            <button className="btn-login">All Set</button>
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

export default Setup;
