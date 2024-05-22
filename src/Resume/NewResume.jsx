import React from "react";
import Builder from "./Builder";
// import { Edit } from '@mui/icons-material'
import Edit from "./Edit";
import ResumeProfile from "./ResumeProfile";
import { Outlet } from "react-router-dom";

function NewResume() {

 
  return (
    <>
     
        <div className="flex w-[100%] flex-col md:flex-row ">
          <Builder />
          <section className="flex flex-col md:flex-row w-full">
            <Edit />
            <ResumeProfile />
            {/* <Outlet/> */}
          </section>
        </div>
    </>
  );
}

export default NewResume;
