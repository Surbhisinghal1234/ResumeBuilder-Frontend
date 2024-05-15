import React, { useContext,useState, useEffect } from "react";
import axios from "axios";
import { inputContext } from "./Main";


function Resume() {
  const [user, setUser] = useState(null); 
  const [userData, setUserData] = useState(null);
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
  useEffect(() => {
    const userEmail = sessionStorage.getItem("userEmail");
// console.log(userEmail,"275")
    if (userEmail) {

      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/userDetails?email=${userEmail}`);
          setUser(response.data); 
          
          console.log("User details", response.data);
        } catch (error) {
          console.error("Error", error);
        }
      };
      fetchUserDetails();
    } else {
      console.error("User email not found in sessionStorage");
    }
  }, []); 



  useEffect(() => {
    const fetchData = async () => {
      const email = sessionStorage.getItem("userEmail"); // Assuming email is stored in session storage

      try {
        const response = await fetch(`http://localhost:8000/userData?email=${email}`);
        const data = await response.json();

        setUserData(data);
        setName(data.resumeProfile.details.name);
        setRole(data.resumeProfile.details.role);
        setTotalExp(data.resumeProfile.details.totalExp);
        setMessage(data.resumeProfile.AboutMe.message);
        setImage(data.resumeProfile.details.image);
        setInput(data.resumeProfile.AboutMe.pointers);
        setWorkExperience(data.resumeProfile.workExperience);
        setSkillProficiencies(data.resumeProfile.SkillsProficiencies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!userData) return <div>Loading...</div>;
  return (
    <>
   <div className="border-b-2 border-gray-400">

      <div className="container mx-auto w-[90%] py-3 ">
        <div className="flex items-center justify-between ">
          <div className="flex items-center justify-center gap-[2rem]">
            <div className=" ">
              <h1 className="text-[2.4rem] font-bold">LOGO</h1>
            </div>
            <div className="text-left ml-5">
              <h3 className="font-medium text-xl text-gray-600">Resumes</h3>
              <p className="font-medium text-xl text-gray-600">Managemnet System</p>
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              className=" border-solid w-[16rem] border-gray-400 border-2 rounded-full px-3 py-2 outline-none "
            />
          </div>

          {user ? (
        <div>
          <p className="font-medium">User Name: <span className="font-normal">{user.name}</span></p>
          <p className="font-medium">User Email: <span className="font-normal">{user.email}</span></p>
          <p className="font-medium">User Password: <span className="font-normal">{user.password}</span></p>
        </div>
      )
       : (
        <p>User not found</p>
      )}
        </div>
      </div>
    </div>
    {/* //..................... ? */}
    {userData ? (
              <div>
                <p className="font-medium">User Name: <span className="font-normal">{userData.user.name}</span></p>
                <p className="font-medium">User Email: <span className="font-normal">{userData.user.email}</span></p>
                <p className="font-medium">User Password: <span className="font-normal">{userData.user.password}</span></p>
                <p className="font-medium">Resume Name: <span className="font-normal">{userData.resumeProfile.details.name}</span></p>
                <p className="font-medium">Resume Role: <span className="font-normal">{userData.resumeProfile.details.role}</span></p>
                <p className="font-medium">Total Experience: <span className="font-normal">{userData.resumeProfile.details.totalExp}</span></p>
                <p className="font-medium">About Me: <span className="font-normal">{userData.resumeProfile.AboutMe.message}</span></p>
                <p className="font-medium">Skills: <span className="font-normal">{userData.resumeProfile.SkillsProficiencies.join(', ')}</span></p>
                {/* Display work experience */}
                <div className="font-medium">Work Experience:
                  {userData.resumeProfile.workExperience.map((exp, index) => (
                    <div key={index} className="font-normal">
                      <p>Client Description: {exp.clientDescription}</p>
                      <p>Country: {exp.country}</p>
                      <p>Project Name: {exp.projectName}</p>
                      <p>Role: {exp.roleWork}</p>
                      <p>Start Date: {exp.startDate}</p>
                      <p>End Date: {exp.endDate}</p>
                      <p>Business Solution: {exp.businessSolution}</p>
                      <p>Technology Stack: {exp.technologyStack.join(', ')}</p>
                      <p>Responsibilities:</p>
                      <ul>
                        {exp.projectResponsibility.map((responsibility, idx) => (
                          <li key={idx}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>User not found</p>
            )}
    </>
  );
}

export default Resume;