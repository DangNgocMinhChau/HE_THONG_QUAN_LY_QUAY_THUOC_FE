import React from "react";
import QRCode from "qrcode.react";
function QrCode({ value, tenDowload }) {
  const downloadQR = () => {
    const canvas = document.getElementById("qrcode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log("pngUrl", pngUrl);
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${tenDowload}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <QRCode
        id="qrcode"
        value={value ? value : ""}
        size={300}
        level={"L"}
        includeMargin={false}
      />
      <br />
      <a onClick={downloadQR}> Download QR </a>
    </div>
  );
}

export default QrCode;
