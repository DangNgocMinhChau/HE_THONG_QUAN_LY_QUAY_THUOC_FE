import React from "react";

export default function Caculator(props) {
  var op = []; //array for storing numbers
  var decimal = true; // to access decimal dot
  const result = (event) => {
    // event.preventDefault();
    // var result = eval(op).toFixed(2);
    // var ind = result.indexOf(".");
    // if (String(result).length <= 11) {
    //   this.props.setResult({
    //     result: result.slice(0, ind),
    //     decimals: result.slice(ind),
    //   });
    // } else {
    //   this.props.setResult({ result: "error", decimals: "" });
    // }
  };

  const reset = (event) => {
    event.preventDefault();
    op = [];
    decimal = true;
    this.props.setResult({ result: 0, display: 0, decimals: ".00" });
  };

  const delete2 = () => {};
  const pusher = () => {};

  const pusher2 = () => {};

  const pusher3 = () => {};
  const pusher4 = () => {};

  return (
    <div className="pad">
      <div className="afterpad">
        <div className="filter">
          <form className="calc">
            <div>
              <button onClick={(event) => reset} value={0}>
                {" "}
                C{" "}
              </button>
              <button onClick={() => delete2}> DEL </button>
            </div>

            <div>
              <button onClick={() => pusher} value={1}>
                1
              </button>
              <button onClick={() => pusher} value={2}>
                2
              </button>
              <button onClick={() => pusher} value={3}>
                3
              </button>
              <button onClick={() => pusher2} value="+">
                +
              </button>
            </div>

            <div>
              <button onClick={() => pusher} value={4}>
                4
              </button>
              <button onClick={() => pusher} value={5}>
                5
              </button>
              <button onClick={() => pusher} value={6}>
                6
              </button>
              <button onClick={() => pusher3} value="-">
                -
              </button>
            </div>

            <div>
              <button onClick={() => pusher} value={7}>
                7
              </button>
              <button onClick={() => pusher} value={8}>
                8
              </button>
              <button onClick={() => pusher} value={9}>
                9
              </button>
              <button onClick={() => pusher2} value="*">
                *
              </button>
            </div>

            <div className="lastrow">
              <button onClick={() => pusher} value={0}>
                0
              </button>
              <button onClick={() => pusher4} value=".">
                .
              </button>
              <button onClick={() => pusher2} value="/">
                /
              </button>
            </div>
          </form>
        </div>
      </div>
      <button className="return" onClick={(event) => result}>
        =
      </button>
    </div>
  );
}
