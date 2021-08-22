import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
export default function InputEditor({ dataEditor, name, funcCustomEditor }) {
  const apiKey = "qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc";
  return (
    <div>
      <Editor
        apiKey={apiKey}
        value={
          dataEditor && dataEditor.hasOwnProperty(name)
            ? dataEditor[name]
            : dataEditor
        }
        onEditorChange={(e) => funcCustomEditor(e, name)}
        init={{
          height: 500,
          branding: false,
        }}
      />
    </div>
  );
}
