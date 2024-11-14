import React, { useState, useEffect, useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useParams } from "react-router-dom";

import { inputContext } from "../context/Main";

function MyDetails() {
  const { id } = useParams();

  const {
    email,
    setEmail,
    name,
    setName,
    role,
    setRole,
    totalExp,
    setTotalExp,
    image,
    setImage,
  } = useContext(inputContext);

  const [photo, setphoto] = useState(null);

 
  function handleChangeImage(e) {
    if (e.target.files.length !== 0) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage); 
    }
  }
  const handleSave = () => {
    setEmail(email);
    setName(name);
    setRole(role);
    setTotalExp(totalExp);
    console.log(name, role, totalExp);
  };
 
  return (
    <>
     
      <div className="flex gap-[1.3rem] flex-col">

        <div className="flex gap-[2rem]">
          <label htmlFor="">Upload Photo</label>
          <input type="file" onChange={handleChangeImage} />
          
           {image && (
            <img
              className="w-[10rem] h-[10rem]"
              src={URL.createObjectURL(image)}
              alt="Uploaded Preview"
            />
          )}
        </div>

        <div className="flex gap-[4rem]">
          <label htmlFor="">Name</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className=" py-[3px] w-[10rem] md:w-auto md:py-0 md:border-2 md:border-gray-500 rounded-sm px-5"
          />
        </div>
        <div className="flex  gap-[4rem]">
          <label htmlFor="">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className=" border-2 w-[10rem] md:w-auto border-gray-500 rounded-sm px-5"
          />
        </div>
        <div className="flex gap-[4.5rem]">
          <label htmlFor="">Role</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            type="text"
            className=" border-2 border-gray-500 rounded px-5 w-[6rem]"
          />
        </div>

        <div className="flex gap-[2.4rem]">
          <label htmlFor="">Total Exp:</label>
          <input
            value={totalExp}
            onChange={(e) => setTotalExp(e.target.value)}
            type="text"
            className=" border-2 border-gray-500 rounded px-5 w-[6rem]"
          />
        </div>
      </div>
    </>
  );
}

export default MyDetails;