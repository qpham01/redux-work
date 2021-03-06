import React, { Component } from "react";
import { connect } from "react-redux";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
import * as actionTypes from "../../store/actions";

class Counter extends Component {
  state = {
    counter: 0,
    results: []
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case "inc":
        this.setState(prevState => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case "dec":
        this.setState(prevState => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case "add":
        this.setState(prevState => {
          return { counter: prevState.counter + value };
        });
        break;
      case "sub":
        this.setState(prevState => {
          return { counter: prevState.counter - value };
        });
        break;
      default:
        this.setState(prevState => {
          return { counter: prevState.counter };
        });
    }
  };

  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl label="Increment" clicked={this.props.incHandler} />
        <CounterControl label="Decrement" clicked={this.props.decHandler} />
        <CounterControl label="Add 5" clicked={this.props.addHandler} />
        <CounterControl label="Subtract 5" clicked={this.props.subHandler} />
        <hr />
        <button onClick={() => this.props.storeResult(this.props.ctr)}>
          Store Result
        </button>
        <ul>
          {this.props.res.map(result => (
            <li
              key={result.id}
              onClick={() => this.props.deleteResult(result.id)}
            >
              {result.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// A function that maps state properties to component props.
// In example below, state.counter field is mapped to ctr field
// in props of the Counter component.
const mapStateToProps = state => {
  return {
    ctr: state.counter.counter,
    res: state.results.results
  };
};

const mapDispatchToProps = dispatch => {
  return {
    incHandler: () => dispatch({ type: actionTypes.INCREMENT }),
    decHandler: () => dispatch({ type: actionTypes.DECREMENT }),
    addHandler: () => dispatch({ type: actionTypes.ADD_5, value: 5 }),
    subHandler: () => dispatch({ type: actionTypes.SUBTRACT_5, value: 5 }),
    storeResult: result =>
      dispatch({ type: actionTypes.STORE_RESULT, result: result }),
    deleteResult: id => dispatch({ type: actionTypes.DELETE_RESULT, id: id })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
