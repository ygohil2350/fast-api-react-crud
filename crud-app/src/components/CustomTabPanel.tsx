import { Box } from "@mui/material";
import { ReactElement } from "react";

interface props {
  value: number;
  index: number;
  children: ReactElement;
}
const CustomTabPanel = (props: props) => {
  const { value, index, children } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box>{children} Yash</Box>}
    </div>
  );
};

export default CustomTabPanel;
