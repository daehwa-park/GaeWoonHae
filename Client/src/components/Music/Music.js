
import React, { useState } from "react";
import { useSelector } from "react-redux"
import './Music.css'

const Music = () => {
  const [musicPlaying, setMusicPlaying] = useState(true);

  const isLogined = useSelector((state) => state.auth.isLoggined);

  const startMusic = () => {
    if(musicPlaying)
    setMusicPlaying(false);
  else
    setMusicPlaying(true);
  }

  return (
    <div className="music-modal">
      <div>
        <div className="music-img" alt="music-icon" onClick={startMusic} style={{fontSize:"50px"}}>{musicPlaying ? "🔊":"🔈"} </div>
        {musicPlaying && isLogined && (<audio src="../../music/music.mp3" autoPlay={true} loop={true}></audio>)}
      </div>
    </div>
  );
}

export default Music;