import React from 'react';

export default (props) => {
  return (
    <div>
      <nav className="navbar fixed-top navbar-inverse bg-inverse row">
        {/*keeping as a navbar brand class for styling */}
        <a className="navbar-brand white col-md-4 col-lg-4" href="#">Better than Dictionary.com</a>
        <p className="navbar-brand white col-md-4 col-lg-4">{props.date}</p>
        <p className="navbar-brand white col-md-4 col-lg-4">A project by Cy Kong</p>
      </nav>
    </div>
  )
}