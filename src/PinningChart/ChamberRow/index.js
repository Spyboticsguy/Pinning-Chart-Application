import React from 'react';

export default function ChamberRow(props) {
  // set default property for hiding zeroes (true by default)
  let hideZero = props.hideZero === null || props.hideZero === undefined ? true : props.hideZero;
  // generate chamber fields for the passed-in cuts
  let chambers = props.cuts.map((value, index) => {
    // check if we should hide zeroes
    return hideZero ?
    <div className="digit" key={index}>{value === 0 || isNaN(value) ? "" : value}</div> :
    <div className="digit" key={index}>{isNaN(value) ? "" : value}</div>;
  });

  return (
    <div className={(props.className ? props.className + " " : "") + "chamber-row"}>
      <div className="title">{props.title ? props.title + ":" : ""}</div>
      {chambers}
    </div>
  );
}