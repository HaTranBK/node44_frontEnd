import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { getType } from "../utils/fetchFromAPI";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getType()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => {
        console.log("error in getType in FE: ", err);
      });
  }, []);

  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          onClick={() => navigate("/videoType/" + category.type_id)}
          style={{
            background: category.type_id === selectedCategory && "#FC1503",
            color: "white",
          }}
          key={category.type_id}
        >
          <span
            style={{
              color: category.name === selectedCategory ? "white" : "red",
              marginRight: "15px",
            }}
          >
            <i className={category.icon}></i>
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
            }}
          >
            {category.type_name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default Categories;
