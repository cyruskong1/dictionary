import React from 'react';

export default (props) => {
  if(props.userSuccess === true) { 
    return (
      <div style={props.style} className = "search container border-sucess">
        <button type="button" className="close" onClick={props.close} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h2>{props.message}</h2>
      </div>
    )
  } else {
    return (
    <div style={props.style} className = "search container border-error">
        <button type="button" className="close" onClick={props.close} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      <h2>{props.message}</h2>
    </div>
    )
  }
}