import React, { useState, useEffect, useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { inputContext } from "./Main";

function MyDetails() {

    const {email,setEmail,name, setName,role, setRole,totalExp, setTotalExp,image,setImage}= useContext(inputContext)
  // const [image, setImage] = useState("");
  //   const [editable, setEditable] = useState(true)
  const [photo, setphoto] = useState();

  function handleChangeImage(e) {
    if (e.target.files.length !== 0) {
      setphoto(e?.target?.files[0]);
    }
  }

  useEffect(() => {
    if (photo) {
      console.log("first");
      setImage(URL?.createObjectURL(photo));
    }
  }, [photo]);
  const handleSave = () => {
   setEmail(email)
    setName(name);
    setRole(role);
    setTotalExp(totalExp);
    console.log(name,role,totalExp)
    
  };
  return (
    <>
      {/* <div className=" rounded-full bg-slate-300 h-[8rem] w-[8rem] flex items-center justify-center mt-[6rem]">
  
          <PersonIcon sx={{fontSize:"4rem"}}  />

      </div> */}

      {/* <div className="mt-[2rem] mb-5"> */}
      <div className="flex gap-[1.3rem] flex-col">

        {/* <h2 className="font-bold text-2xl mb-5">Upload Photo</h2> */}

        <div className="flex gap-[2rem]">
          <label htmlFor="">Upload Photo</label>
          <input type="file" onChange={handleChangeImage} />
          {image && (
            <img
              // type="image"
              className="w-[10rem] h-[10rem] "
              src={image}
            />
          )}
        </div>
      {/* </div> */}
        <div className="flex gap-[4rem]">
          <label htmlFor="">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)}
            type="text"
            className=" border-2 border-gray-500 rounded-sm px-5"
          />
        </div>
        <div className="flex gap-[4rem]">
          <label htmlFor="">Name</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)}
            type="text"
            className=" border-2 border-gray-500 rounded-sm px-5"
          />
        </div>
        <div className="flex gap-[4.5rem]">
          <label htmlFor="">Role</label>
          <input value={role} onChange={(e) => setRole(e.target.value)} 
            type="text"
            className=" border-2 border-gray-500 rounded px-5 w-[6rem]"
          />
        </div>

        <div className="flex gap-[2.4rem]">
          <label htmlFor="">Total Exp:</label>
          <input  value={totalExp} onChange={(e) => setTotalExp(e.target.value)}
            type="text"
            className=" border-2 border-gray-500 rounded px-5 w-[6rem]"
          />
        </div>
      </div>
    </>
  );
}

export default MyDetails;
