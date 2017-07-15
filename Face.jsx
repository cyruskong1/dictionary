import React from 'react';

export default (props) => {

  return (
    <div className="face-compare container">
     <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
          <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)} onClick={() => this.searchForMatchingFace()}>Find my Look-a-like</button>
          <button className="clear" onClick ={() => this.clearSearch()}>Clear</button>
        </form>
      </div>
    </div>
  )
}

            
