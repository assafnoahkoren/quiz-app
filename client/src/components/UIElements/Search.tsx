import React, { useEffect, useState } from "react";
import "./Search.scss";
import { dataStore } from "../../stores/DataStore";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

type SearchProps = {
  placeholder: string;
  type: "main" | "sub";
};

const Search: React.FC<SearchProps> = observer(({ placeholder, type }) => {
  const [value, setValue] = useState("");
  const selectedSubjectId = localStorage.getItem("selectedSubjectId");

  useEffect(() => {
    if (type === "main") {
      dataStore.subjectsToShow = dataStore.subjects.filter((sub) =>
        sub.name.includes(value)
      );
    } else if (type === "sub") {
      // not sure if that's the right way to handle the case that if nothing is searched then collapse all subjects,
      // if a value is searched then expand all subjects results.
      value !== ""
        ? (dataStore.isSearching = true)
        : (dataStore.isSearching = false);
      const root =
        dataStore.subjectsMap.get(selectedSubjectId)?.subject?.Subjects;
      let cloned;
      if (root) {
        cloned = Array.from(toJS(root));
      }
      dataStore.selectedSubjectFiltered.subjects = filterSubjects(
        cloned,
        value
      );
    }
  }, [value]);

  function filterSubjects(subjects, searchValue) {
    return subjects
      ?.filter(
        (sub) =>
          sub.name.includes(searchValue) ||
          sub.Subjects.some((sub) => sub.name.includes(searchValue))
      )
      .map((sub) => {
        const filteredSubSub = sub.Subjects.filter((sub) =>
          sub.name.includes(searchValue)
        );
        sub.Subjects = filteredSubSub;
        return sub;
      });
  }

  const inputHandler = (inputValue: string) => {
    setValue(inputValue);
  };
  return (
    <div className="search-container">
      <input
        className="search-container_input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => inputHandler(e.target.value)}
      ></input>
    </div>
  );
});

const MemoizedSearch = React.memo(Search);
export default Search;
