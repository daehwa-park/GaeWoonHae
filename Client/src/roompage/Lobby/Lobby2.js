import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';
import $ from 'jquery'; 
import './Lobby2.css'

const Lobby = () => {
  useEffect(() => {
    // Swiper initialization code
    var menu = [];
    $('.swiper-slide').each(function (index) {
      menu.push($(this).find('.slide-inner').attr("data-text"));
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
    // DATA BACKGROUND IMAGE
    // var sliderBgSetting = $(".slide-bg-image");
    // sliderBgSetting.each(function (indx) {
    //   if ($(this).attr("data-background")) {
    //     $(this).css("background-image", "url(" + $(this).data("background") + ")");
    //   }
    // });
  }, []);

  return (
    <div className='slidebar'>
    <section class="hero-slider hero-style">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="slide-inner slide-bg-image1" data-background="https://images.unsplash.com/photo-1578934191836-ff5f608c2228?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80">
                <div class="container">
                    <div data-swiper-parallax="300" class="slide-title">
                    <h2>픽토그램</h2>
                    </div>
                    <div data-swiper-parallax="400" class="slide-text">
                    <p>Want to see your kid become more expressive?</p>
                    </div>
                    <div class="clearfix"></div>
                    <div data-swiper-parallax="500" class="slide-btns">
                    {/* <a href="#" class="theme-btn-s2">Register now</a>
                    <a href="#" class="theme-btn-s3"><i class="fas fa-chevron-circle-right"></i> Get Info</a> */}
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
    
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
</section>
</div>
  );
};

export default Lobby;