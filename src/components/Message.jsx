import React from 'react';

export default (props) => {
  if(props.userSuccess === true) { 
    return (
      <div style={props.style} className = "search container testborder">
        <button type="button" className="close" onClick={props.close} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h1> Success Message </h1>
      </div>
    )
  } else {
    return (
    <div style={props.style} className = "search container testborder">
        <button type="button" className="close" onClick={props.close} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      <h1> Error Message </h1>
    </div>
    )
  }
}