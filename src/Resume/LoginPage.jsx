import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import "./LoginPhe.css";
import { inputContext } from "./Main";

// import { inputContext } from "./Main";
// import { useAuth0 } from "@auth0/auth0-react";

function LoginPage() {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  // const {user,loginWithRedirect,isAuthenticated} = useAuth0();
  // console.log(user,"user")
  // const { user, setUser } = useContext(inputContext);
  // const [loginUser, setLoginUser] = useState({
  //   email: "",
  //   password: ""
  // })
  // const { loginUser, setLoginUser} = useContext(inputContext);

  // const [password, setPassword] = useState("")

  const [loginStatus, setLoginStatus] = useState("");

  function handleRegister(key, value) {
    setLoginUser((prevUser) => ({ ...prevUser, [key]: value }));
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!loginUser.email || !loginUser.password) {
      setLoginStatus("Please enter email and password");
      return;
    }

    fetch("https://resumebuilder-backend-1.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // mode: "no-cors",

      body: JSON.stringify({
        email: loginUser.email,
        password: loginUser.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful") {
          setLoginStatus("Login successful!");
         
          sessionStorage.setItem("userEmail", loginUser.email);

          window.location.href = "/create";
        } else {
          setLoginStatus(data.message);
        }
      })
      .catch((error) => {
        setLoginStatus("Server error");
        console.error("error", error);
      });
  }

  return (
    <>
      <div className="bg-img flex items-center justify-center w-full h-screen">
        <div className="w-[65%] h-[75%] md:w-[80%] lg:w-[75%] xl:w-[65%] sm:h-[80%] rounded-xl overflow-hidden flex text-center justify-center items-center">
          <div className="border-black border-r-2 bg-slate-400 w-full h-full flex flex-col items-center justify-center gap-[1rem] sm:gap-y-[1.5rem]">
            <div className="h-[70%] flex flex-col justify-center items-center sm:justify-normal      gap-[1rem] sm:gap-[1.5rem]">
              <h1 className="welcome font-bold text-white text-2xl">
                WELCOME USER
              </h1>

              <p className="cursor-pointer  w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem]  custom-shadow  bg-white px-2 py-1 flex items-center rounded font-bold">
                <img
                  src="./google.jpeg"
                  className="w-[2rem] h-[2rem] mr-10"
                  alt=""
                />
                Log in with Google
              </p>

              <div className="flex items-center">
                <p className="hidden sm:visible w-[5.1rem] h-[2px] bg-white"></p>
                <p className="text-black text-sm font-medium px-1">
                  OR LOGIN WITH EMAIL
                </p>
                <p className="hidden sm:visible w-[5.1rem] h-[2px] bg-white "></p>
              </div>
              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-[1rem] sm:gap-[1.55rem] justify-center items-center"
              >
                <input
                  type="text"
                  placeholder="Email"
                  value={loginUser.email}
                  onChange={(e) => {
                    handleRegister("email", e.target.value);
                  }}
                  className="outline-none custom-shadow  w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem] px-2 py-2 flex items-center rounded"
                />
                <input
                  type="password"
                  value={loginUser.password}
                  onChange={(e) => {
                    handleRegister("password", e.target.value);
                  }}
                  placeholder="Password"
                  className="outline-none custom-shadow  w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem] px-2 py-2 flex items-center rounded"
                />
                <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between w-[20rem] px-2 gap-[.4rem] sm:gap-0">
                  <div>
                    <input type="checkbox" /> <span>Keep me logged in</span>
                  </div>
                  <p>Forgot password</p>
                </div>
                <button
                  type="submit"
                  className="bg-white  w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem] py-[6px] rounded font-medium"
                >
                  Log In
                </button>
                <Link to="/register">
                  <button
                    type="submit"
                    className="bg-white  w-[15rem] sm:w-[20rem] md:w-[16rem] lg:w-[20rem] py-[6px] rounded font-medium"
                  >
                    Register
                  </button>
                </Link>
              </form>
              {loginStatus && (
                <p
                  className={`font-bold text-2xl ${
                    loginStatus === "Login successful!"
                      ? "text-green-800"
                      : "text-red-500"
                  }`}
                >
                  {loginStatus}
                </p>
              )}
            </div>
          </div>
          <div className="bg-right-img w-full h-full flex justify-center items-center">
            <img
              src="./registration-img-4.jpg"
              className="object-cover h-[100%] w-[100%] overflow-hidden"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
