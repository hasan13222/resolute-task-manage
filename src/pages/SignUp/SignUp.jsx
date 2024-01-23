import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [signupError, setSignupError] = useState("");
  const auth = getAuth(app);
  const navigate = useNavigate();

  const { handleSignUp } = useContext(AuthContext);

  const notify = () => toast("You Signed Up Successfully");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const proImg = form.profile_photo.files[0];
    const proImgData = { image: proImg };

    const email = form.email.value;
    const password = form.password.value;
    const userName = form.full_name.value;

    handleSignUp(email, password)
      .then(() => {
        setSignupError("");

        // photo url fetching and updating profile
        axios
          .post(
            "https://api.imgbb.com/1/upload?key=787a92272c8fe84458fd69331f72c734",
            proImgData,
            {
              headers: { "content-Type": "multipart/form-data" },
            }
          )
          .then((imgbbData) => {
            // updating profile by firebase
            updateProfile(auth.currentUser, {
              displayName: userName,
              photoURL: imgbbData.data.data.display_url,
            })
              .then(() => {
                notify();
                form.reset();                
                setSignupError('')
                navigate('/');
              })
              .catch((error) => {
                setSignupError(error.message);
              });
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setSignupError(errorMessage);
      });
  };

  return (
    <>
      <div className="container-fluid signup-full">
        <div className="container signup-wrap mx-auto flex flex-col justify-center items-center">
          <h2 className="text-center font-bold text-3xl">SignUp</h2>
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="full_name">Full Name</label>
              <input
                required
                className="input input-bordered w-full max-w-xs"
                type="text"
                name="full_name"
                placeholder="Full Name"
              />
            </div>
            <div className="item">
              <label htmlFor="email">Email</label>
              <input
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
                pattern="^(?=.*[A-Z])(?=.*[\W_]).{7,}$"
                className="input input-bordered w-full max-w-xs"
                type="password"
                name="password"
                placeholder="Password"
              />
              <small>
                Note: Your Password have to be more than 6 characters with a
                capital letter and a special character
              </small>
            </div>
            <div className="item">
              <label htmlFor="profile_photo">Upload Profile Picture</label>
              <input
                required
                className="input input-bordered w-full max-w-xs p-2"
                type="file"
                name="profile_photo"
              />
            </div>
            <div className="item submit_itm">
              <p className="warning">{signupError}</p>
              <input
                className="bg-indigo-600 text-white input cursor-pointer hover:opacity-90"
                type="submit"
                value="SignUp"
              />
            </div>
          </form>
          <p className="mt-2">
            Already Sign Up? Please{" "}
            <a className="font-medium underline" href="/login">
              Login
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
