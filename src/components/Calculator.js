import React, { Component } from 'react';
import CalcButton from './CalcButton.js';

class Calculator extends Component {

  constructor(props){
      super(props);
      this.state = {
        lastValue: 0
      }
    }

    handler(btnValue) {
      this.setState({
        lastValue: btnValue
      })
    }
    handler = this.handler.bind(this);

  render() {
    return(
      <>
        <form className="text-center calc-form">
          <input id="calcScreen" className="calc-display" type="text" onChange={myFunction} value={this.state.lastValue}/>
        </form>
        <CalcButton buttonValues={["C","+/-","%","÷",7,8,9,"x",4,5,6,"-",1,2,3,"+",0,".", "="]} handler={this.handler}/>

      </>
    );
  }
}

function myFunction(){

}

export default Calculator;
