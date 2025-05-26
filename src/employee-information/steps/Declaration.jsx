/* components/employee-information/steps/Declaration.jsx  */
import Card from "../../common/custom-card";
import { RhfSignaturePad } from "../../common/rhf-signature-pad";
import { useEI } from "../EIContext";
import { Loader2 } from "lucide-react";

export default function Declaration({ onPrev, isFirst, onNext }) {
  const { fullName, isSubmitting } = useEI();

  return (
    <Card title="Employee Declaration & Signature">
      <p className="text-[16px] w-full max-w-[800px] my-4">
        I,&nbsp;
        <strong>{fullName || "[Employee Name]"}</strong>, confirm that the
        information provided above is true and correct to the best of my
        knowledge. I understand that falsifying information may lead to
        disciplinary consequences.
      </p>

      {/* ----- Signature pad ----- */}
      <div className="w-full md:w-[50%]">
        <RhfSignaturePad name="signature" label="Signature" required />
      </div>

      {/* ----- navigation ----- */}
      <div className="ei-nav w-full mt-4">
        {!isFirst && (
          <button
            type="button"
            onClick={onPrev}
            className="px-4 py-2 text-sm text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none font-medium flex items-center gap-2"
          >
            Previous
          </button>
        )}

        <button
          type="button"
          onClick={() => onNext()}
          disabled={isSubmitting}
          className={`px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none font-medium flex items-center gap-2 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting && <Loader2 className="animate-spin w-4 h-4" />}
          {isSubmitting ? "Submitting…" : "Submit"}
        </button>
      </div>
    </Card>
  );
}
