import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridValidRowModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./../../store";
import { addReduxPersonal, deleteReduxPersonal, updateReduxPersonal } from "./../../store/personalCRUDSlice";
import { CustomFooterStatusComponent } from "./CustomFooterStatusComponent";
import HandleEditAndDelete from "./handleEditAndDelete";

interface IDataTableProps {
  index: number;
}

const DataTable = (props: IDataTableProps) => {
  const { index } = props;
  const [rows, setRows] = useState<GridValidRowModel[]>([]);
  const reduxRows = useAppSelector((state) => state.personalCRUDSlice.rows);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [rowData, setRowData] = useState<GridValidRowModel>({});
  const dispatch = useAppDispatch();
  useEffect(() => {
    switch (index) {
      case 0: // useState
        setRows([]);
        break;
      case 1: // Redux
        setRows(reduxRows);
        break;
      case 2: // API
        // code block
        break;
      default:
        setRows([]);
    }
  }, [index, reduxRows]);
  const handleEdit = (data: GridValidRowModel) => {
    setRowData(data);
    setIsEdit(true);
    setOpen(true);
  };
  const handleDelete = (data: GridValidRowModel) => {
    setRowData(data);
    setOpenDelete(true);
  };

  const columns: GridColDef[] = [
    { field: "first_name", headerName: "First name" },
    { field: "last_name", headerName: "Last name" },
    {
      field: "age",
      headerName: "Age",
      type: "number",
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      valueGetter: (value, row) => `${row.first_name ?? ""} ${row.last_name ?? ""}`,
    },
    {
      field: "action",
      headerName: "Action",
      description: "This Column has a ability to edit and delete record",
      sortable: false,
      renderCell: (props: GridRenderCellParams<GridValidRowModel, Date>) => (
        <HandleEditAndDelete handleEdit={() => handleEdit(props.row)} handleDelete={() => handleDelete(props.row)} />
      ),
    },
  ];

  const handleClose = () => {
    setRowData({});
    setIsEdit(false);
    setOpen(false);
  };
  const crudFunction = (formJson: { [k: string]: FormDataEntryValue }, operation: "Add" | "Update" | "Delete") => {
    switch (index) {
      case 0: // useState
        if (operation === "Add") {
          setRows((pre) => [...pre, { ...formJson, id: crypto.randomUUID() }]);
        }
        if (operation === "Update") {
          setRows((pre) =>
            pre.map((ele) => {
              if (ele.id === rowData.id) return { ...formJson, id: crypto.randomUUID };
              else return ele;
            }),
          );
        }
        if (operation === "Delete") {
          setRows((pre) => [...pre.filter((ele) => ele.id !== formJson.id)]);
        }
        break;
      case 1: // Redux
        if (operation === "Add") {
          dispatch(addReduxPersonal({ ...formJson, id: crypto.randomUUID() }));
        }
        if (operation === "Update") {
          dispatch(updateReduxPersonal({ ...formJson, id: rowData.id }));
        }
        if (operation === "Delete") {
          dispatch(deleteReduxPersonal(formJson));
        }
        // code block
        break;
      case 2: // API
        // code block
        break;
      default:
        setRows((pre) => [...pre, { ...formJson, id: crypto.randomUUID() }]);
    }
    setRowData({});
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as FormData).entries());
    crudFunction(formJson, isEdit ? `Update` : `Add`);
    handleClose();
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };
  const onDeleteSubmit = () => {
    crudFunction(rowData, "Delete");
    handleDeleteClose();
  };
  return (
    <Box sx={{ width: "100vh", height: "80vh" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          footer: () => <CustomFooterStatusComponent setOpen={setOpen} />,
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: onSubmit,
        }}
      >
        <DialogTitle>{isEdit ? `Edit` : `Add`} Personal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            defaultValue={rowData?.first_name}
            id="First Name"
            name="first_name"
            label="First Name"
            type="string"
            variant="standard"
          />
          <TextField
            required
            defaultValue={rowData?.last_name}
            id="Last Name"
            name="last_name"
            label="Last Name"
            type="string"
            variant="standard"
          />
          <TextField
            required
            defaultValue={rowData?.age}
            id="Age"
            name="age"
            label="Age"
            type="number"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size="small" variant="outlined">
            Cancel
          </Button>
          <Button size="small" type="submit" variant="outlined">
            {isEdit ? `Edit` : `Add`}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete}>
        <DialogTitle>Add Personal</DialogTitle>
        <DialogContent>Are You sure You want to delete this record</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} size="small" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" size="small" variant="outlined" onClick={onDeleteSubmit}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataTable;
