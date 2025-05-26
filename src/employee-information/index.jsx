"use client";
import { useEmployeeInformation } from "./use-employee-information";
import { FormProvider } from "../common/form-provider";
import { EIContext } from "./EIContext";
import Stepper from "./Stepper";

/* ------- step bodies -------- */
import PersonalInfo from "./steps/PersonalInfo";
import EmploymentDetails from "./steps/EmploymentDetails";
import Qualifications from "./steps/Qualifications";
import WorkExperience from "./steps/WorkExperience";
import SkillsResearch from "./steps/SkillsResearch";
import EmergencyContact from "./steps/EmergencyContact";
import BankingInfo from "./steps/BankingInfo";
import AdditionalInfo from "./steps/AdditionalInfo";
import Declaration from "./steps/Declaration";
import { labels, stepFields } from "./data";
import logo from "../images/logo.png";
// import { useEffect } from "react";

export default function EmployeeInformation() {
  const ei = useEmployeeInformation();

  /* -------- draft persistence (24 h) -------- */
  // const KEY = "ei-draft";
  // useEffect(() => {
  //   const sub = ei.methods.watch((v) =>
  //     localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), v }))
  //   );
  //   return () => sub.unsubscribe();
  // }, []);

  // useEffect(() => {
  //   const saved = localStorage.getItem(KEY);
  //   if (saved) {
  //     const { t, v } = JSON.parse(saved);
  //     if (Date.now() - t < 86400000) ei.methods.reset(v);
  //   }
  // }, []);

  const submit = ei.methods.handleSubmit(ei.onSubmit, ei.onError);

  return (
    <>
      {/* <Header /> */}
      <div className="container p-4 rounded-md">
        <div className="bg-blue-500 text-white p-8 flex flex-col items-center rounded-lg mb-10">
          <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center mb-4">
            <img src={logo} alt="logo" className="w-28 h-28" />
          </div>
          <h1 className="text-2xl font-semibold mt-1">
            Employee Data Collection Form
          </h1>
          <p className="text-center text-white/90">
            For all Muslim Hands employees worldwide
          </p>
        </div>
        <FormProvider methods={ei.methods} onSubmit={submit}>
          <EIContext.Provider value={ei}>
            <Stepper
              labels={labels}
              stepFields={stepFields}
              methods={ei.methods}
              onFinalSubmit={submit}
              steps={[
                <PersonalInfo key={1} />,
                <EmploymentDetails key={2} />,
                <Qualifications key={3} />,
                <WorkExperience key={4} />,
                <SkillsResearch key={5} />,
                <EmergencyContact key={6} />,
                <BankingInfo key={7} />,
                <AdditionalInfo key={8} />,
                <Declaration key={9} />,
              ]}
            />
          </EIContext.Provider>
        </FormProvider>
      </div>
    </>
  );
}
