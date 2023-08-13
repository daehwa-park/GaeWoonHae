import React, { useState } from "react";
import musicOnIcon from "../../assets/music/apple_music_icon.png";
import musicOffIcon from "../../assets/emoji/emoji1.png";

const Music = () => {
  const [musicPlaying, setMusicPlaying] = useState(true);
  const musicIcon = musicPlaying ? musicOnIcon : musicOffIcon

  const startMusic = () => {
    if(musicPlaying)
      setMusicPlaying(false);
    else
      setMusicPlaying(true);
    }
    
    return (
      <div>
        <img src={musicIcon} alt="music-icon" onClick={startMusic} />
            {musicPlaying && (<audio src="../../music/music.mp3" autoPlay={true} loop={true}></audio>)}
      </div>
    );
}

export default Music;