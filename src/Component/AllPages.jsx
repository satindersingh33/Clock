import React from 'react';
import { Link } from 'react-router-dom';
import "./Clock/digitalclock.css"

function AllPages() {
  return (
    <div>
      <div className='btn-container'>
         1.Project<Link to="/clock" className="link">Clock</Link><br></br>
         2.Project<Link to="/bingo" className="link">Bingo</Link>
      </div>
    </div>
  );
}

export default AllPages;
