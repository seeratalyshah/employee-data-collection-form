import { useFormContext, Controller } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import URL from "../url/url";

//import Image from "next/image";

export function RhfSignaturePad({ name, required, ...other }) {
  const { control } = useFormContext();
  const [showSignCanvas, setShowSignCanvas] = useState(
    control._defaultValues[`${name}`]
  );
  const sigCanvas = useRef();

  useEffect(() => {
    setShowSignCanvas(control._defaultValues[`${name}`]);
  }, [control, name]);

  const urlToFile = (url) => {
    const arr = url.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const data = arr[1];
    const dataStr = atob(data);
    let n = dataStr.length;
    const dataArr = new Uint8Array(n);
    while (n--) {
      dataArr[n] = dataStr.charCodeAt(n);
    }
    const file = new File(
      [dataArr],
      `File(${new Date().toLocaleDateString("en-US")}).png`,
      {
        type: mime,
      }
    );
    return file;
  };

  const formatIntoPng = (isClear) => {
    if (isClear) return null;
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.toDataURL();
      const file = urlToFile(dataURL);
      return file;
    }
    return null;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div {...other}>
          <label className="text-sm font-medium text-[#252525]">
            {other.label}
            <span className="text-sm text-red-500 ml-1">{required && "*"}</span>
          </label>
          <div
            className={`w-full border focus:border-[1px] mt-1.5 ${
              other.disabled
                ? "border-gray-300"
                : "border-gray-300 hover:border-[#26BBDD]"
            } rounded p-2 ${
              error
                ? "border-2 border-red-400 shadow-red-300"
                : "border-gray-300"
            }`}
          >
            {(other.disabled || showSignCanvas) && (
              <img
                alt="sign"
                width={1000}
                height={200}
                src={`${URL}${showSignCanvas}`}
              />
            )}
            {!other.disabled && !showSignCanvas && (
              <SignatureCanvas
                penColor="black"
                onEnd={() => {
                  field.onChange(formatIntoPng(false));
                }}
                canvasProps={{
                  style: {
                    width: "100%",
                    height: "100%",
                  },
                }}
                ref={sigCanvas}
              />
            )}
          </div>
          <div className="flex justify-between mt-2 flex-col md:flex-row">
            {error && (
              <p className="mt-2 text-sm text-red-600">{error.message}</p>
            )}
            <button
              type="button"
              disabled={other.disabled}
              className={`px-5 text-sm py-2 rounded mt-3 md:mt-0 ${
                other.disabled
                  ? "bg-gray-300 text-gray-500"
                  : "bg-blue-500 text-white"
              }`}
              onClick={() => {
                if (showSignCanvas !== null) {
                  setShowSignCanvas(null);
                } else {
                  sigCanvas.current.clear();
                }
                field.onChange(formatIntoPng(true));
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    />
  );
}
