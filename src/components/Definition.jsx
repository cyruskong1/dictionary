import React from 'react';

export default (props) => {
  return (
    <div style={props.style} className = "search testborder">
      <h1>Definition</h1>
       <div className="form-group">
          <button type="submit" className="btn btn-default" id="clear">Clear & reset</button>
        </div>
    </div>
  )
}