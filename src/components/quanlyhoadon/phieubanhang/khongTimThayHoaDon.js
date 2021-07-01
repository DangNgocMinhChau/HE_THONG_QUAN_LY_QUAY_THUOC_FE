import React from "react";

function KhongTimThayHoaDon(props) {
  return (
    <div className="wrapper row2">
      <div id="container" className="clear">
        <section id="fof" className="clear">
          <div className="fl_left">
            <img src="./../../static/img/404.png" alt="" />
            <div id="respond">
              <form action="#" method="post">
                <fieldset>
                  <legend>Site Search</legend>
                  <input
                    type="text"
                    value="Search Our Website&hellip;"
                    onfocus="this.value=(this.value=='Search Our Website&hellip;')? '' : this.value ;"
                  />
                  <input type="submit" id="submit" value="Search" />
                </fieldset>
              </form>
            </div>
          </div>
          <div className="fl_right">
            <h1>Sorry, Nothing Found</h1>
            <p>
              For Some Reason The Page You Requested Could Not Be Found On Our
              Server
            </p>
            <p>
              Go back to the{" "}
              <a href="javascript:history.go(-1)">previous page</a> or visit our{" "}
              <a href="#">homepage</a> or try one of the links below:
            </p>
            <ul>
              <li>
                <a href="#">Link Text Here</a>
              </li>
              <li>
                <a href="#">Link Text Here</a>
              </li>
              <li>
                <a href="#">Link Text Here</a>
              </li>
              <li>
                <a href="#">Link Text Here</a>
              </li>
              <li>
                <a href="#">Link Text Here</a>
              </li>
              <li>
                <a href="#">Link Text Here</a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default KhongTimThayHoaDon;
