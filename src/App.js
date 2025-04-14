import { Route, Routes } from "react-router-dom";
import "./App.css";
import EmployeeInformation from "./employee-information/employee-information";
import ThankYouPage from "./common/thankyou-page";

function App() {
  return <div className="App">
    <Routes>
      <Route path="/" element={<EmployeeInformation />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
    </Routes>
  </div>;
}

export default App;
