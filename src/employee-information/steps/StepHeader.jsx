import React from "react";

const StepHeader = ({ steps, active }) => (
  <ul className="step-row">
    {steps.map((s, i) => (
      <li
        key={s.key}
        className={`step ${i < active ? "done" : i === active ? "doing" : ""}`}
      >
        <span className="circle">{i + 1}</span>
        <span className="label">{s.label}</span>
      </li>
    ))}
  </ul>
);

export default StepHeader;
