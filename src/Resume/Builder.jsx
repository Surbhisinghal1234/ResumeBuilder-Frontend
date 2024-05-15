import React from "react";
import { NavLink } from "react-router-dom";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import InfoIcon from "@mui/icons-material/Info";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";

function Builder() {
  return (
    <>
      <div className="h-screen w-[20%] p-4 bg-slate-200 flex flex-col gap-[1rem]  ">
        <div className="">
          
           <NavLink className="text-2xl font-bold" to="/create">Resume Builder</NavLink>
        </div>
        <ul className="flex flex-col gap-[1.6rem] ">
          <li className="">
            <NavLink to="my-details" className=" flex items-center w-full inline-block p-2  rounded-md bg-slate-700 text-white">
              <BadgeIcon className="mr-2" />
              My Details
            </NavLink>
          </li>
          <li>
            <NavLink  to="about-me" className="flex items-center w-full inline-block p-2  rounded-md bg-slate-700 text-white">
              <InfoIcon className="mr-2" />
              About Me
            </NavLink>
          </li>
          <li>
            <NavLink to="skills-and-proficiencies" className="flex items-center w-full inline-block p-2  rounded-md bg-slate-700 text-white">
              <MiscellaneousServicesIcon className="mr-2"/>
             Skills & Proficiencies
            </NavLink>
          </li>
          <li>
            <NavLink  to="work-experiences" className="flex items-center w-full inline-block p-2 rounded-md bg-slate-700 text-white">
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
