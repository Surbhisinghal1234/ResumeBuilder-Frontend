import React from "react";
import { NavLink } from "react-router-dom";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import InfoIcon from "@mui/icons-material/Info";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";

function Builder() {
  return (
    <>
      <div className="md:h-screen w-full md:w-[20%] py-[2rem] md:p-4 bg-slate-200 flex flex-col items-center md:items-stretch gap-[1.5rem] md:gap-[1rem] ">
        <div className="">
          
           <NavLink className="text-3xl md:text-2xl font-bold" to="/create">Resume Builder</NavLink>
        </div>
        <ul className="flex flex-col gap-[1.6rem] ">
          <li className="w-[20rem] md:w-auto ">
            <NavLink to="my-details" className=" flex items-center text-[1.2rem] gap-x-[1rem] md:text-[1rem] md:gap-x-0 w-full inline-block px-2 py-3 md:py-2  rounded-md bg-slate-700 text-white">
              <BadgeIcon className="mr-2" />
              My Details
            </NavLink>
          </li>
          <li>
            <NavLink  to="about-me" className="flex items-center text-[1.2rem] gap-x-[1rem] md:text-[1rem] md:gap-x-0 w-full inline-block px-2 py-3 md:py-2  rounded-md bg-slate-700 text-white">
              <InfoIcon className="mr-2" />
              About Me
            </NavLink>
          </li>
          <li>
            <NavLink to="skills-and-proficiencies" className="flex items-center text-[1.2rem] gap-x-[1rem] md:text-[1rem] md:gap-x-0 w-full inline-block px-4 py-3 md:py-2 md:px-2  rounded-md bg-slate-700 text-white">
              <MiscellaneousServicesIcon className="mr-2"/>
             Skills & Proficiencies
            </NavLink>
          </li>
          <li>
            <NavLink  to="work-experiences" className="flex items-center text-[1.2rem] gap-x-[1rem] md:text-[1rem] md:gap-x-0 w-full inline-block px-2 py-3 md:py-2 rounded-md bg-slate-700 text-white">
              <BusinessCenterOutlinedIcon className="mr-2" />
              Work Exprience
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Builder;
