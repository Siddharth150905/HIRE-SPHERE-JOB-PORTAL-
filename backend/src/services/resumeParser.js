const pdfParse =
 require("pdf-parse");

const { model } =
 require("./geminiService");

async function parseResume(
 fileBuffer
){

 const pdf =
  await pdfParse(
   fileBuffer
  );

 const text =
  pdf.text;

 const prompt =
 `
 Extract resume details.

 Return ONLY JSON.

 {
   "name":"",
   "skills":[],
   "education":[],
   "experience":[]
 }

 Resume:

 ${text}
 `;

 const result =
  await model.generateContent(
   prompt
  );

 const response =
  result.response.text();

 return JSON.parse(
  response
   .replace(/```json/g,"")
   .replace(/```/g,"")
 );
}

module.exports = {
 parseResume
};