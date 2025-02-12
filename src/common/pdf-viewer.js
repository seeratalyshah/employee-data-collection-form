import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFViewer = ({ fileUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div
      style={{
        height: "80vh",
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >
        {fileUrl && (
          <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
        )}
      </Worker>
    </div>
  );
};

export default PDFViewer;
