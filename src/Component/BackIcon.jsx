import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackIcon() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M6 12l6.41-6.41L12 5l-8 8 8 8 1.41-1.41L6 12z" />
    </svg>
  );
}

export default BackIcon;
