export default function
ATSAnalysisModal({

 analysis,

 onClose

}){

 if(!analysis)
  return null;

 return (

  <div
   className="
    fixed
    inset-0
    bg-black/40
    flex
    items-center
    justify-center
   "
  >

   <div
    className="
     bg-white
     p-8
     rounded-xl
     w-[600px]
    "
   >

    <h2
     className="
      text-2xl
      font-bold
      mb-4
     "
    >
     ATS Analysis
    </h2>

    <p>
     Score:
     <strong>
      {analysis.score}%
     </strong>
    </p>

    <h3
     className="mt-4"
    >
     Strengths
    </h3>

    <ul>

     {
      analysis.strengths?.map(
       skill => (

        <li
         key={skill}
        >
         {skill}
        </li>

       )
      )
     }

    </ul>

    <h3
     className="mt-4"
    >
     Missing Skills
    </h3>

    <ul>

     {
      analysis.missingSkills?.map(
       skill => (

        <li
         key={skill}
        >
         {skill}
        </li>

       )
      )
     }

    </ul>

    <h3
     className="mt-4"
    >
     Suggestions
    </h3>

    <ul>

     {
      analysis.suggestions?.map(
       suggestion => (

        <li
         key={suggestion}
        >
         {suggestion}
        </li>

       )
      )
     }

    </ul>

    <button

     onClick={onClose}

     className="
      mt-6
      bg-blue-500
      text-white
      px-4
      py-2
      rounded
     "
    >
     Close
    </button>

   </div>

  </div>
 );
}