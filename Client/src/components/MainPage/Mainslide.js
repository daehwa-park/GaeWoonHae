
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import React, {useState }  from "react";
import React, { useEffect , useState }  from "react";
import GoLobby from "./mainslide/goLobbymodal"
import 'swiper/swiper-bundle.min.css';

// import Slidecomp from "../../roompage/Lobby/Lobby2"
import './Mainslide.css'

import Swiper from 'swiper';
import $ from 'jquery'; 



function Mainslide() {
    const [nowslideidx, setNowSlideIdx] = useState(0);
    const [LobbymodalOpen1, setLobbyModalOpen1] = useState(false);
    const [LobbymodalOpen2, setLobbyModalOpen2] = useState(false);
    const [LobbymodalOpen3, setLobbyModalOpen3] = useState(false);
    const showLobbyModal = (game_idx) => {
        if (game_idx ===0) {
            setLobbyModalOpen2(true);
        } else if (game_idx ===1) {
            setLobbyModalOpen1(true);
        } else {
            setLobbyModalOpen3(true);
        }
    };

    useEffect(() => {
        // Swiper initialization code
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
                console.log('Current Slide Number:', this.activeIndex + 1);
    
                setNowSlideIdx(this.activeIndex);
                console.log(nowslideidx)
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
        console.log(swiper.activeIndex);
        // console.log(swiper)
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
                            <div className="slide-inner slide-bg-image1" data-background="https://images.unsplash.com/photo-1578934191836-ff5f608c2228?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80">
                                <div className="container">
                                    <div data-swiper-parallax="300" className="slide-title">
                                         <h2>픽토그램</h2>
                                    </div>
                                    <div data-swiper-parallax="400" className="slide-text">
                                        <p>Want to see your kid become more expressive?</p>
                                    </div>
                                    
                                    <div class="clearfix"></div>
                                    <div data-swiper-parallax="500" class="slide-btns">
                                        <a href="#" class="theme-btn-s2">튜토리얼</a>
                                        <a href="#" class="theme-btn-s3"><i class="fas fa-chevron-circle-right"></i> Game Info</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                        <div class="swiper-slide">
                            <div class="slide-inner slide-bg-image2" data-background="https://images.unsplash.com/photo-1579003087287-997fd4d18771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
                                <div class="container">
                                    <div data-swiper-parallax="300" class="slide-title">
                                        <h2>박 터트리기</h2>
                                    </div>
                                    <div data-swiper-parallax="400" class="slide-text">
                                        <p>Want to see your kid become more expressive?</p>
                                    </div>
        
                                    <div class="clearfix"></div>
                                    <div data-swiper-parallax="500" class="slide-btns">
                                        <a href="#" class="theme-btn-s2">튜토리얼</a>
                                        <a href="#" class="theme-btn-s3"><i class="fas fa-chevron-circle-right"></i> Game Info</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="slide-inner slide-bg-image3" data-background="https://images.unsplash.com/photo-1579003087287-997fd4d18771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
                                <div class="container">
                                    <div data-swiper-parallax="300" class="slide-title">
                                        <h2>공 피하기</h2>
                                    </div>
                                    <div data-swiper-parallax="400" class="slide-text">
                                        <p>Want to see your kid become more expressive?</p>
                                    </div>
            
                                    <div class="clearfix"></div>
                                    <div data-swiper-parallax="500" class="slide-btns">
                                        <a href="#" class="theme-btn-s2">튜토리얼</a>
                                        <a href="#" class="theme-btn-s3"><i class="fas fa-chevron-circle-right"></i> Game Info</a>
                                    </div>
                
                                </div>
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </div>
                </section>
            </div>

            <button className="theme-btn-s2 start-btn" onClick={()=>showLobbyModal(nowslideidx)}>게임시작</button>
            {LobbymodalOpen1 && <GoLobby value={1} setModalOpen={setLobbyModalOpen1} />}                            
            {LobbymodalOpen2 && <GoLobby value={2} setModalOpen={setLobbyModalOpen2} />}                            
            {LobbymodalOpen3 && <GoLobby value={3} setModalOpen={setLobbyModalOpen3} />}                            
        </div>
    )
}

export default Mainslide