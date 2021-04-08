import React, { Component } from 'react';

class CalcButton extends Component {

  constructor(props){
      super(props);
      this.state = {
        hasDecimal: false,
        currentMathFunction: "",
        previousValueString: "",
        currentValueString: "0",
        answerJustGiven: false,
        currentValues: this.props.buttonValues
      }
    }

  handleClick(btnValue){
    if (btnValue >= 0 && btnValue < 10 || (btnValue === "." && !this.state.hasDecimal) ) {
      if (this.state.answerJustGiven) {
        this.setState({currentValueString: btnValue.toString()});
        if (btnValue === ".") {
          this.setState({currentValueString: "0."});
          this.props.handler("0" + btnValue);

        } else{

          this.props.handler(btnValue);
        }

        this.setState({answerJustGiven:false});

      } else {
        this.setState({currentValueString: this.state.currentValueString + btnValue});
        let displayStr = this.state.currentValueString + btnValue;
        if (/^0\d+/.test(displayStr)) {
          displayStr = displayStr.substring(1);
        }
        this.props.handler(displayStr);
      }

      if (btnValue === ".") {
        this.setState({hasDecimal: true});
      }
    }
    else if (btnValue === "+/-" && this.state.currentValueString!=="0") {
      if (this.state.currentValueString[0]==='-') {
        this.setState({currentValueString: this.state.currentValueString.substring(1)});
        let displayStr = this.state.currentValueString.substring(1);
        if (/^0\d+/.test(displayStr)) {
          displayStr = displayStr.substring(1);
        }
        this.props.handler(displayStr);
      } else {
        this.setState({currentValueString: "-" + this.state.currentValueString});
        let displayStr = this.state.currentValueString;
        if (/^0\d+/.test(displayStr)) {
          displayStr = displayStr.substring(1);
        }
        displayStr = "-" + displayStr;
        this.props.handler(displayStr);
      }
    }
    else if (/[+\-x÷]/.test(btnValue)) {
        this.setState({previousValueString: this.state.currentValueString});
        this.setState({currentValueString: "0"});
        this.setState({currentMathFunction: btnValue});
        this.setState({hasDecimal:false});

        console.log("hello");
      }
    else if (btnValue === "=") {
        let answer = calculate[this.state.currentMathFunction](parseFloat(this.state.previousValueString),parseFloat(this.state.currentValueString));
        let formattedAnswer;
        if (answer > 9999999999) {
          let a = answer.toExponential(8);
          formattedAnswer = a;
        }
        else {
          formattedAnswer = answer.toFixed(8).toString().replace(/(\.0+$)|(0+$)/,'');
        }
        this.setState({currentValueString: formattedAnswer});
        this.props.handler(formattedAnswer);
        this.setState({answerJustGiven:true});
        this.setState({hasDecimal:false});
        this.setState({currentMathFunction:""});
      }
    else if (btnValue === "%") {
        if (this.state.currentMathFunction === "") {
          const answer = parseFloat(this.state.currentValueString) / 100;
          this.setState({currentValueString: answer});
          if(answer.toString().includes('.')){
            this.setState({hasDecimal: true});
          }
          this.props.handler(answer);
        }
      }
    else if (btnValue === "C") {
        this.setState({previousValueString:""});
        this.setState({currentValueString:"0"});
        this.setState({currentMathFunction:""});
        this.setState({hasDecimal: false});
        this.props.handler(0);

    }

  }


  handleClick = this.handleClick.bind(this);

  render() {
    const allButtons = this.state.currentValues.map((value) =>
    <button className="calc-button" key={value} onClick={() => {this.handleClick(value)}}>{value}</button>
  );
    return(
      <>
      <section className="container text-center mt-5">
      <div className="keypad">
        <div className="row">
          <div className="col-xsm-3">
          {allButtons[0]}
          </div>
          <div className="col-xsm-3">
          {allButtons[1]}
          </div>
          <div className="col-xsm-3">
          {allButtons[2]}
          </div>
          <div className="col-xsm-3">
          {allButtons[3]}
          </div>
        </div>
        <div className="row">
          <div className="col-xsm-3">
          {allButtons[4]}
          </div>
          <div className="col-xsm-3">
          {allButtons[5]}
          </div>
          <div className="col-xsm-3">
          {allButtons[6]}
          </div>
          <div className="col-xsm-3">
          {allButtons[7]}
          </div>
        </div>
        <div className="row">
          <div className="col-xsm-3">
          {allButtons[8]}
          </div>
          <div className="col-xsm-3">
          {allButtons[9]}
          </div>
          <div className="col-xsm-3">
          {allButtons[10]}
          </div>
          <div className="col-xsm-3">
          {allButtons[11]}
          </div>
        </div>
        <div className="row">
          <div className="col-xsm-3">
          {allButtons[12]}
          </div>
          <div className="col-xsm-3">
          {allButtons[13]}
          </div>
          <div className="col-xsm-3">
          {allButtons[14]}
          </div>
          <div className="col-xsm-3">
          {allButtons[15]}
          </div>
        </div>
        <div className="row">
          <div className="col-xsm-6s">
          <button className="calc-button wide-btn" onClick={() => {this.handleClick(0)}}>0</button>

          </div>
          <div className="col-xsm-3">
          {allButtons[17]}
          </div>
          <div className="col-xsm-3">
          {allButtons[18]}
          </div>
        </div>
      </div>
      </section>
      </>
    );
  }
}

const calculate = {
  '+': (x, y) => {return x + y},
  '-': (x, y) => {return x - y},
  'x': (x, y) => {return x * y},
  '÷': (x, y) => {return x / y},
  surname: "gibson"
}


export default CalcButton;
