const pdfParse =
 require("pdf-parse");

const {model} =
 require("./geminiService");

exports.analyzeResume =
async (
 resumeBuffer,
 job
)=>{



 const pdf =
  await pdfParse(
   resumeBuffer
  );

 const resumeText =
  pdf.text;

 const requirements =
 (
  job.requirements || []
 ).join(",");

 const prompt = `

Analyze the resume against this job.

Return ONLY valid JSON.

{
 "score":0,
 "strengths":[],
 "missingSkills":[],
 "suggestions":[]
}

JOB TITLE:
${job.title}

JOB DESCRIPTION:
${job.description}

REQUIRED SKILLS:
${requirements}

RESUME:
${resumeText}

`;

 const result =
  await model.generateContent(
   prompt
  );

 const response =
   result.response
   .text()
   .replace(/```json/g,"")
   .replace(/```/g,"")
   .trim();

  
 return JSON.parse(
  response
 );
};