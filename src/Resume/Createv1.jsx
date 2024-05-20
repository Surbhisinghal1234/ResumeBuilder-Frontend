import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './css/create.css';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { inputContext } from "./Main";

function Create() {
  const { id } = useParams();
  const { email } = useContext(inputContext);
  const [resumeProfiles, setResumeProfiles] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchImage = async (imageUrl) => {
    try {
      // console.log("Fetching image:", imageUrl);
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error("Failed to fetch image");
      }
      const imageBlob = await imageResponse.blob();
      const imageDataUrl = await blobToDataURL(imageBlob);
      console.log("Image data:", imageDataUrl); 
      return imageDataUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const blobToDataURL = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userEmail = sessionStorage.getItem("userEmail");

        if (!userEmail) {
          console.error("User email not found in session storage");
          setResumeProfiles([]);
          return;
        }

        const response = await axios.get(`http://localhost:8000/userData?email=${userEmail}`);
        const { user, resumeProfiles } = response.data;

        // console.log("Fetched data:", resumeProfiles);

        if (resumeProfiles && resumeProfiles.length > 0) {
          const updatedProfiles = await Promise.all(resumeProfiles.map(async (profile) => {
            // console.log("profile", profile)
            if (profile.details && profile.details.image) {
              const imageUrl = profile.details.image;
              // console.log("Image data:", imageUrl); 

              const imageObjectUrl = await fetchImage(imageUrl);

              return { ...profile, imageBlobUrl: imageObjectUrl };
            }
            return profile;
          }));
          setResumeProfiles(updatedProfiles);
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
      await axios.delete(`http://localhost:8000/delete/${id}`);
      setResumeProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile._id !== id)
      );
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleCheckboxDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/deleteMany`, {
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
    setSelectedItems([...selectedItems, id]);
  };
  
  // console.log(profile.imageBlobUrl,"349")
  return (
    <div className="flex flex-col justify-center px-[4rem]">
      <div className="flex mx-5">
        <Link to="/new-resume">
          <div className="border-[3px] border-solid border-slate-600 inline-block px-5 py-4 rounded-xl mt-5 text-black">
            <h1 className="text-center">
              <AddCircleOutlineIcon />
            </h1>
            <h1 className="font-medium text-xl">Create New</h1>
          </div>
        </Link>
      </div>
      <button
        className="w-[5rem] mx-5 px-3 py-1 bg-slate-600 rounded text-white mt-5 inline-block"
        onClick={handleCheckboxDelete}
      >
        Delete
      </button>
      <div className="flex w-[100%] flex-wrap justify-between">
        {resumeProfiles.length > 0 ? (
          resumeProfiles.map((profile, index) => (
            <div
              key={index}
              className="flex flex-col gap-y-[.3rem] profile p-5 m-5 border-[.2rem] border-slate-400 rounded-lg h-[22rem] w-[19rem] overflow-scroll"
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
                  className="cursor-pointer"
                />
                <Link to={`/new-resume/my-details/${profile._id}`}>
                  <EditIcon />
                </Link>
              </div>

              <p className="font-medium">
                Name:
                <span className="font-normal pl-2">{profile.details.name}</span>
              </p>
              <p>
                Image:
                <img src={profile.imageBlobUrl} alt="Profile Image" />
              </p>
              <p className="font-medium">
                Role:
                <span className="font-normal  pl-2">{profile.details.role}</span>
              </p>
              <p className="font-medium">
                Total Experience:
                <span className="font-normal  pl-2">
                  {profile.details.totalExp}
                </span>
              </p>
              <p className="font-medium">
                About Me:
                <span className="font-normal  pl-2">{profile.AboutMe.message}</span>
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
                  <div key={idx} className="font-normal flex flex-col  gap-y-[.3rem]">
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
                      <span className="font-normal  pl-2">{exp.projectName}</span>
                    </p>
                    <p className="font-medium">
                      Role:
                      <span className="font-normal  pl-2">{exp.roleWork}</span>
                    </p>
                    <p className="font-medium">
                      Start Date:
                      <span className="font-normal  pl-2">{exp.startDate}</span>
                    </p>
                    <p className="font-medium">
                      End Date:
                      <span className="font-normal  pl-2">{exp.endDate}</span>{" "}
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
                    <p className="font-medium flex">
                      Responsibilities:
                      <ul>
                        {exp.projectResponsibility.map((responsibility, idx) => (
                          <li className="pl-2 font-normal" key={idx}>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No profiles found.</p>
        )}
      </div>
    </div>
  );
}

export default Create;