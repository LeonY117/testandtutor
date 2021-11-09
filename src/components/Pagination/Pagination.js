import React from "react";
import classes from "./Pagination.module.css";

const Pagination = (props) => {
  let pages = [];
  const maxLabels = 8; // adjust based on window width
  const totalPages = props.totalPages;
  const page = props.selectedPage;
  //   const totalPages = 40;
  //   const page = 38;

  // Assume:
  let width = maxLabels - 4;

  let leftWidth = Math.floor((width - 1) / 2);
  let rightWidth = width - leftWidth - 1;

  let showLeftNumbers = false;
  let showRightNumbers = false;

  if (page - leftWidth <= 2 && totalPages - (page + rightWidth) <= 2) {
    showLeftNumbers = true;
    showRightNumbers = true;
  } else if (page - leftWidth <= 2) {
    showLeftNumbers = true;
    rightWidth += 2 - (page - leftWidth - 1);
  } else if (totalPages - (page + rightWidth) <= 2) {
    showRightNumbers = true;
    leftWidth += 2 - (totalPages - (page + rightWidth));
  }

  if ((showLeftNumbers && showRightNumbers) || totalPages < maxLabels) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (showLeftNumbers) {
      // push up to the mid point
      for (let i = 1; i <= page; i++) {
        pages.push(i);
      }
    } else if (!showLeftNumbers) {
      pages.push(1);
      pages.push(-1);
      for (let i = page - leftWidth; i <= page; i++) {
        pages.push(i);
      }
    }

    if (showRightNumbers) {
      for (let i = page + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (!showRightNumbers) {
      for (let i = page + 1; i <= page + rightWidth; i++) {
        pages.push(i);
      }
      pages.push(-1);
      pages.push(totalPages);
    }
  }

  let pageLabels = null;
  pageLabels = pages.map((item, i) => {
    let val = item;
    let clicked = () => {
      props.pageSelectHandler(item);
    };
    if (item === -1) {
      val = "...";
      clicked = null;
    }
    return (
      <li className={classes.numberWrapper} key={i}>
        <label
          className={classes.number}
          picked={(item === page).toString()}
          onClick={clicked}
        >
          {val}
        </label>
      </li>
    );
  });

  return (
    <div className={classes.pagination} id={"anchor"}>
      <p
        className={classes.prev}
        onClick={() => {
          props.pageSelectHandler(null, -1);
        }}
      >
        {"<"}
      </p>
      <ul className={classes.numbers}>{pageLabels}</ul>
      <p
        className={classes.next}
        onClick={() => {
          props.pageSelectHandler(null, 1);
        }}
      >
        {">"}
      </p>
    </div>
  );
};

export default Pagination;
