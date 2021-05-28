import React from "react";

function Aboute({ match }) {
  return (
    <div>
      Trang chi tiết
      {match.url}<br/>
      {match.params.id}
    </div>
  );
}

export default Aboute;
