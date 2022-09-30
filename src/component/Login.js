import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Loginuser } from "../redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

if (typeof window !== "undefined") {
  injectStyle();
}
export function NotifyLogin(show) {
  toast.dark(show);
}

const Login = () => {
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const message = useSelector((state) => state.token);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const [showCheck, setshowCheck] = useState(true);

  useEffect(() => {
    if (token) {
      // navigate("/dashboard");
      window.location.href = "/dashboard";
    }
  }, [message]);
  return (
    <div className="pagebg">
      <div className="loginbg">
        <h1>Login Form</h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            Dispatch(Loginuser(values));
            setSubmitting(false);
            setTimeout(() => {
              navigate("/dashboard");
            }, 3000);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={"inputField"}
                />
                <p>{errors.email && touched.email && errors.email}</p>
              </div>
              <div>
                <input
                  type={`${showCheck ? "password" : "text"}`}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={"inputField"}
                />
                <span className="Icon_Position">
                  {showCheck ? (
                    <VisibilityOffIcon
                      onClick={() => setshowCheck(!showCheck)}
                    />
                  ) : (
                    <RemoveRedEyeIcon
                      onClick={() => setshowCheck(!showCheck)}
                    />
                  )}
                </span>
                <p> {errors.password && touched.password && errors.password}</p>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={"fSize"}
                >
                  Submit
                </button>
              </div>

              <p className="floatRight" onClick={() => navigate("/register")}>
                Go To Register Form
              </p>
            </form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
