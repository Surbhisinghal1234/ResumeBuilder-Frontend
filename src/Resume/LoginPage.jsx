
import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./LoginPhe.css";
import { inputContext } from "./Main";

// import { inputContext } from "./Main";
// import { useAuth0 } from "@auth0/auth0-react";

function LoginPage() {
  // const {user,loginWithRedirect,isAuthenticated} = useAuth0();
  // console.log(user,"user")
  // const { user, setUser } = useContext(inputContext);
  // const [loginUser, setLoginUser] = useState({
  //   email: "",
  //   password: ""
  // })
  const { loginUser, setLoginUser} = useContext(inputContext);
 


  // const [password, setPassword] = useState("")
  
  const [loginStatus, setLoginStatus] = useState("");

  function handleRegister(key, value) {
    setLoginUser((prevUser) => ({ ...prevUser, [key]: value }));
  }

  function handleLogin(e) {
    e.preventDefault(); 


    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginUser.email,
        password: loginUser.password,

      }),
    })
      .then((response) => {
    
          response.json();    
      })
      .then((data) => {
       
        setLoginStatus("password match")
         sessionStorage.setItem("userEmail", loginUser.email);
        window.location.href="/create"
      })
      .catch((error) => {
        setLoginStatus("password not match"); 
        console.error("Login error:", error); 
      });
  }

  return (
    <>
      <div className="bg-img flex items-center justify-center w-full h-screen">
        <div className="w-[65%] h-[80%] rounded-xl overflow-hidden flex text-center">
          <div className="border-black border-r-2 bg-slate-400 w-full h-full flex flex-col items-center justify-center gap-y-[1.5rem]">
            <div className="h-[70%] flex flex-col gap-[1.5rem]">
              <h1 className="welcome font-bold text-white text-2xl">WELCOME USER</h1>
              
              <p  className="cursor-pointer  custom-shadow w-[20rem] bg-white px-2 py-1 flex items-center rounded font-bold">
                <img src="./google.jpeg" className="w-[2rem] h-[2rem] mr-10" alt="" />
                Log in with Google
              </p>
              
              <div className="flex items-center">
                <p className="w-[5.1rem] h-[2px] bg-white"></p>
                <p className="text-black text-sm font-medium px-1">OR LOGIN WITH EMAIL</p>
                <p className="w-[5.1rem] h-[2px] bg-white "></p>
              </div>
              <form onSubmit={handleLogin} className="flex flex-col gap-[1.55rem]">

                <input
                  type="text"
                  placeholder="Email"
                  value={loginUser.email}
                  onChange={(e) => {
                    handleRegister("email", e.target.value);
                  }}
                  className="outline-none custom-shadow w-[20rem] px-2 py-2 flex items-center rounded"
                />
                <input
                  type="password" 
                  value={loginUser.password}
                  onChange={(e) => {
                    handleRegister("password", e.target.value);
                  }}
                  placeholder="Password"
                  className="outline-none custom-shadow w-[20rem] px-2 py-2 flex items-center rounded"
                />
                <div className="flex justify-between w-[20rem] px-2">
                  <div>
                    <input type="checkbox" /> <span>Keep me logged in</span>
                  </div>
                  <p>Forgot password</p>
                </div>
                <button type="submit" className="bg-white w-[20rem] py-[6px] rounded font-medium">
                  Log In
                </button>
              </form>
              {loginStatus === "password match" && (
                <p className="text-green-800 font-bold text-2xl">Login successful!</p>
              )}
              {loginStatus === "password not match" && (
                <p className="text-red-500 font-bold text-2xl">Incorrect email or password.</p>
              )}
             
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center">
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
