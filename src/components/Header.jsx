import React from 'react';

export default (props) => {
  return (
    <div>
      <nav className="navbar fixed-top navbar-inverse bg-inverse">
        {/*keeping as a navbar brand class for styling */}
        <a className="navbar-brand white" href="#">Better than Dictionary.com</a>
        <p className="navbar-brand white">{props.date}</p>
        <p className="navbar-brand white">A project by Cy Kong</p>
      </nav>
    </div>
  )
}