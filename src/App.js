import { Route, Routes } from "react-router-dom";
import "./App.css";
import EmployeeInformation from "./employee-information/employee-information";

function App() {
  return <div className="App">
    <Routes>
      <Route path="/" element={<EmployeeInformation />} />
    </Routes>
  </div>;
}

export default App;
