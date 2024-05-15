import React, { useContext, useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import { inputContext } from "./Main";
import axios from "axios"
function Create() {
  // const { user, setUser } = useContext(inputContext);
  // const [recentLogins, setRecentLogins] = useState([]);
  const [userData, setUserData] = useState(null);
  const { email, setEmail } = useContext(inputContext);

  useEffect(() => {
    const userEmail = sessionStorage.getItem("userEmail");

    if (userEmail) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/userData?email=${userEmail}`);
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }   
      };

      fetchUserDetails();
    } else {
      console.error("User email not found in sessionStorage");
    }
  }, []);

  if (!userData) return <div>Loading...</div>;

  const { user, resumeProfile } = userData;

  return (
    <>

     
<div className="flex justify-evenly gap-12  items-center w-[80%] m-auto" >

      <div className="m-5 p-5 h-auto w-[30rem] border-[.2rem] border-slate-400 rounded-lg">
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
      </div>
      <div className="container mx-auto w-[90%] flex justify-between">
        <Link to="/new-resume">
          <div className="border-[3px] border-solid border-slate-600 inline-block px-5 py-4 rounded-xl mt-5 text-black">
            <h1 className="text-center">
              <AddCircleOutlineIcon />
            </h1>
            <h1 className="font-medium text-xl">Create New</h1>
          </div>
        </Link>
       
      </div>
</div>

    </>
  );
}

export default Create;
