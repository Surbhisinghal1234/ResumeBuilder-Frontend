import React, { useContext, useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import { inputContext } from "./Main";
import axios from "axios";

function Create() {
  const { email } = useContext(inputContext);
  const [resumeProfiles, setResumeProfiles] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userEmail = sessionStorage.getItem("userEmail"); 

        if (!userEmail) {
          console.error("User email not found in sessionStorage");
          setResumeProfiles([]);          return;
        }

        const response = await axios.get(`http://localhost:8000/userData?email=${userEmail}`);
        const { user, resumeProfiles } = response.data;

        if (resumeProfiles && resumeProfiles.length > 0) {
          setResumeProfiles(resumeProfiles);
        } else {
          setResumeProfiles([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setResumeProfiles([]);
      }
    };

    fetchUserDetails(); 

  }, []);

  return (
    <div className="flex justify-center items-center px-[4rem]">
     {resumeProfiles.length > 0 ? (
  resumeProfiles.map((profile, index) => (
    <div key={index} className="m-5 p-5 h-auto w-[30rem] border-[.2rem] border-slate-400 rounded-lg">
      <p className="font-medium"> Name: <span className="font-normal">{profile.details.name}</span></p>
      <p className="font-medium"> Role: <span className="font-normal">{profile.details.role}</span></p>
      <p className="font-medium"> Total Experience: <span className="font-normal">{profile.details.totalExp}</span></p>
      <p className="font-medium"> About Me: <span className="font-normal">{profile.AboutMe.message}</span></p>
      <p className="font-medium"> Skills: <span className="font-normal">{profile.SkillsProficiencies.join(', ')}</span></p>
      <div className="font-medium"> Work Experience:
        {profile.workExperience.map((exp, idx) => (
          <div key={idx} className="font-normal">
            <p className="font-medium"> Client Description: <span className="font-normal">{exp.clientDescription}</span></p>
            <p className="font-medium"> Country: <span className="font-normal">{exp.country}</span> </p>
            <p className="font-medium"> Project Name: <span className="font-normal">{exp.projectName}</span> </p>
            <p className="font-medium"> Role: <span className="font-normal">{exp.roleWork}</span> </p>
            <p className="font-medium"> Start Date: <span className="font-normal">{exp.startDate}</span></p>
            <p className="font-medium"> End Date: <span className="font-normal">{exp.endDate}</span> </p>
            <p className="font-medium"> Business Solution: <span className="font-normal">{exp.businessSolution}</span> </p>
            <p className="font-medium"> Technology Stack: <span className="font-normal">{exp.technologyStack.join(', ')}</span> </p>
            <p className="font-medium flex"> Responsibilities:
              <ul>
                {exp.projectResponsibility.map((responsibility, idx) => (
                  <li key={idx}> {responsibility}</li>
                ))}
              </ul>
            </p>
          </div>
        ))}
      </div>
    </div>
  ))
) : (
  <p>No resume profiles found</p>
)}

      <div className=" flex">
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
  );
}

export default Create;


