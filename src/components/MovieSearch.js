import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { FTextField } from "./form";
import { useFormContext } from "react-hook-form";

function MovieSearch() {
  const { register, watch, setValue } = useFormContext();
  const searchQuery = watch("searchQuery");
  const handleChange = (e) => {
    setValue("searchQuery", e.target.value);
  };

  return (
    <FTextField
      {...register("searchQuery")}
      value={searchQuery || ""}
      sx={{ width: 300, input: { color: "black" } }}
      size="small"
      onChange={handleChange}
      placeholder="Search for a movie"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default MovieSearch;