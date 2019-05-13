import React from 'react';
import PinningChart from './PinningChart';
import './App.scss';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chambers: 7,
      levels: 2,
      masterKey: 0,
      controlKey: 0,
      userKey: 0,
      driverPins: [0, 0, 0, 0, 0, 0, 0],
      controlPins: [0, 0, 0, 0, 0, 0, 0],
      masterPins: [0, 0, 0, 0, 0, 0, 0],
      bottomPins: [0, 0, 0, 0, 0, 0, 0],
    };

    this.handleMasterKeyChange = this.handleMasterKeyChange.bind(this);
    this.handleControlKeyChange = this.handleControlKeyChange.bind(this);
    this.handleUserKeyChange = this.handleUserKeyChange.bind(this);
    this.handleChartUpdate = this.handleChartUpdate.bind(this);
    this.onFormSubmitted = this.onFormSubmitted.bind(this);
  }

  handleMasterKeyChange(event) {
    this.setState({masterKey: event.target.value});
  }

  handleControlKeyChange(event) {
    this.setState({controlKey: event.target.value});
  }

  handleUserKeyChange(event) {
    this.setState({userKey: event.target.value});
  }

  // utility function to split keys into digits
  getDigitsFromBiddings(bidding) {
    return Array.from(bidding.toString()).map(Number);
  }

  // utility function to validate key bidding lengths
  validateBidding(bidding) {
    return this.getDigitsFromBiddings(bidding).length === this.state.chambers;
  }

  onFormSubmitted(event) {
    event.preventDefault();

    this.handleChartUpdate();
  }

  // called to recalculate the pinning chart
  handleChartUpdate() {
    // grab current state
    let currentState = this.state;
    // convert biddings to arrays
    let user = this.getDigitsFromBiddings(currentState.userKey);
    let master = this.getDigitsFromBiddings(currentState.masterKey);
    let control = this.getDigitsFromBiddings(currentState.controlKey);

    // make new arrays for each set of pins
    let bottomPins = new Array(currentState.chambers);
    let masterPins = new Array(currentState.chambers);
    let controlPins = new Array(currentState.chambers);
    let driverPins = new Array(currentState.chambers);

    // start calculations by chamber
    for (let i = 0; i < currentState.chambers; i++) {
      // step 1: bottom pin is lowest of master and user keys
      bottomPins[i] = Math.min(user[i], master[i]);

      // step 2: master pin is difference between master and user keys
      masterPins[i] = Math.abs(user[i] - master[i]);

      // step 3: control pin is 10 + control key minus the lower pins
      controlPins[i] = 10 + control[i] - (bottomPins[i] + masterPins[i]);

      // step 4: driver pin is 23 minus the control key plus 10
      // note: this makes all the pins sum to 23
      driverPins[i] = 23 - (control[i] + 10)
    }

    // update pinning chart
    this.setState({
      bottomPins,
      masterPins,
      controlPins,
      driverPins,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Pinning Calculator for A2 Best System (2 Level)</h1>
          <form className="container my-2" onSubmit={this.onFormSubmitted}>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="masterKey">Master Key</label>
              <input
                type="number"
                className="form-control col-sm"
                id="masterKey"
                onChange={this.handleMasterKeyChange}
                required={true}
                max={Math.pow(10, this.state.chambers)}
                min={0}
              />
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="controlKey">Control Key</label>
              <input
                type="number"
                className="form-control col-sm"
                id="controlKey"
                onChange={this.handleControlKeyChange}
                required={true}
                max={Math.pow(10, this.state.chambers)}
                min={0}
              />
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="userKey">User Key</label>
              <input
                type="number"
                className="form-control col-sm"
                id="userKey"
                onChange={this.handleUserKeyChange}
                required={true}
                max={Math.pow(10, this.state.chambers)}
                min={0}
              />
            </div>
            <div className="form-group row">
              <div className="col text-right">
                <button type="submit" className="btn btn-primary">Create Pinning Chart</button>
              </div>
            </div>
          </form>
        </div>
        <PinningChart
          chambers={this.state.chambers}
          driverPins={this.state.driverPins}
          controlPins={this.state.controlPins}
          masterPins={this.state.masterPins}
          bottomPins={this.state.bottomPins}
          title="Results"
        />
      </div>
    );
  }
}

export default App;
