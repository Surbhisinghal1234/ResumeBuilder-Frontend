import jsPDF from "jspdf";

async  function CreatePDF (profile) {
  const doc = new jsPDF();
  const margin = 10;
  let verticle = margin;

  const headingFontSize = 12;
  const textFontSize = 10;

  doc.setFontSize(16);
  doc.text(`Resume - ${profile.details.name}`, margin, verticle);
  verticle += 20;

if (profile.details.image) {
    const img = new Image();
    img.src = `https://resumebuilder-backend-ooq9.onrender.com/${profile.details.image}`;
    
    const imgWidth = 30;  
    const imgHeight = 30; 
    
    doc.addImage(img, "JPEG", margin, verticle, imgWidth, imgHeight);
    verticle += imgHeight + 10; 
  }

  doc.setFontSize(headingFontSize);
  doc.setFont("helvetica", "bold");
  doc.text(`Name: `, margin, verticle);
  doc.setFont("helvetica", "normal");
  doc.text(`${profile.details.name}`, margin + 20, verticle);
  verticle += 10;

  doc.setFont("helvetica", "bold");
  doc.text(`Role: `, margin, verticle);
  doc.setFont("helvetica", "normal");
  doc.text(`${profile.details.role}`, margin + 20, verticle);
  verticle += 10;

  doc.setFont("helvetica", "bold");
  doc.text(`Total Experience: `, margin, verticle);
  doc.setFont("helvetica", "normal");
  doc.text(`${profile.details.totalExp}`, margin + 40, verticle);
  verticle += 10;

  doc.setFont("helvetica", "bold");
  doc.text(`About Me: `, margin, verticle);
  verticle += 5
  doc.setFont("helvetica", "normal");
  const aboutMeLines = doc.splitTextToSize(profile.AboutMe.message, 180);
  doc.text(aboutMeLines, margin, verticle);
  verticle += aboutMeLines.length * 5; 
  verticle+=5  

  doc.setFont("helvetica", "bold");
  doc.text(`Pointers: `, margin, verticle);
  doc.setFont("helvetica", "normal");

doc.text(`${profile.AboutMe.pointers.join(", ")}`, margin + 20, verticle);

verticle += 10;

  doc.setFont("helvetica", "bold");
  doc.text(`Skills: `, margin, verticle);
  doc.setFont("helvetica", "normal");
  doc.text(`${profile.SkillsProficiencies.join(", ")}`, margin + 20, verticle);
  verticle += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Work Experience:", margin, verticle);
  verticle += 10;

  profile.workExperience.forEach((exp, idx) => {
    doc.setFont("helvetica", "bold");
    doc.text(`Client Description: `, margin, verticle);
    doc.setFont("helvetica", "normal");
    doc.text(`${exp.clientDescription}`, margin + 40, verticle);
    verticle += 10;

    doc.setFont("helvetica", "bold");
    doc.text(`Country: `, margin, verticle);
    doc.setFont("helvetica", "normal");
    doc.text(`${exp.country}`, margin + 20, verticle);
    verticle += 10;

    doc.setFont("helvetica", "bold");
    doc.text(`Project Name: `, margin, verticle);
    doc.setFont("helvetica", "normal");
    doc.text(`${exp.projectName}`, margin + 30, verticle);
    verticle += 10;

    doc.setFont("helvetica", "bold");
    doc.text(`Role: `, margin, verticle);
    doc.setFont("helvetica", "normal");
    doc.text(`${exp.roleWork}`, margin + 20, verticle);
    verticle += 10;

    doc.setFont("helvetica", "bold");
    doc.text(`Start Date: `, margin, verticle);
    doc.setFont("helvetica", "normal");
    doc.text(`${exp.startDate}`, margin + 30, verticle);
    verticle += 10;

    doc.setFont("helvetica", "bold");
    doc.text(`End Date: `, margin, verticle);
    doc.setFont("helvetica", "normal");
    doc.text(`${exp.endDate}`, margin + 30, verticle);
    verticle += 10;

    doc.setFont("helvetica", "bold");
    doc.text(`Business Solution: `, margin, verticle);
    doc.setFont("helvetica", "normal");
    doc.text(`${exp.businessSolution}`, margin + 40, verticle);
    verticle += 10;

    doc.setFont("helvetica", "bold");
    doc.text(`Technology Stack: `, margin, verticle);
    doc.setFont("helvetica", "normal");
    doc.text(`${exp.technologyStack.join(", ")}`, margin + 40, verticle);
    verticle += 10;

    
    doc.setFont("helvetica", "bold");
    doc.text(`responsibility: `, margin, verticle);
    doc.setFont("helvetica", "normal");
    doc.text(`${exp.projectResponsibility.join(", ")}`, margin + 40, verticle);
    verticle += 10;

    verticle += 10;
  });

  doc.save(`resume-${profile.details.name}.pdf`);
};

export default CreatePDF;



