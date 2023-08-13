import React, { useEffect, useState, useRef } from "react";
import musicOnIcon from "../../assets/music/apple_music_icon.png";
import musicOffIcon from "../../assets/music/playing_music.png";
import './Music.css'

const Music = () => {
  const [musicPlaying, setMusicPlaying] = useState(true);
  const musicIcon = musicPlaying ? musicOnIcon : musicOffIcon

  // const [checkPage,setCheckPage] = useEffect(false)
  const startMusic = () => {
    if(musicPlaying)
    setMusicPlaying(false);
  else
    setMusicPlaying(true);
  }

  const checkPage = useRef(false);
// const musicPage = localStorage.getItem('musicIcon');
  useEffect(()=>{
    checkPage.current = localStorage.getItem('musicIcon')
    // setCheckPage(true)
  // const musicPage1 = localStorage.getItem('musicIcon')
  // setCheckPage(localStorage.getItem('musicIcon'))
    // console.log('asdfasd',localStorage.getItem('musicIcon'))
  }, [localStorage.getItem('musicIcon')])

  return (
    <div className="music-modal">
      {checkPage ? (
        <div>
          <img className="music-img" src={musicIcon} alt="music-icon" onClick={startMusic} />
          {!musicPlaying && (<audio src="../../music/music.mp3" autoPlay={true} loop={true}></audio>)}
        </div>
      ) : null}
    </div>
  );
}

export default Music;