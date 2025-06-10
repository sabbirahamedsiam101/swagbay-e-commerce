import { Slider } from "@mui/material";

<Slider
  value={priceRange}
  onChange={(e, newValue) => setPriceRange(newValue)}
  valueLabelDisplay="auto"
  min={0}
  max={1000}
/>;
