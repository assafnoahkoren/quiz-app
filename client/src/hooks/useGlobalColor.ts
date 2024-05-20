const useGlobalColor = () => {
  //   why this is not working after a refresh in the url of "http://localhost:5173/subjectPage/113"?
  //   const subjectIdParam = useParams().subjectId;

  // is that a good practice to add ` ?? "" ` to solve: `Type 'null' is not assignable to type 'string'.`
  const subjectId = localStorage.getItem("selectedSubjectId") ?? "";

  const storedColor = localStorage.getItem(subjectId);
  document.documentElement.style.setProperty(
    "--global-subject-color",
    storedColor
  );
};

export default useGlobalColor;
