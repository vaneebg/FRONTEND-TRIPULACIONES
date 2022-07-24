import FilterDetail from "./FilterDetail.jsx/FilterDetail";
import React, { useState } from "react";

const Filter = () => {
    const [current, setCurrent] = useState(1);

  return (
    <div>
        <FilterDetail pageC={current} functionPage={setCurrent} />
    </div>
  );
};

export default Filter;
