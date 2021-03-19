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
    else if (/[+\-*/]/.test(btnValue)) {
        this.setState({previousValueString: this.state.currentValueString});
        this.setState({currentValueString: "0"});
        this.setState({currentMathFunction: btnValue});
        console.log("hello");
      }
    else if (btnValue === "=") {
        const answer = calculate[this.state.currentMathFunction](parseFloat(this.state.previousValueString),parseFloat(this.state.currentValueString));
        const formattedAnswer = answer.toFixed(8).toString().replace(/(\.0+$)|(0+$)/,'');
        console.log(formattedAnswer);
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
    <button key={value} onClick={() => {this.handleClick(value)}}>{value}</button>
  );
    return(
      <>
      <h1>Hello World and hello button {this.state.currentValues[0]}</h1>
      {allButtons}
      </>
    );
  }
}

const calculate = {
  '+': (x, y) => {return x + y},
  '-': (x, y) => {return x - y},
  '*': (x, y) => {return x * y},
  '/': (x, y) => {return x / y},
  surname: "gibson"
}


export default CalcButton;
