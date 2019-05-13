import React from 'react';

export default function ChamberRow(props) {
  // generate chamber fields for the passed-in cuts
  let chambers = props.cuts.map((value, index) => {
    return <div class="digit" key={index}>{value}</div>;
  });

  return (
    <div class={(props.class ? props.class + " " : "") + "chamber-row"}>
      <div class="title">{props.title ? props.title + ":" : ""}</div>
      {chambers}
    </div>
  );
}