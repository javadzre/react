import React, { useState,useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { logiUser } from "../../services/usersService";
import { withRouter } from "react-router-dom";
import simpleReactValidation from "simple-react-validator";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, forceUpdate] = useState();

  const validation = useRef( new simpleReactValidation({
    messages: {
      required: "پرکردن این فیلد اجیاری است!",
      min: "کمترین تعداد کاراکتر ها باید برابر با 5 باشد",
    },
    element: (message) => (
      <div style={{ color: "red", padding: "8px" }} className="">{message}</div>
    ),
  }));
  const resetState = () => {
    setEmail("");
    setPassword("");
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    const user = {
      password,
      email,
    };

    try {
      if (validation.current.allValid()) {
        const { status, data } = await logiUser(user);

        if (status === 200) {
          toast.success("تبریک شما با موفقیت وارد سایت شده اید", {
            position: "top-right",
            closeButton: true,
          });
          localStorage.setItem("token", data.token);

          history.replace("/");
          resetState();
        }
      } else {
        validation.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <main className="client-page">
      <div className="container-content">
        <header>
          <h2> ورود به سایت </h2>
        </header>

        <div className="form-layer">
          <form action="" method="" onSubmit={handelSubmit}>
            <div className="input-group">
              <span className="input-group-addon" id="email-address">
                <i className="zmdi zmdi-email"></i>
              </span>
              <input
                name="email"
                type="text"
                className="form-control"
                value={email}
                placeholder="ایمیل"
                aria-describedby="email-address"
                onChange={(e) => {
                  setEmail(e.target.value);
                  validation.current.showMessageFor("email");
                }}
              />
              {validation.current.message("email", email, "required")}
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="password">
                <i className="zmdi zmdi-lock"></i>
              </span>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="رمز عبور "
                aria-describedby="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validation.current.showMessageFor("password");
                }}
                value={password}
              />
              {validation.current.message("password", password, "required")}
            </div>

            <div className="remember-me">
              <label>
                <input type="checkbox" name="" /> مرا بخاطر بسپار{" "}
              </label>
            </div>

            <div className="link">
              <a href="">
                {" "}
                <i className="zmdi zmdi-lock"></i> رمز عبور خود را فراموش کرده
                ام !
              </a>
              <a href="">
                {" "}
                <i className="zmdi zmdi-account"></i> عضویت در سایت{" "}
              </a>
            </div>

            <button className="btn btn-success"> ورود به سایت </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </main>
  );
};

export default withRouter(Login);
