import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { registerUser } from "./../../services/usersService";
import simpleReactValidator from "simple-react-validator";

const Register = () => {
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, forceUpdate] = useState();

  const validation = useRef(
    new simpleReactValidator({
      messages: {
        required: "پرکردن این فیلد اجیاری است!",
        min: "کمترین تعداد کاراکتر ها باید برابر با 5 باشد",
      },element : message => <div style = {{color : "red" ,padding : "8px"}} className = ""> {message} </div>
    })
  );

  const resetState = () => {
    setfullname("");
    setEmail("");
    setPassword("");
  };
  const handelSubmit = async (event) => {
    event.preventDefault();
    const user = {
      fullname,
      email,
      password,
    };

    try {
      if (validation.current.allValid()) {
        const { status } = await registerUser(user);
        if (status === 201) {
          toast.success("تبریک کاربر شما با موفقیت ساخته شد", {
            position: "top-left",
            closeButton: true,
            autoClose: true,
            closeOnClick: true,
          });
        }
      } else {
        validation.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      toast.error("پوزش مشکلی درساخت کاربر وجود دارد", {
        position: "bottom-left",
        closeButton: true,
        autoClose: true,
        closeOnClick: true,
      });
    }
  };

  return (
    <main className="client-page">
      <div className="container-content">
        <header>
          <h2> عضویت در سایت </h2>
        </header>

        <div className="form-layer">
          <form action="" method="" onSubmit={handelSubmit}>
            <div className="input-group">
              <span className="input-group-addon" id="username">
                <i className="zmdi zmdi-account"></i>
              </span>
              <input
                name="fullname"
                type="text"
                className="form-control"
                placeholder="نام و نام خانوادگی"
                aria-describedby="username"
                onChange={(e) => {
                  setfullname(e.target.value);
                  validation.current.showMessageFor("fullname");
                }}
                value={fullname}
              />
              {validation.current.message(
                "fullname",
                fullname,
                "required|min:5 "
              )}
            </div>

            <div className="input-group">
              <span className="input-group-addon" id="email-address">
                <i className="zmdi zmdi-email"></i>
              </span>
              <input
                name="email"
                type="text"
                className="form-control"
                placeholder="ایمیل"
                aria-describedby="email-address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validation.current.showMessageFor("email");
                }}
              />
              {validation.current.message("email" , email , "required")}
            </div>

            <div className="input-group">
              <span className="input-group-addon" id="password">
                <i className="zmdi zmdi-lock"></i>
              </span>
              <input
                name="password"
                type="text"
                className="form-control"
                placeholder="رمز عبور "
                aria-describedby="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validation.current.showMessageFor("password");
                }}
              />
              {validation.current.message("password", password, "required")}
            </div>

            <div className="accept-rules">
              <label>
                <input type="checkbox" name="" /> قوانین و مقررات سایت را
                میپذیرم{" "}
              </label>
            </div>

            <div className="link">
              <a href="">
                {" "}
                <i className="zmdi zmdi-assignment"></i> قوانین و مقررات سایت !
              </a>
              <a href="">
                {" "}
                <i className="zmdi zmdi-account"></i> ورود به سایت{" "}
              </a>
            </div>

            <button className="btn btn-success"> عضویت در سایت </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default Register;
