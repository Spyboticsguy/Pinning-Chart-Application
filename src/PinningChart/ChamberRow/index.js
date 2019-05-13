import React from 'react';

export default function ChamberRow(props) {
  // generate chamber fields for the passed-in cuts
  let chambers = props.cuts.map((value, index) => {
    return <div className="digit" key={index}>{value === 0 || isNaN(value) ? "" : value}</div>;
  });

  return (
    <div className={(props.className ? props.className + " " : "") + "chamber-row"}>
      <div className="title">{props.title ? props.title + ":" : ""}</div>
      {chambers}
    </div>
  );
}