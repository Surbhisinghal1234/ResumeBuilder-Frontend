import React, { useContext, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { inputContext } from "./Main";
import { useParams } from "react-router-dom";
import axios from "axios"


function Edit() {
  const { id } = useParams();

  const {
    email,setEmail,
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

  const handleNextClick = (e) => {
    setCounter(counter + 1);
  };


  useEffect(() => {
    if(id){
      setNextPage(`${urlObject[counter]}/${id}`);
    }
    else{
      setNextPage(urlObject[counter]);

    }
  }, [counter,id]);

  const dataSave = {
    
    details: {
      email:email,
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
  // console.log(dataSave,"data")

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getById/${id}`);
        const { resumeData } = response.data;
        const { details, AboutMe, SkillsProficiencies, workExperience } =
          resumeData;
        const { name, email, role, totalExp } = details;
        const { message, pointers} = AboutMe;
        setName(name);
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


 // backend se data lene ke liye
 
  function handleSubmit(e) {
    e.preventDefault();
    if(id) {
      // jab data edit karna ho 
      fetch(`http://localhost:8000/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSave),
      })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error("Error", error));
    } else {
      // jab new data create karna ho 
      fetch("http://localhost:8000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSave),
      })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error("Error", error));
    }
  }
  return (
    <>
      <div className="resumeSection w-1/2 px-[2rem]">
        <form method={id ? "PUT" : "POST"} onSubmit={handleSubmit}>
          <div className="form-group flex justify-end gap-4 items-center py-[2rem]">
            <Link
              className="next bg-slate-600 text-white font-medium rounded px-4 py-2 hover:bg-slate-900 "
              to={nextPage}
              onClick={handleNextClick}
            >
              Next <ArrowRightAltIcon />
            </Link>
            <button
              type="submit"
              className="bg-slate-600 hover:bg-slate-900 text-white font-bold px-6 py-[9px]  rounded"
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


