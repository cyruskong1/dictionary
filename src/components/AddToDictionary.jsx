import React from 'react';

export default (props) => {
  return (
    <div style={props.style} className = "search testborder">
      <div className="form-group">
        <h2>Add to Dictionary</h2>
        <textarea className="form-control" id="add-def" placeholder="Enter a pithy definition here"></textarea>
        <button type="submit" className="btn btn-default" id="clear" onClick={props.toggleAddDisplay}>Cancel</button>
        <button type="submit" className="btn btn-default" id="clear" onClick={props.addToDictionary}>Add</button>
      </div>
    </div>
  )
}