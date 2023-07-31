import React, { useEffect } from "react";
import imagesLoaded from "imagesloaded";
import { gsap } from "gsap";
// import "./Lobby3.scss"

const Lobby = () => {
    useEffect(() => {
        // 이미지 로딩 후 애니메이션 시작
        const imageLoader = imagesLoaded(document.querySelector(".slider"));
        imageLoader.on("done", () => {
          const tl = gsap.timeline({ delay: 1 });
          const firstBg = document.querySelectorAll(".text__first-bg");
          const secBg = document.querySelectorAll(".text__second-bg");
          const word = document.querySelectorAll(".text__word");
    
          tl.to(firstBg, 0.2, { scaleX: 1 }).to(secBg, 0.2, { scaleX: 1 }).to(word, 0.1, { opacity: 1 }, "-=0.1").to(firstBg, 0.2, { scaleX: 0 }).to(secBg, 0.2, { scaleX: 0 });
    
          const tl2 = gsap.timeline({ delay: 1 });
          tl2
            .to(".text__word", 0.1, { opacity: 0 })
            .to(".slider image", 0.2, { scale: 1 }, "-=0.1")
            .to(".slider", 0.9, { ease: "circ.out", top: 100, left: 120, right: 120, bottom: 100 }, "-=0.2")
            .to(".slider", 0.75, { ease: "elastic.out(4, 1.5)", top: -5, left: -5, right: -5, bottom: -5 })
            .pause();
        });
      }, []);

    return (
        <div class="app">
        <div class="portfolio slider-wrapper">
            <ul class="slider" data-step1="M1402,800h-2V0h1c0.6,0,1,0.4,1,1V800z" data-step2="M1400,800H379L771.2,0H1399c0.6,0,1,0.4,1,1V800z" data-step3="M1400,800H0V0h1399c0.6,0,1,0.4,1,1V800z" data-step4="M-2,800h2V0h-1c-0.6,0-1,0.4-1,1V800z" data-step5="M0,800h1021L628.8,0L1,0C0.4,0,0,0.4,0,1L0,800z" data-step6="M0,800h1400V0L1,0C0.4,0,0,0.4,0,1L0,800z">

            <li class="visible">
                <div class="svg-wrapper">
                    <svg viewBox="0 0 1400 800">
                        <defs>
                            <clipPath id="image-1">
                                <path id="changing-path-1" d="M1400,800H0V0h1399c0.6,0,1,0.4,1,1V800z"/>
                            </clipPath>             
                        </defs>           
                        <image height='100%' width="100%" clip-path="url(#image-1)" href="https://alikinvv.github.io/svg-mask-slider/img/2.jpg"></image>
                        <div class="slider__info">
                            <p class="slider__title text">
                                <span class="text__first">
                                    <span class="text__word">News</span>
                                    <span class="text__first-bg" style={{backgroundColor: "#3A7E94"}}></span>
                                </span>
                            </p>
                            <p class="slider__desc text">
                                <span class="text__second">
                                    <span class="text__word">BBC News provides trusted World and UK news as well <br/> as local and regional perspectives. </span>
                                    <span class="text__second-bg" style={{backgroundColor: "#3A7E94"}}></span>
                                </span>
                            </p>
                        </div>
                        <div class="slider__link cd-slider-navigation">
                            <a href="#0" class="next-slide slider__site text">
                                <span class="text__first">
                                    <span class="text__word">Visit bbc.com <img class="arrow" src="https://alikinvv.github.io/svg-mask-slider/img/arrow.svg" alt=""/></span>
                                    <span class="text__first-bg" style={{backgroundColor: "#3A7E94"}}></span>
                                </span>
                            </a>
                            <p class="slider__visit text">
                                <span class="text__second">
                                    <span class="text__word">Official website</span>
                                    <span class="text__second-bg" style={{backgroundColor: "#E688A1"}}></span>
                                </span>
                            </p>
                        </div>
                    </svg>
                </div>
            </li>

            <li>
                <div class="svg-wrapper">
                    <svg viewBox="0 0 1400 800">
                        <defs>
                            <clipPath id="image-2">
                                <path id="changing-path-2" d="M1400,800H0V0h1399c0.6,0,1,0.4,1,1V800z"/>
                            </clipPath>
                        </defs>
                        <image height='100%' width="100%" clip-path="url(#image-2)" href="https://alikinvv.github.io/svg-mask-slider/img/1.jpg"></image>  
                        
                        <div class="slider__info">
                            <p class="slider__title text">
                                <span class="text__first">
                                    <span class="text__word">Search</span>
                                    <span class="text__first-bg" style={{backgroundColor: "#3A7E94"}}></span>
                                </span>
                            </p>
                            <p class="slider__desc text">
                                <span class="text__second">
                                    <span class="text__word">Search the world's information, including webpages, images, videos and more. <br/> Google has many special features.</span>
                                    <span class="text__second-bg" style={{backgroundColor: "#3A7E94"}}></span>
                                </span>
                            </p>

                        </div>
                        <div class="slider__link cd-slider-navigation">
                            <a href="#0" class="next-slide slider__site text">
                                <span class="text__first">
                                    <span class="text__word">Visit google.com<img class="arrow" src="https://alikinvv.github.io/svg-mask-slider/img/arrow.svg" alt=""/></span>
                                    <span class="text__first-bg" style={{backgroundColor: "#3A7E94"}}></span>
                                </span>
                            </a>
                            <p class="slider__visit text">
                                <span class="text__second">
                                    <span class="text__word">Official website</span>
                                    <span class="text__second-bg" style={{backgroundColor: "#3A7E94"}}></span>
                                </span>
                            </p>
                        </div>        
                    </svg>

                </div>
            </li>

            <li>
                <div class="svg-wrapper">
                    <svg viewBox="0 0 1400 800">
                        <defs>
                            <clipPath id="image-3">
                                <path id="changing-path-3" d="M1400,800H0V0h1399c0.6,0,1,0.4,1,1V800z"/>
                            </clipPath>
                        </defs>
                        <image height='100%' width="100%" clip-path="url(#image-3)" href="https://alikinvv.github.io/svg-mask-slider/img/3.jpg"></image>  
                        
                        <div class="slider__info">
                            <p class="slider__title text">
                                <span class="text__first">
                                    <span class="text__word">BBC</span>
                                    <span class="text__first-bg" style={{backgroundColor: "#3A7E94"}}></span>
                                </span>
                            </p>
                            <p class="slider__desc text">
                                <span class="text__second">
                                    <span class="text__word">BBC News provides trusted World and UK news as well <br/> as local and regional perspectives. </span>
                                    <span class="text__second-bg" style={{backgroundColor: "#3A7E94"}}></span>
                                </span>
                            </p>
                        </div>
                        <div class="slider__link cd-slider-navigation">
                            <a href="#0" class="next-slide slider__site text">
                                <span class="text__first">
                                    <span class="text__word">Visit bbc.com<img class="arrow" src="https://alikinvv.github.io/svg-mask-slider/img/arrow.svg" alt=""/></span>
                                    <span class="text__first-bg" style={{backgroundColor: "#3A7E94"}}></span>
                                </span>
                            </a>
                            <p class="slider__visit text">
                                <span class="text__second">
                                    <span class="text__word">Official website</span>
                                    <span class="text__second-bg" style={{backgroundColor: "#3A7E94"}}></span>
                                </span>
                            </p>
                        </div>      
                    </svg>

                </div> 
            </li>

        </ul> 

        <ol class="slider-controls">
            <li class="selected"><a href="#0"><em>Item 1</em></a></li>
            <li><a href="#0"><em>Item 2</em></a></li>
            <li><a href="#0"><em>Item 2</em></a></li>

        </ol> 
    </div>
</div>






  );
};

export default Lobby;