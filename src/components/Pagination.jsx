import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPage: PropTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
  totalPage: 1,
  onChange: (page) => {
    return page;
  },
};

const sizeList = [5, 10, 25, 50, 100];

export default function Pagination({
  onChange,
  currentPage,
  totalPage,
  count,
  pageSize,
  onChangePageSize,
}) {
  const [currentPages, setCurrentPages] = React.useState(currentPage);

  useEffect(() => {
    setCurrentPages(currentPage);
  }, [currentPage]);

  let maxPages = totalPage;
  let items = [];
  let leftSide = 0;
  let rightSide = 0;

  if (maxPages <= 5) {
    leftSide = 1;
    rightSide = maxPages;
  } else if (currentPage <= 4) {
    leftSide = 1;
    rightSide = 5;
  } else if (currentPage + 2 >= maxPages) {
    leftSide = maxPages - 4;
    rightSide = maxPages;
  } else {
    leftSide = currentPage - 2;
    rightSide = currentPage + 2;
  }

  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <li
        className={"page-item " + (number === currentPage ? "active" : "")}
        key={number}
      >
        <button
          type="button"
          className="page-link"
          onClick={() => {
            setCurrentPages(number);
            onChange(number);
          }}
        >
          {number}
        </button>
      </li>
    );
  }

  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPages(currentPage + 1);
      onChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPages(currentPage - 1);
      onChange(currentPage - 1);
    }
  };

  return (
    <div
      id={nanoid()}
      className={
        "flex items-center justify-between py-3 row" +
        (count === 0 ? "hidden" : "")
      }
    >
      <div>
        <p className="text-sm ">
          แสดง <span className="font-medium">{currentPage}</span> จาก{" "}
          <span className="font-medium">{totalPage}</span> หน้า (
          <span className="font-medium">ทั้งหมด {count} รายการ</span> )
        </p>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-warning justify-content-end">
          <li className={"page-item " + (currentPage == 1 && "disabled")}>
            <button
              type="button"
              className="page-link"
              onClick={() => {
                prevPage();
              }}
            >
              <i className="fa-solid fa-arrow-left-long"></i>
            </button>
          </li>
          {items}
          <li
            className={
              "btn-group page-item " + (currentPage == totalPage && "disabled")
            }
          >
            <button
              type="button"
              className="page-link"
              onClick={() => {
                nextPage();
              }}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
            <div className="btn-group" role="group">
              <button
                id="btnGroupDrop1"
                type="button"
                className="btn btn-outline-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {pageSize}
              </button>
              <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                {sizeList.map((item, i) => (
                  <li key={i} onClick={() => onChangePageSize(item)}>
                    <div className="dropdown-item">{item}</div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
