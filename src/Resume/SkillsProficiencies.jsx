import React, { useContext, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { inputContext } from './Main';

function SkillsProficiencies() {

  const {skillProficiencies, setSkillProficiencies} = useContext(inputContext)
  const handleAddSkills = () => {
    const newSkills = [...skillProficiencies, ["",""]]; 
    setSkillProficiencies(newSkills);
  };

  const handleChange = (index, inputIndex, value) => {
    const newSkills = [...skillProficiencies];
    newSkills[index][inputIndex] = value;
    setSkillProficiencies(newSkills);
  };

  return (
    <>
      <div className=" flex flex-col justify-center items-center relative">
        <div className="font-bold text-2xl">SKILL PROFICIENCIES</div>
        <div className="mt-5 flex font-medium text-xl">
          <p className="bg-gray-200 w-[12.5rem] text-black border-2 border-gray-500 py-2 text-center">
            Category
          </p>
          <p className="bg-gray-200 w-[12.6rem] border-2 border-l-transparent border-gray-500 text-black py-2 text-center">Skill</p>
        </div>
        <div className='flex items-center justify-center flex-wrap'>
          {skillProficiencies.map((inputs, index) => (
            <div key={index} className="flex items-center">
              <input
                className="border-2 border-gray-500 border-r-transparent border-t-transparent px-2 py-1 outline-none w-[12.4rem] font-medium "
                type="text"
                value={inputs[0].value} 
                onChange={(e) => handleChange(index,0, e.target.value)}
                placeholder=""
              />
              <input
                className="outline-none border-2 border-t-transparent border-gray-500 px-2 py-1 w-[12.67rem]"
                type="text"
                value={inputs[1].value} 
                onChange={(e) => handleChange(index,1, e.target.value)}
                placeholder=""
              />
            </div>
          ))}
          <button onClick={handleAddSkills} className='outline-none absolute top-[4rem] right-[3rem]'>
            <AddCircleOutlineIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default SkillsProficiencies;

