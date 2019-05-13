import React from 'react';
import ChamberRow from './ChamberRow';

export default function PinningChart(props) {
  let driverPins = [6, 5, 4, 6, 5, 4];
  let controlPins = [12, 12, 12, 12, 12, 12];
  let masterPins = [4, 4, 4, 4, 4, 4];
  let bottomPins = [1, 2, 3, 1, 2, 3];
  return(
    <div class="container">
      <h1>{props.title}</h1>
      <ChamberRow
        class="border-bottom"
        title="Chambers"
        cuts={[...Array(props.chambers).keys()].map(value => value + 1)}
      />
      <ChamberRow
        class="border-bottom"
        title="Driver Pins"
        cuts={driverPins}
      />
      <ChamberRow title="Control Pins" cuts={controlPins} />
      <ChamberRow class="border-bottom" cuts={masterPins} />
      <ChamberRow title="Bottom Pins" cuts={bottomPins} />
    </div>
  );
}