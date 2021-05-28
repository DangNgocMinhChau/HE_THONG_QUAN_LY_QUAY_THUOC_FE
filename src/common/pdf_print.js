import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button } from "antd";
const PDFPrint = ({ children, stylePrint }) => {
  const elmRef = useRef(null);
  return (
    <div>
      <>
        <ReactToPrint
          trigger={() => (
            <Button
              className={`${stylePrint ? "custom-print-2" : "custom-print"}`}
            >
              <i class="fa fa-print" aria-hidden="true"></i>
            </Button>
          )}
          content={() => elmRef.current}
        />
        <div ref={elmRef} style={{ padding: "20px 0" }}>
          {children}
        </div>
      </>
    </div>
  );
};

export default PDFPrint;
