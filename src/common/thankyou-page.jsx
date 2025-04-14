import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">Thank you!</h2>
        <p className="text-gray-700 mb-6">
          Your form has been successfully submitted. We appreciate your time and
          effort.
        </p>
        <Link
          to="/"
          className="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go back to the form
        </Link>
      </div>
    </div>
  );
}
