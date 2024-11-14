import React from "react";
import Builder from "../../components/Builder";

import Edit from "../../components/Edit";
import ResumeProfile from "../../components/ResumeProfile";
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
