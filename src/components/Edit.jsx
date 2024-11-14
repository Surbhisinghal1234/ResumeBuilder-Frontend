import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, Outlet, useParams} from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import axios from "axios";
import { inputContext } from "../context/Main";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const dataSave = {
    details: {
      email: email,
      image: image,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/getById/${id}`);
        const { resumeData } = response.data;
        const { details, AboutMe, SkillsProficiencies, workExperience } =
          resumeData;
        const { image, name, email, role, totalExp } = details;
        const { message, pointers } = AboutMe;
        setName(name);
        // setImage(image);

        setEmail(email);
        setRole(role);
        setTotalExp(totalExp);
        setMessage(message);
        setInput(pointers || []);
        setSkillProficiencies(SkillsProficiencies || []);
        setWorkExperience(workExperience || []);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    const jsonDataSave = JSON.stringify(dataSave);
    formData.append("dataSave", jsonDataSave);
    // formData.append("image",image);
    if (dataSave.details.image) {
      formData.append("image", dataSave.details.image);
    } else {
      console.warn("Image is not available");
    }
   

    try {
      const response = id
        ? await axios.put(`${API_URL}/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await axios.post(`${API_URL}/send`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
      console.log(response.data);
      setIsSubmitted(true);
      setIsLoading(false);
      setTimeout(() => navigate("/create"), 2000);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="resumeSection pb-8 md:pb-0 w-full md:w-1/2 sm:px-[2rem] px-[.5rem] min-h-[15rem] bg-slate-200 md:bg-transparent border-y-2 border-slate-700 md:border-none">
        <form
          method="POST"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-group flex md:justify-end justify-center gap-4 items-center py-[2rem]">
            <Link
              className="next bg-slate-600 text-white font-medium rounded px-4 py-2 hover:bg-slate-900 "
              to={nextPage}
              onClick={handleNextClick}
            >
              Next <ArrowRightAltIcon />
            </Link>
            {/* <input type="file" onChange={handleImageChange} /> */}
         {/* <Link to="/create"
         > */}
          {/* <button
              type="submit"
              className="bg-slate-600 hover:bg-slate-900 text-white font-bold px-6 py-[9px] rounded"
            >
              Submit
            </button> */}
            <button
              type="submit"
              className="bg-slate-600 hover:bg-slate-900 text-white font-bold px-6 py-[9px] rounded"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
            {/* </Link>    */}
          </div>
        </form>
        {isSubmitted && <p className="text-green-500 font-bold text-xl ">Submitted successfully!</p>}
        <Outlet />
      </div>
    </>
  );
}

export default Edit;
