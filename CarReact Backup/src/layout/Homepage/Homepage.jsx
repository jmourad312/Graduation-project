/* eslint-disable no-undef */
import React, { useEffect } from "react";
import image1 from "../../assets/Images/13.jpg";
import image2 from "../../assets/Images/14.jpg";
import image3 from "../../assets/Images/15.jpg";
import image4 from "../../assets/Images/16.jpg";
import { Helmet } from "react-helmet";

export default function Homepage() {
    useEffect(() => {
        
{
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
    };
    
    class Slideshow {
        constructor(el) {
            this.DOM = {};
            this.DOM.el = el;
            this.settings = {
                animation: {
                    slides: {
                        duration: 500,
                        easing: 'easeOutQuint'
                    },
                    shape: {
                        duration: 300,
                        easing: {in: 'easeOutQuint', out: 'easeOutQuad'}
                    }
                },
                frameFill: 'url(#gradient1)'
            }
            this.init();
        }
        init() {
            this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slides--images > .slide'));
            this.slidesTotal = this.DOM.slides.length;
            this.DOM.nav = this.DOM.el.querySelector('.slidenav');
            this.DOM.titles = this.DOM.el.querySelector('.slides--titles');
            this.DOM.titlesSlides = Array.from(this.DOM.titles.querySelectorAll('.slide'));
            this.DOM.nextCtrl = this.DOM.nav.querySelector('.slidenav__item--next');
            this.DOM.prevCtrl = this.DOM.nav.querySelector('.slidenav__item--prev');
            this.current = 0;
            this.createFrame(); 
            this.initEvents();
        }
        createFrame() {
            this.rect = this.DOM.el.getBoundingClientRect();
            this.frameSize = this.rect.width/12;
            this.paths = {
                initial: this.calculatePath('initial'),
                final: this.calculatePath('final')
            };
            this.DOM.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.DOM.svg.setAttribute('class', 'shape');
            this.DOM.svg.setAttribute('width','100%');
            this.DOM.svg.setAttribute('height','100%');
            this.DOM.svg.setAttribute('viewbox',`0 0 ${this.rect.width} ${this.rect.height}`);
            this.DOM.svg.innerHTML = `
            <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#09012d"/>
                <stop offset="100%" stop-color="#0f2b73"/>
            </linearGradient>
            </defs>
            <path fill="${this.settings.frameFill}" d="${this.paths.initial}"/>`;
            this.DOM.el.insertBefore(this.DOM.svg, this.DOM.titles);
            this.DOM.shape = this.DOM.svg.querySelector('path');
        }
        updateFrame() {
            this.paths.initial = this.calculatePath('initial');
            this.paths.final = this.calculatePath('final');
            this.DOM.svg.setAttribute('viewbox',`0 0 ${this.rect.width} ${this.rect.height}`);
            this.DOM.shape.setAttribute('d', this.isAnimating ? this.paths.final : this.paths.initial);
        }
        calculatePath(path = 'initial') {

            if ( path === 'initial' ) {
                return `M 0,0 0,${this.rect.height} ${this.rect.width},${this.rect.height} ${this.rect.width},0 0,0 Z M 0,0 ${this.rect.width},0 ${this.rect.width},${this.rect.height} 0,${this.rect.height} Z`;
            }
            else {
                const point1 = {x: this.rect.width/4-50, y: this.rect.height/4+50};
                const point2 = {x: this.rect.width/4+50, y: this.rect.height/4-50};
                const point3 = {x: this.rect.width-point2.x, y: this.rect.height-point2.y};
                const point4 = {x: this.rect.width-point1.x, y: this.rect.height-point1.y};

                return `M 0,0 0,${this.rect.height} ${this.rect.width},${this.rect.height} ${this.rect.width},0 0,0 Z M ${point1.x},${point1.y} ${point2.x},${point2.y} ${point4.x},${point4.y} ${point3.x},${point3.y} Z`;
            }
        }
        initEvents() {
            this.DOM.nextCtrl.addEventListener('click', () => this.navigate('next'));
            this.DOM.prevCtrl.addEventListener('click', () => this.navigate('prev'));
            
            window.addEventListener('resize', debounce(() => {
                this.rect = this.DOM.el.getBoundingClientRect();
                this.updateFrame();
            }, 20));
            
            document.addEventListener('keydown', (ev) => {
                const keyCode = ev.keyCode || ev.which;
                if ( keyCode === 37 ) {
                    this.navigate('prev');
                }
                else if ( keyCode === 39 ) {
                    this.navigate('next');
                }
            });
        }
        navigate(dir = 'next') {
            if ( this.isAnimating ) return false;
            this.isAnimating = true;

            const animateShapeIn = anime({
                targets: this.DOM.shape,
                duration: this.settings.animation.shape.duration,
                easing: this.settings.animation.shape.easing.in,
                d: this.paths.final
            });

            const animateSlides = () => {
                return new Promise((resolve, reject) => {
                    const currentSlide = this.DOM.slides[this.current];
                    anime({
                        targets: currentSlide,
                        duration: this.settings.animation.slides.duration,
                        easing: this.settings.animation.slides.easing,
                        translateY: dir === 'next' ? this.rect.height : -1*this.rect.height,
                        complete: () => {
                            currentSlide.classList.remove('slide--current');
                            resolve();
                        }
                    });

                    const currentTitleSlide = this.DOM.titlesSlides[this.current];
                    anime({
                        targets: currentTitleSlide.children,
                        duration: this.settings.animation.slides.duration,
                        easing: this.settings.animation.slides.easing,
                        delay: (t,i,total) => dir === 'next' ? i*100 : (total-i-1)*100,
                        translateY: [0, dir === 'next' ? 100 : -100],
                        opacity: [1,0],
                        complete: () => {
                            currentTitleSlide.classList.remove('slide--current');
                            resolve();
                        }
                    });
        
                    this.current = dir === 'next' ? 
                        this.current < this.slidesTotal-1 ? this.current + 1 : 0 :
                        this.current > 0 ? this.current - 1 : this.slidesTotal-1; 
                    
                    const newSlide = this.DOM.slides[this.current];
                    newSlide.classList.add('slide--current');
                    anime({
                        targets: newSlide,
                        duration: this.settings.animation.slides.duration,
                        easing: this.settings.animation.slides.easing,
                        translateY: [dir === 'next' ? -1*this.rect.height : this.rect.height,0]
                    });
        
                    const newSlideImg = newSlide.querySelector('.slide__img');
                    
                    anime.remove(newSlideImg);
                    anime({
                        targets: newSlideImg,
                        duration: this.settings.animation.slides.duration*3,
                        easing: this.settings.animation.slides.easing,
                        translateY: [dir === 'next' ? -100 : 100, 0],
                        scale: [0.2,1]
                    });
                    
                    const newTitleSlide = this.DOM.titlesSlides[this.current];
                    newTitleSlide.classList.add('slide--current');
                    anime({
                        targets: newTitleSlide.children,
                        duration: this.settings.animation.slides.duration*1.5,
                        easing: this.settings.animation.slides.easing,
                        delay: (t,i,total) => dir === 'next' ? i*100+100 : (total-i-1)*100+100,
                        translateY: [dir === 'next' ? -100 : 100 ,0],
                        opacity: [0,1]
                    });
                });
            };

            const animateShapeOut = () => {
                anime({
                    targets: this.DOM.shape,
                    duration: this.settings.animation.shape.duration,
                    easing: this.settings.animation.shape.easing.out,
                    d: this.paths.initial,
                    complete: () => this.isAnimating = false
                });
            }

            animateShapeIn.finished.then(animateSlides).then(animateShapeOut);
        }
    };

    new Slideshow(document.querySelector('.slideshow'));
    imagesLoaded('.slide__img', { background: true }, () => document.body.classList.remove('loading'));
};
    }, [])
  return (
    <div className="homePage">
      <section className="demo-6 loading">
        {/* <!-- <svg className="hidden">
          <symbol id="icon-arrow" viewBox="0 0 24 24">
              <title>arrow</title>
              <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 " />
          </symbol>
          <symbol id="icon-drop" viewBox="0 0 24 24">
              <title>drop</title>
              <path
                  d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z" />
              <path
                  d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z" />
          </symbol>
          <symbol id="icon-github" viewBox="0 0 32.6 31.8">
              <title>github</title>
              <path
                  d="M16.3,0C7.3,0,0,7.3,0,16.3c0,7.2,4.7,13.3,11.1,15.5c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4C7.4,10.7,6.8,9,7.7,6.8c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C32.6,7.3,25.3,0,16.3,0z" />
          </symbol>
      </svg> --> */}
        {/* <div className="content content--fixed"> */}
        {/* <!-- <header className="codrops-header">
                  <div className="codrops-links">
                      <a className="codrops-icon codrops-icon--prev"
                          href="https://tympanus.net/Development/ExpandingGridItemAnimation/" title="Previous Demo"><svg
                              className="icon icon--arrow">
                              <use xlink:href="#icon-arrow"></use>
                          </svg></a>
                      <a className="codrops-icon codrops-icon--drop" href="https://tympanus.net/codrops/?p=33037"
                          title="Back to the article"><svg className="icon icon--drop">
                              <use xlink:href="#icon-drop"></use>
                          </svg></a>
                  </div>
                  <h1 className="codrops-header__title">Animated Frame Slideshow</h1>
              </header>
              <a className="github" href="https://github.com/codrops/AnimatedFrameSlideshow/"
                  title="Find this project on GitHub"><svg className="icon icon--github">
                      <use xlink:href="#icon-github"></use>
                  </svg></a> --> */}
        {/* <!-- <nav className="demos">
                  <svg className="icon icon--keyboard">
                      <use xlink:href="#icon-keyboard"></use>
                  </svg>
                  <a className="demo" href="index.html"><span>Demo 1</span></a>
                  <a className="demo" href="index2.html"><span>Demo 2</span></a>
                  <a className="demo" href="index3.html"><span>Demo 3</span></a>
                  <a className="demo" href="index4.html"><span>Demo 4</span></a>
                  <a className="demo" href="index5.html"><span>Demo 5</span></a>
                  <a className="demo demo--current" href="index6.html"><span>Demo 6</span></a>
              </nav> --> */}

        {/* <!-- --------------------------- ADS ---------------------- --> */}
        {/* <a
            href="http://go.thoughtleaders.io/SenchaCodrops141117"
            rel="nofollow"
            className="pater"
            onClick="recordOutboundLink(this, 'Outbound Links', 'SenchaCodrops141117');return false;"
          >
            <img
              className="pater__logo"
              src="../../../../assets/Images/logo.svg"
              alt="Sencha Logo"
            />
            <h2 className="pater__title">
              Sencha Ext JS: Build an App, Not a Framework
            </h2>
            <div className="pater__img-wrap">
              <img
                className="pater__img"
                src="../../../../assets/Images/sencha.png"
                alt="Sencha Creative"
              />
            </div>
          </a>
        </div> */}

        {/* <!-- ----------------------Slide show+---- --> */}
        <div className="slideshow">
          <div className="slides slides--images">
            <div className="slide slide--current">
              <div
                className="slide__img"
                style={{
                  backgroundImage: `url(${image1})`,
                }}
              ></div>
            </div>
            <div className="slide">
              <div
                className="slide__img"
                style={{
                  backgroundImage: `url(${image2})`,
                }}
              ></div>
            </div>
            <div className="slide">
              <div
                className="slide__img"
                style={{
                  backgroundImage: `url(${image3})`,
                }}
              ></div>
            </div>
            <div className="slide">
              <div
                className="slide__img"
                style={{
                  backgroundImage: `url(${image4})`,
                }}
              ></div>
            </div>
          </div>
          <div className="slides slides--titles">
            <div className="slide slide--current">
              <h2 className="slide__title">Innovate</h2>
            </div>
            <div className="slide">
              <h2 className="slide__title">Discover</h2>
            </div>
            <div className="slide">
              <h2 className="slide__title">Design</h2>
            </div>
            <div className="slide">
              <h2 className="slide__title">Create</h2>
            </div>
            <div className="slide">
              <h2 className="slide__title">Invent</h2>
            </div>
          </div>
          <nav className="slidenav mb-5">
            <button className="slidenav__item slidenav__item--prev">
              Previous
            </button>
            <span>/</span>
            <button className="slidenav__item slidenav__item--next">
              Next
            </button>
          </nav>
        </div>
      </section>
      {/* <Helmet>
        <script type="text/javascript" src="../../assets/scripts/demo.js" />
        <script
          type="text/javascript"
          src="../../assets/scripts/imagesloaded.pkgd.min.js"
        />
        <script
          type="text/javascript"
          src="../../assets/scripts/anime.min.js"
        />
        <script type="text/javascript" src="../../assets/scripts/demo6.js" />
        <script type="text/javascript" src="../../assets/scripts/custom.js" />
      </Helmet> */}
    </div>
  );
}
