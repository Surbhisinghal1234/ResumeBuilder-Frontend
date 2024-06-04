import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { inputContext } from "./Main";

function Resume() {
  const [userData, setUserData] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { email, setEmail } = useContext(inputContext);
  
  useEffect(() => {
    const userEmail = sessionStorage.getItem("userEmail");

    if (userEmail) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `https://resumebuilder-backend-1.onrender.com/api/userData?email=${userEmail}`
          );
         
          setUserData(response.data);
        } catch (error) {
          console.error("Error", error);
        }
      };

      fetchUserDetails();
    } else {
      console.error("email not found in session storage");
    }
  }, []);

  const { user, resumeProfile} = userData;

  useEffect(()=>{

  },[])

  // function handleLogout(){
  //   sessionStorage.clear("userEmail")
  //   window.location.href = "/"
  // }
  async function handleLogout() {
    try {
      await axios.post("https://resumebuilder-backend-1.onrender.com/logout");
      sessionStorage.clear("userEmail");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }


// console.log(resumeProfile,"resumeProfile")
  return (
    <>
      <div className="border-b-2 border-gray-400 ">
        <div className="container mx-auto w-[90%] py-3">
          <div className=" w-[100%] flex flex-col md:flex-row gap-[1.5rem] md:gap-0 items-center justify-between">
            <div className="w-[100%] flex items-center justify-evenly md:justify-start md:gap-[2rem]">
              <div>
                <h1 className="text-[2.4rem] font-bold">LOGO</h1>
              </div>
              <div className="text-left ml-5">
                <h3 className="font-medium text-xl text-gray-600">Resumes</h3>
                <p className="font-medium text-xl text-gray-600">
                  Management System
                </p>
              </div>
            </div>
            <div className="w-[100%] flex flex-col gap-y-[1rem] sm:gap-y-0 sm:flex-row items-center justify-evenly md:justify-end md:gap-x-[2rem]">

            <div>
              <input
                type="text"
                placeholder="Search"
                className="border-solid w-[16rem] border-gray-400 border-2 rounded-full px-3 py-2 outline-none"
              />
            </div>

            {user ? (
              <>
              <div>
                <p className="font-medium">
                
                  Name: <span className="font-normal">{user.name}</span>
                </p>
                <p className="font-medium">
              
                  Email: <span className="font-normal">{user.email}</span>
                </p>
                {/* <p className="font-medium"> Password: <span className="font-normal">{user.password}</span></p> */}
              </div>
                <div>
                <button onClick={handleLogout} className="bg-red-600 rounded-md px-4 py-2 text-white ">Logout</button>
              </div>
              </>

            ) : (
              <p>User not found</p>
            )}
             </div>
          </div> 
        </div>
      </div>
    </>
  );
}

export default Resume;
