import { Box, Button, Stack, Typography } from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { FRadioGroup } from "./form";
import { FormProvider } from "react-hook-form"; 

export const FILTER_GENRE_OPTIONS = [
  "Action",
  "Adventure",
  "Animation",
  "Crime",
  "Comedy",
  "Drama",
  'Family',
  "Fantasy",
  "History",
  "Music",
  "Mystery",
  "Horror",
  "Romance",
  "Documentary",
];

function MovieFilter({ resetFilter, methods }) {
  const handleClearAll = (e) => {
    e.preventDefault();
    resetFilter();
  };

  return (
    <FormProvider {...methods}>
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Genres
        </Typography>
        <FRadioGroup
          name="genre"
          options={FILTER_GENRE_OPTIONS}
          row={false}
        />
      </Stack>
      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={handleClearAll}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
    </FormProvider>
  );
}

export default MovieFilter;