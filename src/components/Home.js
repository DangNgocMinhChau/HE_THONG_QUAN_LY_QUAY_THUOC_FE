import React, { useState } from "react";
import PDFViewer from "pdf-viewer-reactjs";
function Home(props) {
  const ExamplePDFViewer = () => {
    return (
      <PDFViewer
        document={{
          url: "./../filedinhkem/3239 qd.PDF",
        }}
      />
    );
  };

  return (
    <div>
      <embed
        src="./../filedinhkem/3239 qd.PDF"
        type="application/pdf"
        width="100%"
        height="600px"
      />
    </div>
  );
}

export default Home;
