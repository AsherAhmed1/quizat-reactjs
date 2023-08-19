import React from "react";
import { useAppContext } from "../../context/AppContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import "./PageBtnContainer.css";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();
  // get num of button => matched with array
  // map [undef,undef,...] => [1,2,...]
  const pages = Array.from({ length: numOfPages }, (el, index) => index + 1);
  const prevPage = () => {
    let tempPageNum = page - 1;
    if (tempPageNum < 1) tempPageNum = 1;
    changePage(tempPageNum);
  };
  const nextPage = () => {
    let tempPageNum = page + 1;
    if (tempPageNum > numOfPages) tempPageNum = numOfPages;
    changePage(tempPageNum);
  };
  const handlePageNumChange = pageNum => {
    changePage(pageNum);
  };
  return (
    <section className="pageBtnContainer">
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>

      <div className="btn-container">
        {pages.map(pageNum => {
          return (
            <button
              type="button"
              className={`pageBtn ${pageNum === page ? "active" : ""}`}
              key={pageNum}
              onClick={() => handlePageNumChange(pageNum)}
            >
              {pageNum}{" "}
            </button>
          );
        })}
      </div>

      <button className="prev-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </section>
  );
};

export default PageBtnContainer;
