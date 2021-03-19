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
        <CalcButton buttonValues={[1,2,3,4,5,6,7,8,9,0, "+", "-","*","/", "=", ".", "%","+/-", "C"]} handler={this.handler}/>
        <form>
          <input id="calcScreen" type="text" onChange={myFunction} value={this.state.lastValue}/>
        </form>
      </>
    );
  }
}

function myFunction(){

}

export default Calculator;
