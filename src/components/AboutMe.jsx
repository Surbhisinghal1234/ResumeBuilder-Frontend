import React, { useContext, useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useParams } from "react-router-dom";
import { inputContext } from "../context/Main";

function AboutMe() {
  const { id } = useParams();

  const { message, setMessage, input, setInput } = useContext(inputContext);


  function handleInput(index, value) {
    let newInp = [...input];
    newInp[index] = value;
    setInput(newInp);
    console.log(value);
  }
  function handleAdd() {
    setInput([...input, ""]);
  }

  console.log(input);


  return (
    <div className="flex flex-col gap-[2rem]">
      <div className="form-group flex gap-[2rem]">
        <label className="font-medium text-xl" htmlFor="aboutme">
          About Me
        </label>
        <textarea
          className="border-gray-400 border-2 rounded px-3"
          name="aboutme"
          id="aboutme"
          cols="35"
          rows="8"
          placeholder="Write summary about you"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div className="flex gap-[1rem] relative">
        <label className="font-medium text-xl" htmlFor="">
          Pointers
        </label>
        <div className="flex flex-col  gap-4 sm:ml-8">
          {input.map((item, index) => (
            <div key={index} className="">
              <input
                className="border-gray-400 border-2 rounded px-3 py-1 w-[8rem] sm:w-[15rem] md:w-[19rem]"
                type="text"
                placeholder="Write bullet points about you"
                value={item}
                onChange={(e) => {
                  handleInput(index, e.target.value);
                }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleAdd}
          className="absolute right-[-.5rem] sm:right-[6.5rem] top-[.2rem]"
        >
          <AddCircleOutlineIcon />
        </button>
      </div>
    </div>
  );
}

export default AboutMe;
