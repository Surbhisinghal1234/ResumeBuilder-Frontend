import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { inputContext } from "../context/Main";


function Resume() {
  const [userData, setUserData] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { email, setEmail } = useContext(inputContext);
  const API_URL = import.meta.env.VITE_API_URL;
 
  useEffect(() => {
    const userEmail = sessionStorage.getItem("userEmail");

    if (userEmail) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/userData?email=${userEmail}`
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


  async function handleLogout() {
    try {
      await axios.post(`${API_URL}/logout`);
      sessionStorage.clear("userEmail");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }


  return (
    <>
      <div className="border-b-2 border-gray-400 ">
        <div className="container mx-auto w-[90%] py-3">
          <div className=" w-[100%] flex flex-col md:flex-row gap-[1.5rem] md:gap-0 items-center justify-between">
            <div className="w-[100%] flex items-center justify-evenly md:justify-start md:gap-[2rem]">
              <div>
                <h1 className="sm:text-[2.4rem] text-[1.5rem] xs:text-[2rem] font-bold">LOGO</h1>
              </div>
              <div className="text-left ml-5">
                <h3 className="font-medium text-[1rem] xs:text-[1.4rem] sm:text-xl text-gray-600">Resumes</h3>
                <p className="font-medium text-[.9rem] xs:text-[1.4rem] sm:text-xl text-gray-600">
                  Management System
                </p>
              </div>
            </div>
            <div className="w-[100%] flex flex-col gap-y-[1rem] sm:gap-y-0 sm:flex-row items-center justify-evenly md:justify-end md:gap-x-[2rem]">

            {/* <div>
              <input
                type="text"
                placeholder="Search"
                className="border-solid w-[16rem] border-gray-400 border-2 rounded-full px-3 py-2 outline-none"
              />
            </div> */}

            {user ? (
              <>
              <div>
                <p className="font-medium">
                
                  Name: <span className="font-normal">{user.name}</span>
                </p>
                <p className="font-medium">
              
                  Email: <span className="font-normal">{user.email}</span>
                </p>
              </div>
                <div>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700  rounded-md px-4 py-2 text-white ">Logout</button>
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
