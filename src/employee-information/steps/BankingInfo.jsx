import { AlertCircle } from "lucide-react";
import Card from "../../common/custom-card";
import { RHFInputField } from "../../common/rhf-input";
import { RHFTextArea } from "../../common/rhf-text-area";
import { useEI } from "../EIContext";

export default function BankingInfo({ onNext, onPrev }) {
  const { submitErrorMessage } = useEI();
  return (
    <Card title="Banking & Salary Information">
      <div className="flex flex-col gap-4 px-1 pr-4">
        {submitErrorMessage && (
          <div className="flex items-start gap-3 p-4 bg-red-100 border-l-4 border-red-500 rounded-lg text-red-600 my-10">
            <AlertCircle className="mt-1 w-5 h-5 text-red-600" />
            <div>
              <p className="font-semibold">Missing Required Information</p>
              {submitErrorMessage}
            </div>
          </div>
        )}
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFInputField
              outerLabel="Bank Name"
              name="bankName"
              placeholder="Bank Name"
              required
            />
          </div>
          <div className="w-full">
            <RHFInputField
              outerLabel="Branch"
              name="branch"
              placeholder="Branch"
              required
            />
          </div>
        </div>
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFInputField
              outerLabel="Account Holder’s Name"
              name="accountTitle"
              placeholder="Account Holder’s Name"
              required
            />
          </div>
          <div className="w-full">
            <RHFInputField
              outerLabel="IBAN / Account Number"
              name="accountNumber"
              placeholder="IBAN / Account Number"
              required
            />
          </div>
        </div>
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFInputField
              outerLabel="Swift Code (if applicable)"
              name="swifCode"
              placeholder="Swift Code (if applicable)"
            />
          </div>
          <div className="w-full">
            <RHFTextArea
              outerLabel="Bank Address"
              name="bankAddress"
              placeholder="Bank Address"
              required
            />
          </div>
        </div>
      </div>
      <div className="ei-nav">
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 text-sm text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none font-medium flex items-center gap-2"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onNext()}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none font-medium flex items-center gap-2"
        >
          Next
        </button>
      </div>
    </Card>
  );
}
