import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { inputContext } from "./Main";
import UserProfile from "./UserProfile";

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
            `http://localhost:8000/userData?email=${userEmail}`
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

// console.log(resumeProfile,"resumeProfile")
  return (
    <>
      <div className="border-b-2 border-gray-400">
        <div className="container mx-auto w-[90%] py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-[2rem]">
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
            <div>
              <input
                type="text"
                placeholder="Search"
                className="border-solid w-[16rem] border-gray-400 border-2 rounded-full px-3 py-2 outline-none"
              />
            </div>
         {
          resumeProfile ? (
            <div>
             <UserProfile blobUrl="blob:http://localhost:5173/3774e613-b479-433a-8d23-3d34c49d48ea" />
              </div>
          ):
          (
            <p>Image not found</p>
          )
         }

            {user ? (
              <div>
                <p className="font-medium">
                
                  Name: <span className="font-normal">{user.name}</span>
                </p>
                <p className="font-medium">
              
                  Email: <span className="font-normal">{user.email}</span>
                </p>
                {/* <p className="font-medium"> Password: <span className="font-normal">{user.password}</span></p> */}
              </div>
            ) : (
              <p>User not found</p>
            )}
          </div>
        </div>
      </div>
      {/* <div className="m-5 p-5 h-auto w-[23rem] border-[.2rem] border-slate-400 rounded-lg">
      {resumeProfile ? (
        <div>
          <p className="font-medium"> Name: <span className="font-normal">{resumeProfile.details.name}</span></p>
          <p className="font-medium"> Role: <span className="font-normal">{resumeProfile.details.role}</span></p>
          <p className="font-medium">Total Experience: <span className="font-normal">{resumeProfile.details.totalExp}</span></p>
          <p className="font-medium">About Me: <span className="font-normal">{resumeProfile.AboutMe.message}</span></p>
          <p className="font-medium">Skills: <span className="font-normal">{resumeProfile.SkillsProficiencies.join(', ')}</span></p>
          <div className="font-medium">Work Experience:
            {resumeProfile.workExperience.map((exp, index) => (
              <div key={index} className="font-normal">
                <p>Client Description: {exp.clientDescription}</p>
                <p>Country: {exp.country}</p>
                <p>Project Name: {exp.projectName}</p>
                <p>Role: {exp.roleWork}</p>
                <p>Start Date: {exp.startDate}</p>
                <p>End Date: {exp.endDate}</p>
                <p>Business Solution: {exp.businessSolution}</p>
                <p>Technology Stack: {exp.technologyStack.join(', ')}</p>
                <p>Responsibilities:</p>
                <ul>
                  {exp.projectResponsibility.map((responsibility, idx) => (
                    <li key={idx}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Resume profile not found</p>
      )}
      </div> */}
    </>
  );
}

export default Resume;
