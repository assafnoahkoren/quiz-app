export const setGlobalColor = () => {
  const subjectId = localStorage.getItem("selectedSubjectId");

  const storedColor = subjectId ? localStorage.getItem(subjectId) : null;
  document.documentElement.style.setProperty(
    "--global-subject-color",
    storedColor
  );
};