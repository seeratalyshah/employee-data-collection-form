"use client";
// import { useEffect } from "react";
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
import DocumentsUpload from "./steps/DocumentsUpload";
import Declaration from "./steps/Declaration";
import Header from "../common/header";
import { labels, stepFields } from "./data";

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
      <Header />
      <main className="container my-10 p-4 rounded-md mt-44">
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
                <DocumentsUpload key={9} />,
                <Declaration key={10} />,
              ]}
            />
          </EIContext.Provider>
        </FormProvider>
      </main>
    </>
  );
}
