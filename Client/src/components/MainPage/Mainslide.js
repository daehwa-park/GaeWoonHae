// 메인페이지 슬라이드바
// 구성 - 동작함수 , 슬라이드, 방 생성/입장 모달창 (goLobbymodal)

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect , useState }  from "react";
import GoLobby from "../modal/goLobbymodal"
import 'swiper/swiper-bundle.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 폰트어썸 아이콘
// import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
// import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import './Mainslide.css'

import Swiper from 'swiper';
import $ from 'jquery'; 

const Mainslide=() => {
    const [nowslideidx, setNowSlideIdx] = useState(0);
    const [LobbymodalOpen1, setLobbyModalOpen1] = useState(false);
    const [LobbymodalOpen2, setLobbyModalOpen2] = useState(false);
    const [LobbymodalOpen3, setLobbyModalOpen3] = useState(false);
    const showLobbyModal = (game_idx) => {
      if (game_idx ===0) {
          setLobbyModalOpen1(true);
        } else if (game_idx ===1) {
          setLobbyModalOpen2(true);
        } else {
          setLobbyModalOpen3(true);
        }
    };
    
    useEffect(() => {
        var menu = [];
        $('.swiper-slide').each(function (index) {
          menu.push($(this).find('.slide-inner').attr("data-text"));
        });
        var interleaveOffset = 0.5;
        var swiperOptions = {
          loop: false,
          speed: 1000,
          parallax: true,
          autoplay: {
            delay: 6500,
            disableOnInteraction: false,
          },
          watchSlidesProgress: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
    
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
    
          on: {
            slideChange: function () {
                // console.log('Current Slide Number:', this.activeIndex + 1);
                setNowSlideIdx(this.activeIndex);
              },

            progress: function () {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = swiper.width * interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                
                swiper.slides[i].querySelector(".slide-inner").style.transform =
                  "translate3d(" + innerTranslate + "px, 0, 0)";
              }
              
            },
    
            touchStart: function () {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";

              }

            },
    
            setTransition: function (speed) {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(".slide-inner").style.transition =
                  speed + "ms";
              }
            }
          }
        };
    
        var swiper = new Swiper(".swiper-container", swiperOptions);
        console.log(swiper)

        $(".arrow-left").on("click", function() {
          swiper.slidePrev();
          var speed = 700; // 원하는 속도로 설정
          for (var i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = speed + "ms";
              swiper.slides[i].querySelector(".slide-inner").style.transition =
                  speed + "ms";
          }
          console.log('asdafsdas')
      });
        $(".arrow-right").on("click", function() {
          swiper.slideNext();
          var speed = 700; // 원하는 속도로 설정
          for (var i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = speed + "ms";
              swiper.slides[i].querySelector(".slide-inner").style.transition =
                  speed + "ms";
          }
          console.log('asdafsdas')
      });
        // DATA BACKGROUND IMAGE
        // var sliderBgSetting = $(".slide-bg-image");
        // sliderBgSetting.each(function (indx) {
        //   if ($(this).attr("data-background")) {
        //     $(this).css("background-image", "url(" + $(this).data("background") + ")");
        //   }
        // });
      }, []);
    

    return(
        <div className="editslide">
            <div className='slidebar'>
                <section className="hero-slider hero-style">
                <div className="swiper-container">
                    <div className="swiper-wrapper">

                        <div className="swiper-slide" >
                            <div className="slide-inner slide-bg-image1">
                                <div className="main-container">
                                  <h3>
                                    짝짝! 모기 잡아라!
                                  </h3>
                                    <div className="centered-image-container">
                                        {/* <img src="/images/img/squat_gif.gif" alt="튜토리얼 GIF" className="centered-image" /> */}
                                        <img src="/images/img/mosquito.gif" alt="튜토리얼 GIF" className="centered-image" height="200" width="200" />
                                    </div>
                                    {/* 박수 동작으로 화면에 나타나는 모기를 잡아보자! <br/>
                                    게임이 종료될때까지 많이 성공한 사람이 승리! */}
                                    {/* <img src="/images/img/1.png" alt="튜토리얼 GIF"  className="centered-text" /> */}
                                </div>
                            </div>
                        </div>
                        

                        <div className="swiper-slide">
                            <div className="slide-inner slide-bg-image2" >
                                <div className="main-container">
                                      <h3>
                                          도전! 픽토그램!
                                        </h3>
             
                                       <div className="centered-image-container">
                                       <img src="/images/img/pictogram.gif" alt="튜토리얼 GIF" className="centered-image" />
                                        {/* <img src="/images/img/squat_gif.gif" alt="튜토리얼 GIF" className="centered-image" /> */}
                                        </div>
                                        {/* <img src="/images/img/2.png" alt="튜토리얼 GIF"  className="centered-text" /> */}
                                        </div>
                                
                            </div>
                        </div>
                        {/* <div className="swiper-slide">
                            <div className="slide-inner slide-bg-image3">
                                <div className="main-container">

                                        <div className="centered-image-container">
                                            <img src="/images/img/squat_gif.gif" alt="튜토리얼 GIF" className="centered-image" />
                                        </div>
                                        <img src="/images/img/3.png" alt="튜토리얼 GIF"  className="centered-text" />
                                    </div>
                        
                            </div>
                        </div> */}
                        <div className="swiper-pagination"></div>
                        {/* <div className="swiper-button-next"></div> */}
                        {/* <div className="swiper-button-prev"></div> */}
                    </div>
                </div>
                </section>
            </div>
            <div className="btncom">
                {/* <FontAwesomeIcon className="left-btn" icon={faChevronLeft} style={{color: "#f37f20",}}/> */}
                  <div className="arrow-left" ></div>
                 
                  <button className="theme-btn-s2 start-btn" onClick={()=>showLobbyModal(nowslideidx)}>
                    <img src="images/img/game_selected.png" alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  </button>
                  <div className="arrow-right"></div> 
                {/* <FontAwesomeIcon className="right-btn" icon={faChevronRight} style={{color: "#f37f20",}}/> */}
    
            </div>
            {LobbymodalOpen1 && <GoLobby value={1} setModalOpen={setLobbyModalOpen1} />}                            
            {LobbymodalOpen2 && <GoLobby value={2} setModalOpen={setLobbyModalOpen2} />}                            
            {LobbymodalOpen3 && <GoLobby value={3} setModalOpen={setLobbyModalOpen3} />}                            
        </div>
    )
}

export default Mainslide