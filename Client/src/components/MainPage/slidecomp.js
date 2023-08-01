import React, { useEffect }  from "react";
import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';
import $ from 'jquery'; 
import './slidecomp.css'


const Slidecomp =() => {
    // 슬라이드 상태관리

    useEffect(() => {
        // Swiper initialization code
        var menu = [];
        $('.swiper-slide').each(function (index) { // '.swiper-slide'요소를 찾아 순회
          menu.push($(this).find('.slide-inner').attr("data-text")); // '자식 .slide-inner'를 찾고 "data-text"값을 []에 추가 
        });
        var interleaveOffset = 0.5;
        var swiperOptions = {
          loop: true,
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
            progress: function () {  // swiper 이동에 따라 발생 계산된 거리만큼 슬라이드 이동
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) { // 슬라이더 각각 찾아 순회
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = swiper.width * interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                swiper.slides[i].querySelector(".slide-inner").style.transform =
                  "translate3d(" + innerTranslate + "px, 0, 0)";
              }
            },
    
            touchStart: function () { // 터치 시작 시 모든 슬라이드의 애니메이션 트랜지션(이동 애니메이션)을 잠시 비활성화합니다.
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },
    
            setTransition: function (speed) {  // 슬라이드 이동이 애니메이션 처리
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms"; // 각슬라이드의 속도 처리
                swiper.slides[i].querySelector(".slide-inner").style.transition =
                  speed + "ms";  // 저장
              }
            }
          }
        };
    
        var swiper = new Swiper(".swiper-container", swiperOptions);
        console.log(swiper)
        // DATA BACKGROUND IMAGE
        var sliderBgSetting = $(".slide-bg-image");
        sliderBgSetting.each(function (indx) {
          if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
          }
        });
      }, []);



    return (
        <div >
            <section className="hero-slider hero-style">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="slide-inner slide-bg-image1" data-background="https://images.unsplash.com/photo-1578934191836-ff5f608c2228?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80">
                            <div className="container">
                                {/* "패럴랙스"란 웹 페이지의 요소들이 스크롤에 따라 다른 속도로 움직이는 효과 */}
                                {/* 슬라이드의 이동에 비례하여 300 픽셀의 속도로 반대 방향으로 이동 */}
                                <div data-swiper-parallax="300" className="slide-title"> 

                                <h2>GUITAR Page1</h2>
                                </div>
                                <div data-swiper-parallax="400" className="slide-text">
                                <p>Want to see your kid become more expressive?</p>
                                </div>
                                <div className="clearfix"></div>
                                <div data-swiper-parallax="500" className="slide-btns">
                                {/* <a href="#" class="theme-btn-s2">Register now</a>
                                <a href="#" class="theme-btn-s3"><i class="fas fa-chevron-circle-right"></i> Get Info</a> */}
                                </div>
                            </div>
                            </div>
                        
                        </div>
                        

                        <div className="swiper-slide">
                            <div className="slide-inner slide-bg-image2" data-background="https://images.unsplash.com/photo-1579003087287-997fd4d18771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
                            <div className="container">
                                <div data-swiper-parallax="300" className="slide-title">
                                <h2>GUITAR Page2</h2>
                                </div>
                                <div data-swiper-parallax="400" className="slide-text">
                                <p>Want to see your kid become more expressive?</p>
                                </div>
                                <div className="clearfix"></div>
                                <div data-swiper-parallax="500" className="slide-btns">
                
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-pagination"></div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </div>


            </section>
        </div>
    )
}

export default Slidecomp