import { Route, Routes } from "react-router-dom";
import "./App.css";
import ThankYouPage from "./common/thankyou-page";
import EmployeeInformation from "./employee-information";
// import OldEmployeeInformation from "./employee-information/employee-information.jsx"

function App() {
  return <div className="App">
    <Routes>
      <Route path="/" element={<EmployeeInformation />} />
      {/* <Route path="/" element={<OldEmployeeInformation />} /> */}
      <Route path="/thank-you" element={<ThankYouPage />} />
    </Routes>
  </div>;
}

export default App;
