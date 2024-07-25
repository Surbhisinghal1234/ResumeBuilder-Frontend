import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./css/create.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import { inputContext } from "./Main";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import WorkExperiences from "./WorkExperiences";
import CreatePDF from "./CreatePDF";
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileDownloadIcon from "@mui/icons-material/FileDownload";

function Create() {
  const { id } = useParams();

  const { email } = useContext(inputContext);
  const [resumeProfiles, setResumeProfiles] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userEmail = sessionStorage.getItem("userEmail");

        if (!userEmail) {
          console.error("email not found in session storage");
          setResumeProfiles([]);
          return;
        }
        const response = await axios.get(
          `https://resumebuilder-backend-ooq9.onrender.com/userData?email=${userEmail}`
        );
        const { user, resumeProfiles } = response.data;
        console.log(response, "35 create");

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

  const handleDelete = async (id) => {
    console.log("id:", id);
    try {
      await axios.delete(`https://resumebuilder-backend-ooq9.onrender.com/delete/${id}`);
      setResumeProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile._id !== id)
      );
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleCheckboxDelete = async () => {
    try {
      await axios.delete(`https://resumebuilder-backend-ooq9.onrender.com/deleteMany`, {
        data: { ids: selectedItems },
      });
      setResumeProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => !selectedItems.includes(profile._id))
      );
      setSelectedItems([]);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleCheckbox = (id) => {
    setSelectedItems((prevItem) => {
      if (prevItem.includes(id)) {
        return prevItem.filter((item) => item !== id);
      } else {
        return [...prevItem, id];
      }
    });
  };
  // const { user, resumeProfiles } = response.data;

  // let images = resumeProfiles.map(item => item.details.image);

  console.log(resumeProfiles, "create");

  return (
    <div className="flex flex-col justify-center sm:px-[4rem]">
      <div className=" flex mx-5 items-center justify-center md:justify-normal">
        <Link to="/new-resume">
          <div className=" border-[3px] border-solid border-slate-600 inline-block px-5 py-4 rounded-xl mt-5 text-black">
            <h1 className="text-center">
              <AddCircleOutlineIcon />
            </h1>
            <h1 className="font-medium text-xl">Create New</h1>
          </div>
        </Link>
      </div>

      {resumeProfiles.length > 0 && (
        <button
          className="mx-auto md:mx-5 w-[5rem] px-3 py-1 bg-slate-500 hover:bg-slate-800 rounded text-white mt-5 inline-block"
          onClick={handleCheckboxDelete}
        >
          Delete
        </button>
      )}
      <div className=" w-[100%] flex sm:flex-wrap flex-col sm:flex-row justify-center items-center  sm:justify-start">
        {resumeProfiles.length > 0 ? (
          resumeProfiles.map((profile, index) => (
            <>
              <div
                key={index}
                className="flex flex-col gap-y-[.3rem] profile p-5 my-[1rem] mx-[1rem] border-[.2rem] border-slate-400 rounded-lg h-[22rem] w-[15rem] xs:w-[19rem] overflow-scroll"
              >
                <div className="flex justify-end gap-x-[.5rem] items-center  ">
                  <input
                    className="h-4 w-5"
                    type="checkbox"
                    checked={selectedItems.includes(profile._id)}
                    onChange={() => handleCheckbox(profile._id)}
                  />

                  <DeleteIcon 
                    onClick={() => handleDelete(profile._id)}
                    className="cursor-pointer hover:bg-red-200"
                  />
                  {/* <Link to={`/new-resume/${profile._id}`}>
                  <EditIcon />
                </Link> */}
                  <Link className="hover:bg-red-200" to={`/new-resume/my-details/${profile._id}`}>
                    <EditIcon />
                  </Link>

                  <FileDownloadIcon className="hover:bg-red-200 " onClick={() => CreatePDF(profile)} />
                </div>

                <p className="font-medium">
                  Name:
                  <span className="font-normal pl-2">
                    {profile.details.name}
                  </span>
                </p>
               
                <p className="flex gap-x-[2rem] font-medium">
                  Image:
                  <img class="h-[4rem] w-[6rem] rounded-md"

                    src={`https://resumebuilder-backend-ooq9.onrender.com/${profile.details.image}`}
                    alt="Profile"
                  />
                </p>

                <p className="font-medium">
                  Role:
                  <span className="font-normal  pl-2">
                    {profile.details.role}
                  </span>
                </p>
                <p className="font-medium">
                  Total Experience:
                  <span className="font-normal  pl-2">
                    {profile.details.totalExp}
                  </span>
                </p>
                <p className="font-medium">
                  About Me:
                  <span className="font-normal  pl-2">
                    {profile.AboutMe.message}
                  </span>
                </p>
               
                <p className="font-medium">
                  Pointers:
                  <span className="font-normal  pl-2">
                    {profile.AboutMe.pointers.join(", ")}
                  </span>
                </p>
                <p className="font-medium">
                  Skills:
                  <span className="font-normal  pl-2">
                    {profile.SkillsProficiencies.join(", ")}
                  </span>
                </p>
                <div className="font-medium ">
                  Work Experience:
                  {profile.workExperience.map((exp, idx) => (
                    <div
                      key={idx}
                      className="font-normal flex flex-col  gap-y-[.3rem]"
                    >
                      <p className="font-medium">
                        Client Description:
                        <span className="font-normal  pl-2">
                          {exp.clientDescription}
                        </span>
                      </p>
                      <p className="font-medium">
                        Country:
                        <span className="font-normal  pl-2">{exp.country}</span>
                      </p>
                      <p className="font-medium">
                        Project Name:
                        <span className="font-normal  pl-2">
                          {exp.projectName}
                        </span>
                      </p>
                      <p className="font-medium">
                        Role:
                        <span className="font-normal  pl-2">
                          {exp.roleWork}
                        </span>
                      </p>
                      <p className="font-medium">
                        Start Date:
                        <span className="font-normal  pl-2">
                          {exp.startDate}
                        </span>
                      </p>
                      <p className="font-medium">
                        End Date:
                        <span className="font-normal  pl-2">{exp.endDate}</span>
                      </p>
                      <p className="font-medium">
                        Business Solution:
                        <span className="font-normal  pl-2">
                          {exp.businessSolution}
                        </span>
                      </p>
                      <p className="font-medium">
                        Technology Stack:
                        <span className="font-normal  pl-2">
                          {exp.technologyStack.join(", ")}
                        </span>
                      </p>

                      <p className="font-medium">
                        Responsibilities:
                        <span className="font-normal  pl-2">
                          {exp.projectResponsibility.join(", ")}
                        </span>
                      </p>
                      
                    </div>
                  ))}
                </div>
              </div>
            </>
          ))
        ) : (
          <p>No resume profiles found</p>
        )}
      </div>
    </div>
  );
}
export default Create;
