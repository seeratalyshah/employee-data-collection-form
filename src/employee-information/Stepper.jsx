import React, { useContext, useState } from "react";
import { EIContext } from "./EIContext";

/**
 * Generic multi-step component.
 *
 * @param {JSX.Element[]} steps  – array of rendered step bodies
 * @param {string[]} labels      – titles shown in the header
 * @param {string[][]} stepFields– array of field-name arrays (per step)
 * @param {Object}     methods   – react-hook-form methods (trigger / etc.)
 * @param {Function}   onFinalSubmit – called after last step validates
 */
export default function Stepper({
  steps,
  labels,
  stepFields,
  methods,
  onFinalSubmit,
}) {
  const [idx, setIdx] = useState(0);
  const total = steps.length;
  const { trigger, formState } = methods;
  const { onError, setSubmitErrorMessage } = useContext(EIContext);

  const handleNext = async (fieldsFromStep) => {
    // validate only the list that the step passes in
    const ok = await trigger(fieldsFromStep || stepFields[idx], {
      shouldFocus: true,
    });
    if (!ok) {
      onError(formState.errors);
      return;
    }

    setSubmitErrorMessage("");

    if (idx < total - 1) setIdx(idx + 1);
    else onFinalSubmit();
  };

  const handlePrev = () => idx > 0 && setIdx(idx - 1);

  // inject nav callbacks + flags into the active step element
  const current = React.cloneElement(steps[idx], {
    onNext: handleNext,
    onPrev: handlePrev,
    isFirst: idx === 0,
    isLast: idx === total - 1,
  });

  return (
    <>
      {/* progress bar ------------------------------------------------ */}
      <ul className="ei-steps">
        {labels.map((l, i) => {
          const cls = i < idx ? "done" : i === idx ? "active" : "";
          return (
            <li key={l} className={cls}>
              <span className="ei-label">{l}</span>
            </li>
          );
        })}
      </ul>

      {/* body -------------------------------------------------------- */}
      {current}
    </>
  );
}
