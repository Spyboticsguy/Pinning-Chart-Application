import React from 'react';
import ChamberRow from './ChamberRow';

export default function PinningChart(props) {
  return(
    <div className="container">
      <h2>{props.title}</h2>
      <ChamberRow
        className="border-bottom"
        title="Chamber"
        cuts={[...Array(props.chambers).keys()].map(value => value + 1)}
      />
      <ChamberRow
        className="border-bottom"
        title="Driver Pins"
        cuts={props.driverPins}
      />
      <ChamberRow title="Control Pins" cuts={props.controlPins} />
      <ChamberRow className="border-bottom" cuts={props.masterPins} />
      <ChamberRow title="Bottom Pins" cuts={props.bottomPins} />
    </div>
  );
}