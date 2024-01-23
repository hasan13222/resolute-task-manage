import { useContext, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [googleLoginError, setGoogleLoginError] = useState("");

  const emailRef = useRef();

  const { handleSignIn, handleGoogleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const notify = () => toast("You Logged In Successfully");
  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    handleSignIn(email, password)
      .then(() => {
        setLoginError("");
        notify();
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoginError(errorMessage);
      });
  };

  const handleGoogleSubmit = () => {
    handleGoogleSignIn()
      .then((result) => {
        if (result) {
          setGoogleLoginError("");
          notify();
          navigate("/");
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        setGoogleLoginError(errorMessage);
      });
  };

  // reset your password
  const resetPasswordHandler = () => {
    const emailAddr = emailRef.current.value;
    if (emailAddr) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, emailAddr)
        .then(() => {
          Swal.fire("An email has been sent to your email address to reset your password");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      Swal.fire("Please enter your email address in email field");
    }
  };
  return (
    <>
      <div className="container-fluid signup-full login-section">
        <div className="container signup-wrap mx-auto flex flex-col justify-center items-center">
          <h2 className="text-center font-bold text-3xl">Login</h2>
          <form className="min-w-80" onSubmit={handleLogin}>
            <div className="item">
              <label htmlFor="email">Email</label>
              <input
                ref={emailRef}
                required
                className="input input-bordered w-full max-w-xs"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="item">
              <label htmlFor="password">Password</label>
              <input
                required
                className="input input-bordered w-full max-w-xs"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="item submit_itm">
              <p className="warning">{loginError}</p>
              <p className="text-sky-700">
                Forget Your Password?{" "}
                <button onClick={resetPasswordHandler} className="underline">
                  reset password
                </button>
              </p>
              <input
                className="bg-indigo-600 text-white input cursor-pointer hover:opacity-90"
                type="submit"
                value="Login"
              />
            </div>
          </form>
          <p className="mt-1">
            Haven&apos;t Sign Up? Go to{" "}
            <a className="underline" href="/signup">
              SignUp
            </a>
          </p>
          <p className="mt-1">
            <span>OR</span>
          </p>
          <button
            onClick={handleGoogleSubmit}
            className="btn btn-info w-80 mt-2"
          >
            Sign In with Google
          </button>
          <p className="warning">{googleLoginError}</p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
