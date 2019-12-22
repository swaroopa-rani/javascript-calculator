import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: '0',
    };
  }

  numberClick = digit => e => {
    this.setState({
      currentVal:
        this.state.currentVal === '0'
          ? String(digit)
          : this.state.currentVal + digit,
    });
  };

  clear = () => {
    this.setState({
      currentVal: '0',
    });
  };

  OperatorFunc = op => e => {
    this.setState({
      currentVal:
        this.state.currentVal.charAt(this.state.currentVal.length - 1) === op
          ? this.state.currentVal + ''
          : this.state.currentVal + op,
    });
  };

  decimalFunc = arg => e => {
    const splitarr = this.state.currentVal.split(/[+*\/-]/g);
    const lastWord = splitarr[splitarr.length - 1];
    console.log(splitarr);
    if (!lastWord.includes('.')) {
      this.setState({
        currentVal: this.state.currentVal + arg,
      });
    }
  };

  result = eqOp => e => {
    console.log('came');
    const currentNum = this.state.currentVal;
    console.log(currentNum);
    const receivedOperators = currentNum.split(/[0-9]+\.[0-9]+|[0-9]+/);
    console.log(receivedOperators);
    const finalArr = [];
    console.log(finalArr);
    const splitNum = currentNum.split(/[-|+|/|*]/).filter(Boolean);
    console.log(splitNum);
    const splitOperators = receivedOperators.filter(Boolean);
    console.log(splitOperators);
    for (var i = 0; i < splitOperators.length; i++) {
      if (splitOperators[i].length > 0) {
        splitOperators[i] = splitOperators[i].split('');
        for (var j = 0; j < splitOperators[i].length; j++) {
          if (
            splitOperators[i][splitOperators[i].length - 1] == '-' &&
            splitOperators[i][splitOperators[i].length - 2] == '*'
          ) {
            splitOperators[i] =
              splitOperators[i][splitOperators[i].length - 2] +
              splitOperators[i][splitOperators[i].length - 1];
            break;
          } else {
            splitOperators[i] = splitOperators[i][splitOperators[i].length - 1];
          }
        }
      }
    }
    console.log(splitOperators);
    for (var i = 0; i < splitNum.length; i++) {
      finalArr.push(splitNum[i]);
      for (var j = 0; j < splitOperators.length; j++) {
        finalArr.push(splitOperators[j]);
        splitOperators.shift();
        break;
      }
    }
    var finalArray = finalArr.join('');
    console.log(finalArray);
    this.setState({
      currentVal: eval(finalArray).toString(),
    });
  };

  render() {
    return (
      <div>
        <h1>
          <input id="display" value={this.state.currentVal} />
          <button id="zero" onClick={this.numberClick(0)}>
            0
          </button>
          <button id="one" onClick={this.numberClick(1)}>
            1
          </button>
          <button id="two" onClick={this.numberClick(2)}>
            2
          </button>
          <button id="three" onClick={this.numberClick(3)}>
            3
          </button>
          <button id="four" onClick={this.numberClick(4)}>
            4
          </button>
          <button id="five" onClick={this.numberClick(5)}>
            5
          </button>
          <button id="six" onClick={this.numberClick(6)}>
            6
          </button>
          <button id="seven" onClick={this.numberClick(7)}>
            7
          </button>
          <button id="eight" onClick={this.numberClick(8)}>
            8
          </button>
          <button id="nine" onClick={this.numberClick(9)}>
            9
          </button>
          <button id="add" onClick={this.OperatorFunc('+')}>
            +
          </button>
          <button id="subtract" onClick={this.OperatorFunc('-')}>
            -
          </button>
          <button id="multiply" onClick={this.OperatorFunc('*')}>
            *
          </button>
          <button id="divide" onClick={this.OperatorFunc('/')}>
            /
          </button>
          <button id="decimal" onClick={this.decimalFunc('.')}>
            .
          </button>
          <button id="equals" onClick={this.result('=')}>
            =
          </button>
          <button id="clear" onClick={this.clear}>
            C
          </button>
        </h1>
      </div>
    );
  }
}
