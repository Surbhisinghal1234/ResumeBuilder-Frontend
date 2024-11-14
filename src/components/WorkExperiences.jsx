import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useParams } from "react-router-dom";

import { inputContext } from "../context/Main";

function WorkExperiences() {
  const { id } = useParams();

  const { workExperience, setWorkExperience } = useContext(inputContext);

  const addForm = () => {
    const newForm = {
      clientDescription: "",
      country: "",
      projectName: "",
      roleWork: "",
      startDate: "",
      endDate: "",
      businessSolution: "",
      technologyStack: [""],
      projectResponsibility: [""],
    };
    setWorkExperience([...workExperience, newForm]);
  };

  const handleInput = (
    index,
    fieldName,
    value,
    solutionIndex,
    projectIndex
  ) => {
    const updatedWorkExperience = [...workExperience];

    if (fieldName === "technologyStack") {
      updatedWorkExperience[index][fieldName][solutionIndex] = value;
    } else if (fieldName === "projectResponsibility") {
      updatedWorkExperience[index][fieldName][projectIndex] = value;
    } else {
      updatedWorkExperience[index][fieldName] = value;
    }

    setWorkExperience(updatedWorkExperience);
  };
  const addBusinessSolutionInput = (index) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index].technologyStack.push("");
    setWorkExperience(updatedWorkExperience);
  };
  const addProjectInput = (index) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index].projectResponsibility.push("");
    setWorkExperience(updatedWorkExperience);
  };

  return (
    <div className="mx-4">
      <h3 className="mt-[1rem] mb-[2rem] font-bold text-2xl flex items-center justify-center gap-2">
        WORK EXPERIENCE <InfoIcon />
      </h3>

      {workExperience.map((form, index) => (
        <div key={index}>
          <div className="flex justify-left sm:gap-[2.9rem] items-center mt-[1rem]">
            <label className="font-medium sm:text-[1.2rem]">Client Description</label>
            <input
              type="text"
              value={form.clientDescription}
              onChange={(e) =>
                handleInput(index, "clientDescription", e.target.value)
              }
              className="border-2 border-gray-500 rounded h-[2.5rem] w-[60%] px-3"
            />
          </div>

          <div className="flex justify-left gap-[4.2rem] sm:gap-[8.2rem] items-center mt-[1rem]">
            <label className="font-medium sm:text-[1.2rem]">Country</label>
            <input
              type="text"
              value={form.country}
              onChange={(e) => handleInput(index, "country", e.target.value)}
              className="border-2 border-gray-500 rounded h-[2.5rem] w-[60%] px-3"
            />
          </div>

          <div className="flex justify-left gap-[3rem] sm:gap-[5.3rem] items-center mt-[1rem]">
            <label className="font-medium sm:text-[1.2rem]">Project Name</label>
            <input
              type="text"
              value={form.projectName}
              onChange={(e) =>
                handleInput(index, "projectName", e.target.value)
              }
              className="border-2 border-gray-500 rounded h-[2.5rem] w-[75%] sm:w-[60%] px-3"
            />
          </div>

          <div className="flex justify-left gap-[5.7rem] sm:gap-[10.4rem] items-center mt-[1rem]">
            <label className="font-medium sm:text-[1.2rem]">Role</label>
            <input
              type="text"
              value={form.roleWork}
              onChange={(e) => handleInput(index, "roleWork", e.target.value)}
              className="border-2 border-gray-500 px-2 py-1 w-[60%] sm:w-[6rem] rounded"
            />
          </div>

          <div className="flex justify-left gap-[3.6rem] sm:gap-[8rem] items-center mt-[1rem]">
            <label className="font-medium sm:text-[1.2rem]">Duration</label>
            <div className="flex gap-[.7rem] sm:gap-[1rem]">
              <input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  handleInput(index, "startDate", e.target.value)
                }
                className="border-2 border-gray-500 rounded w-[5.5rem] sm:w-[9rem] px-2 py-1"
              />
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => handleInput(index, "endDate", e.target.value)}
                className="border-2 border-gray-500 rounded w-[5.5rem] sm:w-[9rem] px-2 py-1"
              />
            </div>
          </div>

          <div className="flex justify-left sm:gap-[3.4rem] items-center mt-[1rem]">
            <label className="font-medium sm:text-[1.2rem]">Business Solution</label>
            <textarea
              value={form.businessSolution}
              onChange={(e) =>
                handleInput(index, "businessSolution", e.target.value)
              }
              className="border-2 border-gray-500 rounded sm:h-[7rem] w-[60%] px-3"
            />
          </div>
          <div>
            {/* <div> */}
            <div className="sm:gap-x-[3.4rem] gap-[1rem] flex items-center justify-items-start">
              <label className="font-medium sm:text-[1.2rem]">Technology Stack</label>
              <div className="flex gap-x-2">
                <div className="flex flex-wrap gap-x-[1rem]">
                  {form.technologyStack.map((solution, solutionIndex) => (
                    <div key={solutionIndex} className="  mt-[1rem]">
                      <input
                        type="text"
                        value={solution}
                        onChange={(e) =>
                          handleInput(
                            index,
                            "technologyStack",
                            e.target.value,
                            solutionIndex
                          )
                        }
                        className="border-2 border-gray-500 rounded w-[8rem] py-1 px-3"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-left items-center mt-[1rem]">
                  <button onClick={() => addBusinessSolutionInput(index)}>
                    <AddCircleOutlineIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="gap-[1.3rem] flex items-center justify-items-start">
              <label className="font-medium sm:text-[1.2rem]">Project Responsibility</label>
              <div className="flex gap-2">
                <div className="flex flex-wrap gap-x-[1rem] justify-center">
                  {form.projectResponsibility.map((project, projectIndex) => (
                    <div key={projectIndex} className="mt-[1rem]">
                      <input
                        type="text"
                        value={project}
                        onChange={(e) =>
                          handleInput(
                            index,
                            "projectResponsibility",
                            e.target.value,
                            null,
                            projectIndex
                          )
                        }
                        className="border-2 border-gray-500 rounded w-[8rem] py-1 px-3"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-left items-center mt-[1rem]">
                  <button onClick={() => addProjectInput(index)}>
                    <AddCircleOutlineIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* <hr className="mt-[1rem]" /> */}
      <div
        onClick={addForm}
        className=" font-medium text-[1.2rem] w-[16rem] border-2 border-gray-500 rounded-full px-2 py-2 mt-10 text-center cursor-pointer"
      >
        <AddIcon /> Add Work Experience
      </div>
    </div>
  );
}

export default WorkExperiences;
