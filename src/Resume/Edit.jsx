
import React, { useContext, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { inputContext } from "./Main";
import { useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const { id } = useParams();

  const {
    email,
    setEmail,
    name,
    setName,
    role,
    setRole,
    totalExp,
    setTotalExp,
    message,
    setMessage,
    image,
    setImage,
    input,
    setInput,
    workExperience,
    setWorkExperience,
    skillProficiencies,
    setSkillProficiencies,
  } = useContext(inputContext);

  const urlObject = [
    "",
    "my-details",
    "about-me",
    "skills-and-proficiencies",
    "work-experiences",
  ];

  const [counter, setCounter] = useState(1);
  const [nextPage, setNextPage] = useState(urlObject[counter]);

  const handleNextClick = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    if (id) {
      setNextPage(`${urlObject[counter]}/${id}`);
    } else {
      setNextPage(urlObject[counter]);
    }
  }, [counter, id]);

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage( e.target.files[0]); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const dataToSave = {
      details: {
        email: email,
        name: name,
        role: role,
        totalExp: totalExp,
      },
      AboutMe: {
        message: message,
        pointers: input,
      },
      SkillsProficiencies: skillProficiencies,
      workExperience: workExperience,
    };

    formData.append("dataToSave", JSON.stringify(dataToSave));

      formData.append("image", image);
    console.log(formData);

    try {
      const response = await fetch("http://localhost:8000/send", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <div className="resumeSection w-1/2 px-[2rem]">
        <form
          method="POST"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-group flex justify-end gap-4 items-center py-[2rem]">
            <Link
              className="next bg-slate-600 text-white font-medium rounded px-4 py-2 hover:bg-slate-900 "
              to={nextPage}
              onClick={handleNextClick}
            >
              Next <ArrowRightAltIcon />
            </Link>
            <input type="file" onChange={handleImageChange} />
            <button
              type="submit"
              className="bg-slate-600 hover:bg-slate-900 text-white font-bold px-6 py-[9px] rounded"
            >
              Submit
            </button>
          </div>
        </form>
        <Outlet />
      </div>
    </>
  );
}

export default Edit;


