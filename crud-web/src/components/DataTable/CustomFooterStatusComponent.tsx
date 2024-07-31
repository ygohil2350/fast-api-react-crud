import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
interface ICustomFooterStatusComponent {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const CustomFooterStatusComponent = (props: ICustomFooterStatusComponent) => {
  const { setOpen } = props;
  return (
    <Box sx={{ p: 1, display: "flex" }}>
      <Button startIcon={<Add />} onClick={() => setOpen(true)} variant="contained" size="small">
        Add Record
      </Button>
    </Box>
  );
};
