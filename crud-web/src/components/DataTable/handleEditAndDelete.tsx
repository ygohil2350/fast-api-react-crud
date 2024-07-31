import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { GridValidRowModel } from "@mui/x-data-grid";

interface IHandleEditAndDelete {
  handleEdit: (data: GridValidRowModel) => void;
  handleDelete: (data: GridValidRowModel) => void;
}
const HandleEditAndDelete = (props: IHandleEditAndDelete) => {
  const { handleDelete, handleEdit } = props;

  return (
    <Box>
      <IconButton onClick={handleEdit}>
        <Edit />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <Delete />
      </IconButton>
    </Box>
  );
};

export default HandleEditAndDelete;
