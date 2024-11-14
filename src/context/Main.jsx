import React, { createContext, useState, useContext } from "react";
import Resume from "../components/Resume";
import Create from "../components/Create";
import SelectSection from "../components/SelectSection";
import MyDetails from "../components/MyDetails";
import AboutMe from "../components/AboutMe";
import SkillsProficiencies from "../components/SkillsProficiencies";
import WorkExperiences from "../components/WorkExperiences";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import Registration  from "../pages/register/Registration"
import NewResume from "../pages/home/NewResume";

export const inputContext = createContext();

function Main() {
  const [email,setEmail]=useState("")
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [totalExp, setTotalExp] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [input, setInput] = useState([""]);
  const [skillProficiencies, setSkillProficiencies] = useState([['', '']]);
  const [user, setUser] = useState({
   
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [workExperience, setWorkExperience] = useState([{
    clientDescription: "",
    country: "",
    projectName: "",
    roleWork: "",
    startDate: "",
    endDate: "",
    businessSolution: "",
    technologyStack: [""],
    projectResponsibility: [""],
  }]);

 
  const [compareLoginUser,setCompareLoginUser]= useState({
    email:"",
    password:""
  })
 

  const router = createBrowserRouter([
    {
      path: "/register",
      element: (
     
          <Registration />
        
      ),
    },
    {
      path: "/",
      element: (
        <>
          <LoginPage />
          
        </>
      ),
    },
    {
      path: "/create",
      element: (
        <>
          <Resume />
          <Create />
        </>
      ),
    },
    {
      path: "/new-resume",
      element: <NewResume />,
      children: [
        { path: "", element: <SelectSection/> },
        
          
        {
          path:"my-details/:id",
          element: <MyDetails/>
        },
        {
          path:"my-details",
          element: <MyDetails/>
        },
         
        {
          path: "about-me",
          element: <AboutMe />,
        },
        {
          path: "about-me/:id",
          element: <AboutMe />,
        },
        {
          path: "skills-and-proficiencies",
          element: <SkillsProficiencies />,
        },
        {
          path: "skills-and-proficiencies/:id",
          element: <SkillsProficiencies />,
        },
        {
          path: "work-experiences",
          element: <WorkExperiences />,
        },
        {
          path: "work-experiences/:id",
          element: <WorkExperiences />,
        },
      ],
    },
  
  ]);
  return (
    <>
      {/* <BrowserRouter>
      
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Resume /> <Create />
              </>
            }
          />
          <Route path="/new-resume" element={<NewResume />}>
          <Route index element={<SelectSection />} />
           
         <Route path="my-details" element={<MyDetails/>}/>
          <Route path="about-me" element={<AboutMe />} />
          <Route
            element={<SkillsProficiencies />}
            path="skills-and-proficiencies"
          />
          <Route element={<WorkExperiences />} path="work-experiences" />
          </Route>
        </Routes>
      </BrowserRouter> */}
      <inputContext.Provider
        value={{
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
          workExperience ,setWorkExperience,skillProficiencies, setSkillProficiencies,user, setUser
        }}
      >
        <RouterProvider router={router} />

      </inputContext.Provider>
    </>
  );
}

export default Main;
