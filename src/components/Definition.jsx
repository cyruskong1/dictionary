import React from 'react';

export default (props) => {
  return (
    <div style={props.style} className = "search testborder">
      <div className="form-group">
        <h2>{props.word}</h2>
        <p>{props.definition}</p>
        <button type="submit" className="btn btn-default" id="clear" onClick={props.toggleDefinitionDisplayOff}>Clear & reset</button>
      </div>
    </div>
  )
}