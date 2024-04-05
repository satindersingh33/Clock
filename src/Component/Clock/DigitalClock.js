import React, { useState, useEffect } from 'react';
import './digitalclock.css'; 
import CircleClock from './CircleClock';
import BackIcon from '../BackIcon';

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const formatDateTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    hours = hours < 10 ? '0' + hours : hours; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return (
      <div>
        <div>{strTime}</div>
      
      </div>
    );
  };

  return (
    <>
    <BackIcon/>
    <div className="main-clock">
    <div className="digital-clock-container"> 
      <div className="digital-time">{formatDateTime(time)}</div>    
    </div>
    <div className='container-wallClock'>
        <CircleClock/>
      </div>
      </div>
    </>
  );
}

export default DigitalClock;
