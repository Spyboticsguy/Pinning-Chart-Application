import React from 'react';
import PinningChart from './PinningChart';
import './App.scss';

function App() {
  return (
    <div className="App">
      <PinningChart chambers={6} title="Pinning Chart for A2 Best System"/>
    </div>
  );
}

export default App;
