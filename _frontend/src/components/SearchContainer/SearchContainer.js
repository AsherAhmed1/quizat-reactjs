import React from "react";
import "./SearchContainer.css";
import { FormRow, SelectFormRow } from "../index";
import { useAppContext } from "../../context/AppContext";
const SearchContainer = () => {
  const {
    quizSubjectTypes,

    isLoading,
    handleFormChange,

    quizSubjectFilter,
    searchFilter,
    sortOptions,
    sort,
    clearFilter
  } = useAppContext();
  const handleSearch = e => {
    // if it is loading wait
    if (isLoading) return;
    const { name, value } = e.target;
    handleFormChange({ name, value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    // do nothing except removing filter input value
    clearFilter();
  };
  return (
    <section className="quizFilterForm">
      <form className="form">
        <div className="form-center">
          {/* title */}
          <FormRow
            type="text"
            name="searchFilter"
            value={searchFilter}
            handleChange={handleSearch}
          />

          {/* quiz subject */}
          <SelectFormRow
            inputId="subject"
            lableText="quiz subject"
            name="quizSubjectFilter"
            value={quizSubjectFilter}
            itemOptions={["all", ...quizSubjectTypes]}
            handleChange={handleSearch}
          />
          {/* sort quiz */}
          <SelectFormRow
            inputId="sort"
            lableText="sort"
            name="sort"
            value={sort}
            itemOptions={sortOptions}
            handleChange={handleSearch}
          />
          <button onClick={handleSubmit} className="btn btn-block btn-danger">
            Clear Filter
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchContainer;
