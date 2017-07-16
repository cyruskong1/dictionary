import React from 'react';

export default (props) => {
  return (
    <div className="search container">
      <form className="form-horizontal">
        <div className="form-group">
          <label>My word is:</label>
          <input type="text" className="form-control" id="searchedWord" placeholder="Search"/>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-default" onClick={props.searchWord}>Look up definition</button>
          <button type="submit" className="btn btn-default" onClick={props.toggleMessageDisplay}>Add to dictionary</button>
        </div>
      </form>
    </div>
  )
}

            
