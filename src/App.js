import { useEffect, useRef, useState } from "react";
//import './beep-alarm.mp3';

function App() {

const [breakLength, setBreakLength] = useState(5); //break length
const [sessionLength, setSessionLength] = useState(25); //session length

const [timerValue, setTimerValue] = useState(1500); //timer display

const [getMessage, setMessage] = useState(true);
const [timerToggle, setTimerToggle] = useState(false);



const audioElement = useRef(null);

const updateBreakLength = (value) =>{
  if(breakLength <= 1 && value === -1){
    return;
  }else if(breakLength >=60 && value === 1){
    return;
  }
  //value = breakLength + value;
  console.log("break length: ", breakLength + value);

  setBreakLength(breakLength + value);
  //return breakLength;
};

const updateSessionLength = (value) =>{
  if(sessionLength <= 1 && value === -1){
    return;
  }else if(sessionLength >=60 && value === 1){
    return;
  }

  //value = sessionLength + value;


  setSessionLength(sessionLength + value);
  setTimerValue(timerValue + (value*60));
  
  console.log("session length: ", sessionLength + value);
  console.log("timerValue: ", timerValue)
  //return sessionLength;
};

const resetData = () => {
  console.log("reset button pressed")

  setTimerToggle(false);
  setBreakLength(5);
  setSessionLength(25);
  setTimerValue(1500);
  //setTimeDisplay(1500);

  setMessage(true);
};

const startStop = () => {
  setTimerToggle(!timerToggle);
};

const formatTime = () =>{
  //console.log("Raw: ", time);
  let minutes = Math.floor(timerValue / 60);
  let seconds = timerValue % 60;
  //console.log("minutes: ", minutes);
  //console.log("seconds: ", seconds);

  minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
  
  return `${minutes}:${seconds}`;
};


useEffect(()=>{
  //formatTime();
  //NEW
  //clock();
  //startStop();
  //console.log("timer(ms): ", timerValue);
  //console.log("timer: ", formatTime());

  if(timerToggle){
    const interval = setInterval(() => {
      setTimerValue(prev => prev-1);
      console.log('click');
      console.log("timer(ms): ", timerValue);
      //setTimeDisplay(timerValue);

      if(timerValue<=0){
        audioElement.current.load();
        audioElement.current.currentTime = 0;
        audioElement.current.volume = 0.8;
        audioElement.current.play();
      }

      if(timerValue<=0 && getMessage === true){
        setMessage(false);
        console.log("breakLength: ", breakLength*60);
        setTimerValue(breakLength*60);
      }
      if(timerValue<=0 && getMessage === false){
        setMessage(true);
        console.log("sessionLength: ", sessionLength*60);
        setTimerValue(sessionLength*60);
      }

    }, 1000);
  
    
    return () => clearInterval(interval);
  }



////////////////////////////////

  // console.log("timer: ", timerValue);
  // console.log("timerToggle: ", timerToggle);

  // if(timerToggle && timerValue > 0){

  //   const interval = setInterval(()=>{
  //     setTimerValue(timerValue - 1);
  //   }, 1000);
  //   return () => clearInterval(interval);

  // }else if(timerValue <= 0){
  //   audioElement.current.load();
  //   audioElement.current.currentTime = 0;
  //   audioElement.current.volume = 0.8;
  //   audioElement.current.play();

  //   if(getMessage === "Session"){
  //     setTimerValue(breakLength*60);
  //     setMessage('Break');
  //   }else if (getMessage === "Break"){
  //     setTimerValue(sessionLength*60);
  //     setMessage('Session');
  //   }
  // }
});
//},[timerValue, timerToggle]);//NEW
//},[breakLength, sessionLength, timerValue, timerToggle, getMessage]);

  return (
  <div id="master-container">
    <div id='container'>
      <h1 id="title">Pomodoro Clock</h1>

      <div id="settings-container">

        <div id="break-container">
          <h2 id='break-label'>Break Length</h2>
          <div id="btn-container">
            <button disabled={timerToggle} id="break-decrement" className='timer-btn' onClick={()=>updateBreakLength(-1)}><i className="large material-icons">arrow_downward</i></button>
            <strong id="break-length">{breakLength}</strong>
            <button disabled={timerToggle} id="break-increment" className='timer-btn' onClick={()=>updateBreakLength(1)}><i className="large material-icons">arrow_upward</i></button>
          </div>
        </div>

        <div id="session-container">
          <h2 id='session-label'>Session Length</h2>
          <div id="btn-container">
            <button disabled={timerToggle} id="session-decrement" className='timer-btn' onClick={()=>updateSessionLength(-1)}><i className="large material-icons">arrow_downward</i></button>
            <strong id="session-length">{sessionLength}</strong>
            <button disabled={timerToggle} id="session-increment" className='timer-btn' onClick={()=>updateSessionLength(1)}><i className="large material-icons">arrow_upward</i></button>
          </div>
        </div>
      </div>

      <div id="label-container">

        <audio id="timer-beep" src="./beep-alarm.mp3" type="audio/mpeg" ref={audioElement}/>

        <h2 id="timer-label">{getMessage === true ? 'Session':'Break'}</h2>
        <div id="time-left">{timerValue === 0 ? '00:00': formatTime()}</div>
      </div>

      <div id="controls-container">
        <div id="start_stop" onClick={startStop}><i className="large material-icons">play_arrow</i></div>
        <div id="reset" onClick={resetData}><i className="large material-icons">loop</i></div>
      </div>
    </div>
    <div id="navigation-container">
      <a id="return-btn" href="http://jonfrei.com/Resume_Project_Page/"><i className="large material-icons">arrow_back</i></a>
      <a id="github-btn" href="https://jonfrei.github.io/Pomodoro-Clock">View Project on GitHub</a>
    </div>
  </div>
  
  );
}

// function StartStopIcon(){
//   if (App.timerToggle){
//     return document.createElement(<i className="large material-icons">play_arrow</i>);
//   }else{
//     return document.createElement(<i className="large material-icons">pause</i>);
//   }
// }

export default App;
