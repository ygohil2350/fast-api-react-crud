import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import "./App.css";
import CustomTabPanel from "./components/CustomTabPanel";
import DataTable from "./components/DataTable/DataTable";

const App = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue: number) => {
    setValue(newValue);
  };
  const renderElement = [
    { id: 1, index: 0, label: "Use State Crud", cmp: DataTable },
    { id: 2, index: 1, label: "Redux Crud", cmp: DataTable },
    { id: 3, index: 2, label: "API Crud", cmp: DataTable },
  ];
  return (
    <>
      <div>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {renderElement.map((ele) => (
            <Tab key={ele.id} label={ele.label} />
          ))}
        </Tabs>
        {renderElement.map((ele) => (
          <CustomTabPanel key={ele.id} value={value} index={ele.index} children={<ele.cmp index={ele.index} />} />
        ))}
      </div>
    </>
  );
};

export default App;
