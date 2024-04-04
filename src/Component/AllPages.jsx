import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Clock/digitalclock.css"
function AllPages() {
  const navigate = useNavigate();

  return (
    <div>
      <div  className='btn-container'   >
       
            <button onClick={() => navigate('/clock')}>Clock</button>
        
            <button onClick={() => navigate('/bingo')}>Bingo</button>
        
      </div>
    </div>
  );
}

export default AllPages;
