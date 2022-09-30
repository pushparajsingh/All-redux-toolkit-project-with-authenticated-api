import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

if (typeof window !== "undefined") {
  injectStyle();
}
export function Notify(show) {
  toast.dark(show);
}

const SignupSchema = Yup.object().shape({
  Name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});
const ValidationSchema = () => {
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const message = useSelector((state) => state.token);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const [showCheck, setshowCheck] = useState(true);
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [message]);

  return (
    <div className="fullBox">
      <div className="smallBox">
        <h1>Signup</h1>
        <Formik
          initialValues={{
            Name: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            // console.log(values);
            Dispatch(register(values));
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="marginbottom">
                <Field
                  name="Name"
                  placeholder="Name"
                  className={"inputField"}
                />
                {errors.Name && touched.Name ? <div>{errors.Name}</div> : null}
              </div>
              <div className="marginbottom">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={"inputField"}
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>
              <div className="marginbottom">
                <Field
                  name="password"
                  type={`${showCheck ? "password" : "text"}`}
                  placeholder="Password"
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
              </div>
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <br />
              <button type="submit" className="fSize">
                Submit
              </button>

              <p
                className="floatRight"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Go To Login
              </p>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};
export default ValidationSchema;
