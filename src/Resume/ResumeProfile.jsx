import React, { useContext, useState, useEffect } from "react";
import { inputContext } from "./Main";

function ResumeProfile() {
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

  const technologyStack = workExperience?.technologyStack || [];
  const projectResponsibility = workExperience?.projectResponsibility || [];
  const imageUrl = image ? URL.createObjectURL(image) : null;
  // console.log(
  //   name,
  //   role,
  //   totalExp,
  //   message,
  //   image,
  //   input,
  //   workExperience,
  //   "40"
  // );
  // console.log(inputContext,"27")
  // const dataSave = {
  //   details: {
  //     image: image,
  //     name: name,
  //     role: role,
  //     totalExp: totalExp,
  //   },
  //   AboutMe: {
  //     message: message,
  //     pointers: input,
  //   },
  //   workExperience: workExperience,
  // };

  // console.log(dataSave, "4");

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   fetch("http://localhost:8000/send", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({dataSave}),
  //   });
  // }
  return (
    <>
      {/* <div method="post"> */}
      <div className="border-l border-gray-400 "></div>

      <div className="w-full md:w-1/2 px-[2rem]">
        <div className="flex  items-center mt-[2rem] gap-[2rem] ">
        <div>
      {imageUrl && <img src={imageUrl} alt="Image"      className=" h-[6rem] w-[6rem] border-2 border-slate-300 bg-slate-300 rounded-full" />}
    </div>
          <div className=" flex gap-[5px] flex-col font-medium">
            <h2>
              Name: <span className="pl-2 font-normal">{name}</span>{" "}
            </h2>
            <h2>
              Email: <span className="pl-2 font-normal">{email}</span>{" "}
            </h2>
            <p>
              Role: <span className="pl-2 font-normal">{role}</span>{" "}
            </p>
            <p>
              Total Exp: <span className="pl-2 font-normal">{totalExp}</span>{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-stretch md:gap-[2rem] mt-8">
          <div className="">
            <h1 className="text-[1.3rem] font-bold mb-1">ABOUT ME</h1>
            <div className="bg-blue-200 w-full  md:w-[10rem] h-[3px]">
              <div className="bg-blue-600 w-[5rem] md:w-[50px] h-[3px]"></div>
            </div>
            <p className="min-h-[5rem] max-h-auto w-full md:w-[12.5rem] mt-3">
              {message}
            </p>
            <ul className="flex flex-wrap list-disc mt-2 mr-[.5rem] ">
              {input?.map((item, index) => {
                if (item !== "") {
                  return (
                    <li
                      key={index}
                      className="mr-2 w-[6rem] text-[1rem] font-medium"
                    >
                      {item}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          <div className="">
            <h1 className="text-[1.3rem] font-bold mb-1">WORK HISTORY</h1>
            <div className="bg-blue-200 w-[200px] h-[3px]">
              <div className="bg-blue-600 w-[50px] h-[3px]"></div>
            </div>
            <div className="">
             

              { workExperience && workExperience.map((experience, index) => (
                <div key={index} className="mb-6 border-gray-300 rounded p-2 mt-3" >

                  {experience?.clientDescription && (
                    <p>
                      <span className="font-medium mr-1">Client:</span>{" "}
                      {experience.clientDescription}
                    </p>
                  )}

                  {experience?.country && (
                    <p>
                      <span className="font-medium mr-1">Country:</span>{" "}
                      {experience.country}
                    </p>
                  )}
                  {experience?.projectName && (
                    <p>
                      <span className="font-medium mr-1">Project Name:</span>{" "}
                      {experience.projectName}
                    </p>
                  )}
                   {experience?.roleWork && (
                    <p>
                      <span className="font-medium mr-1">Role:</span>{" "}
                      {experience.roleWork}
                    </p>
                  )}
                 {experience.startDate && (
                  <p>
                    {" "}
                    <span className="font-medium mr-2">Start Date:</span>
                    {experience?.startDate}
                  </p>
                )}
                {experience.endDate && (
                  <p>
                    {" "}
                    <span className="font-medium mr-2">End Date:</span>
                    {experience?.endDate}
                  </p>
                )}
                   {experience.businessSolution && (
                  <p>
                    <span className="font-medium mr-2">Business Solution:</span>
                    {experience?.businessSolution}
                  </p>
                )} 
                
                <ul className="flex flex-wrap gap-x-[.7rem] gap-y-2 mt-2 ml-3">
                {experience.technologyStack?.map((item, techIndex) => {
                  if (item !== "") {
                    return (
                      <li
                        key={techIndex}
                        className="border-[2.4px] text-gray-600 border-gray-500 min-w-[5rem] px-3 py-[2px] rounded-full"
                      >
                        {item}
                      </li>
                    );
                  } else {
                    return null;
                  }
                })}
              </ul>

              <ul className="flex flex-wrap gap-x-[.7rem] gap-y-2 mt-2 ml-3">
                {experience.projectResponsibility?.map((item, techIndex) => {
                  if (item !== "") {
                    return (
                      <li
                        key={techIndex}
                        className="border-[2.4px] text-gray-600 border-gray-500 min-w-[5rem] px-3 py-[2px] rounded-full"
                      >
                        {item}
                      </li>
                    );
                  } else {
                    return null; 
                  }
                })}
              </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center md:items-stretch">
          <h1 className="text-[1.3rem] font-bold mb-1">
            SKILL & PROFICIENCIES
          </h1>
          <div className="bg-blue-200 w-[200px] h-[3px]">
            <div className="bg-blue-600 w-[50px] h-[3px]"></div>
          </div>
          <div className="min-h-[6rem]">

          {skillProficiencies.map((inputs, index) => {
            if (inputs[0] !== "" && inputs[1] !== "") {
              return (
                <div key={index} className="flex items-center mb-2 min-h-[3rem]">
                  <p className="font-medium    mr-5">{inputs[0]} :</p>
                  <p className="  mr-5">{inputs[1]}</p>
                </div>
              );
            }
          })}
          </div>

        </div>
        <div className="flex items-center md:items-stretch flex-col md:flex-row gap-[2rem]">
          <div className="">
            <h1 className="text-[1.3rem] font-bold mb-1">CERTIFICATION</h1>
            <div className="bg-blue-200 w-[200px] h-[3px]">
              <div className="bg-blue-600 w-[50px] h-[3px]"></div>
            </div>
            <p className="min-h-[10rem] max-h-auto"></p>
          </div>
          <div className="">
            <h1 className="text-[1.3rem] font-bold mb-1">EDUCATION</h1>
            <div className="bg-blue-200 w-[200px] h-[3px]">
              <div className="bg-blue-600 w-[50px] h-[3px]"></div>
            </div>
            <p className="min-h-[10rem] max-h-auto"></p>
          </div>
        </div>
        {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button> */}
      </div>

      <div className="mt-5"></div>
      {/* </div> */}
    </>
  );
}

export default ResumeProfile;
