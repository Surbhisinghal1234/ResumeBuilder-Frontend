import React, { useContext, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { inputContext } from "./Main";

function Edit() {
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
    setNextPage(urlObject[counter]);
  }, [counter]);

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

  console.log(dataSave, "4");
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   fetch("http://localhost:8000/send", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(dataSave),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((result) => console.log(result));
  // }
  function handleSubmit(e) {
    e.preventDefault();
  
    const { email } = dataSave;
    sessionStorage.setItem("userEmail", email);
  
    fetch("http://localhost:8000/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSave),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error("Error:", error));
  }

  return (
    <>
      <div className="resumeSection w-1/2 px-[2rem]">
        <form method="post" onSubmit={handleSubmit}>
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
