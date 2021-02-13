import React, { useEffect } from "react";
import Ads from "../../components/Ads";

export default function Homepage2() {
  useEffect(() => {
    function lerp({ x, y }, { x: targetX, y: targetY }) {
      const fraction = 0.1;

      x += (targetX - x) * fraction;
      y += (targetY - y) * fraction;

      return { x, y };
    }

    class Slider {
      constructor(el) {
        const imgClass = (this.IMG_CLASS = "slider__images-item");
        const textClass = (this.TEXT_CLASS = "slider__text-item");
        const activeImgClass = (this.ACTIVE_IMG_CLASS = `${imgClass}--active`);
        const activeTextClass = (this.ACTIVE_TEXT_CLASS = `${textClass}--active`);

        this.el = el;
        this.contentEl = document.getElementById("slider-content");
        this.onMouseMove = this.onMouseMove.bind(this);

        // taking advantage of the live nature of 'getElement...' methods
        this.activeImg = el.getElementsByClassName(activeImgClass);
        this.activeText = el.getElementsByClassName(activeTextClass);
        this.images = el.getElementsByTagName("img");

        document
          .getElementById("slider-dots")
          .addEventListener("click", this.onDotClick.bind(this));

        document
          .getElementById("left")
          .addEventListener("click", this.prev.bind(this));

        document
          .getElementById("right")
          .addEventListener("click", this.next.bind(this));

        window.addEventListener("resize", this.onResize.bind(this));

        this.onResize();

        this.length = this.images.length;
        this.lastX = this.lastY = this.targetX = this.targetY = 0;
      }
      onResize() {
        const htmlStyles = getComputedStyle(document.documentElement);
        const mobileBreakpoint = htmlStyles.getPropertyValue("--mobile-bkp");

        const isMobile = (this.isMobile = matchMedia(
          `only screen and (max-width: ${mobileBreakpoint})`
        ).matches);

        this.halfWidth = window.innerWidth / 2;
        this.halfHeight = window.innerHeight / 2;
        this.zDistance = htmlStyles.getPropertyValue("--z-distance");

        if (!isMobile && !this.mouseWatched) {
          this.mouseWatched = true;
          this.el.addEventListener("mousemove", this.onMouseMove);
          this.el.style.setProperty(
            "--img-prev",
            `url(${this.images[+this.activeImg[0].dataset.id - 1].src})`
          );
          this.contentEl.style.setProperty(
            "transform",
            `translateZ(${this.zDistance})`
          );
        } else if (isMobile && this.mouseWatched) {
          this.mouseWatched = false;
          this.el.removeEventListener("mousemove", this.onMouseMove);
          this.contentEl.style.setProperty("transform", "none");
        }
      }
      getMouseCoefficients({ pageX, pageY } = {}) {
        const halfWidth = this.halfWidth;
        const halfHeight = this.halfHeight;
        const xCoeff = ((pageX || this.targetX) - halfWidth) / halfWidth;
        const yCoeff = (halfHeight - (pageY || this.targetY)) / halfHeight;

        return { xCoeff, yCoeff };
      }
      onMouseMove({ pageX, pageY }) {
        this.targetX = pageX;
        this.targetY = pageY;

        if (!this.animationRunning) {
          this.animationRunning = true;
          this.runAnimation();
        }
      }
      runAnimation() {
        if (this.animationStopped) {
          this.animationRunning = false;
          return;
        }

        const maxX = 10;
        const maxY = 10;

        const newPos = lerp(
          {
            x: this.lastX,
            y: this.lastY,
          },
          {
            x: this.targetX,
            y: this.targetY,
          }
        );

        const { xCoeff, yCoeff } = this.getMouseCoefficients({
          pageX: newPos.x,
          pageY: newPos.y,
        });

        this.lastX = newPos.x;
        this.lastY = newPos.y;

        this.positionImage({ xCoeff, yCoeff });

        this.contentEl.style.setProperty(
          "transform",
          `
      translateZ(${this.zDistance})
      rotateX(${maxY * yCoeff}deg)
      rotateY(${maxX * xCoeff}deg)
    `
        );

        if (this.reachedFinalPoint) {
          this.animationRunning = false;
        } else {
          requestAnimationFrame(this.runAnimation.bind(this));
        }
      }
      get reachedFinalPoint() {
        const lastX = ~~this.lastX;
        const lastY = ~~this.lastY;
        const targetX = this.targetX;
        const targetY = this.targetY;

        return (
          (lastX === targetX || lastX - 1 === targetX || lastX + 1 === targetX) &&
          (lastY === targetY || lastY - 1 === targetY || lastY + 1 === targetY)
        );
      }
      positionImage({ xCoeff, yCoeff }) {
        const maxImgOffset = 1;
        const currentImage = this.activeImg[0].children[0];

        currentImage.style.setProperty(
          "transform",
          `
      translateX(${maxImgOffset * -xCoeff}em)
      translateY(${maxImgOffset * yCoeff}em)
    `
        );
      }
      onDotClick({ target }) {
        if (this.inTransit) return;

        const dot = target.closest(".slider__nav-dot");

        if (!dot) return;

        const nextId = dot.dataset.id;
        const currentId = this.activeImg[0].dataset.id;

        if (currentId === nextId) return;

        this.startTransition(nextId);
      }
      transitionItem(nextId) {
        function onImageTransitionEnd(e) {
          e.stopPropagation();

          nextImg.classList.remove(transitClass);

          self.inTransit = false;

          this.className = imgClass;
          this.removeEventListener("transitionend", onImageTransitionEnd);
        }

        const self = this;
        const el = this.el;
        const currentImg = this.activeImg[0];
        const currentId = currentImg.dataset.id;
        const imgClass = this.IMG_CLASS;
        const textClass = this.TEXT_CLASS;
        const activeImgClass = this.ACTIVE_IMG_CLASS;
        const activeTextClass = this.ACTIVE_TEXT_CLASS;
        const subActiveClass = `${imgClass}--subactive`;
        const transitClass = `${imgClass}--transit`;
        const nextImg = el.querySelector(`.${imgClass}[data-id='${nextId}']`);
        const nextText = el.querySelector(`.${textClass}[data-id='${nextId}']`);

        let outClass = "";
        let inClass = "";

        this.animationStopped = true;

        nextText.classList.add(activeTextClass);

        el.style.setProperty("--from-left", nextId);

        currentImg.classList.remove(activeImgClass);
        currentImg.classList.add(subActiveClass);

        if (currentId < nextId) {
          outClass = `${imgClass}--next`;
          inClass = `${imgClass}--prev`;
        } else {
          outClass = `${imgClass}--prev`;
          inClass = `${imgClass}--next`;
        }

        nextImg.classList.add(outClass);

        requestAnimationFrame(() => {
          nextImg.classList.add(transitClass, activeImgClass);
          nextImg.classList.remove(outClass);

          this.animationStopped = false;
          this.positionImage(this.getMouseCoefficients());

          currentImg.classList.add(transitClass, inClass);
          currentImg.addEventListener("transitionend", onImageTransitionEnd);
        });

        if (!this.isMobile) this.switchBackgroundImage(nextId);
      }
      startTransition(nextId) {
        function onTextTransitionEnd(e) {
          if (!e.pseudoElement) {
            e.stopPropagation();

            requestAnimationFrame(() => {
              self.transitionItem(nextId);
            });

            this.removeEventListener("transitionend", onTextTransitionEnd);
          }
        }

        if (this.inTransit) return;

        const activeText = this.activeText[0];
        const backwardsClass = `${this.TEXT_CLASS}--backwards`;
        const self = this;

        this.inTransit = true;

        activeText.classList.add(backwardsClass);
        activeText.classList.remove(this.ACTIVE_TEXT_CLASS);
        activeText.addEventListener("transitionend", onTextTransitionEnd);

        requestAnimationFrame(() => {
          activeText.classList.remove(backwardsClass);
        });
      }
      next() {
        if (this.inTransit) return;

        let nextId = +this.activeImg[0].dataset.id + 1;

        if (nextId > this.length) nextId = 1;

        this.startTransition(nextId);
      }
      prev() {
        if (this.inTransit) return;

        let nextId = +this.activeImg[0].dataset.id - 1;

        if (nextId < 1) nextId = this.length;

        this.startTransition(nextId);
      }
      switchBackgroundImage(nextId) {
        function onBackgroundTransitionEnd(e) {
          if (e.target === this) {
            this.style.setProperty("--img-prev", imageUrl);
            this.classList.remove(bgClass);
            this.removeEventListener(
              "transitionend",
              onBackgroundTransitionEnd
            );
          }
        }

        const bgClass = "slider--bg-next";
        const el = this.el;
        const imageUrl = `url(${this.images[+nextId - 1].src})`;

        el.style.setProperty("--img-next", imageUrl);
        el.addEventListener("transitionend", onBackgroundTransitionEnd);
        el.classList.add(bgClass);
      }
    }

    const sliderEl = document.getElementById("slider");
    const slider = new Slider(sliderEl);

    // ------------------ Demo stuff ------------------------ //

    let timer = 0;

    function autoSlide() {
      requestAnimationFrame(() => {
        slider.next();
      });

      timer = setTimeout(autoSlide, 1000);
    }

    function stopAutoSlide() {
      clearTimeout(timer);

      this.removeEventListener("touchstart", stopAutoSlide);
      this.removeEventListener("mousemove", stopAutoSlide);
    }

    sliderEl.addEventListener("mousemove", stopAutoSlide);
    sliderEl.addEventListener("touchstart", stopAutoSlide);

    timer = setTimeout(autoSlide, 2000);
  }, []);

  return (
    <section className="homepage2">
      <div
        className="slider"
        id="slider"
        // style="--img-prev:url(https://lh3.googleusercontent.com/aC9nyW5dhaYFmWD8fcf8DApjpH08eHEkbCHqmUPHRQ5T3jK-QyNKZYVMehmrvyPdEA_KxWvgZ3_kyOOYOAv99Ow3UoKSvEloleVKGSfLOwOyDV3Q6Dwi1G-NYoa9-t_ofmmskE6BYnVIOnIz2HWlMcijzIEwvKAL_R4z63DaLgG0z_OcGiSQHunwGAPXrBQUv42ZXuIMODq4zxDHczSxJ72b0-_udtdQK3JuT2X8nXCwFoF7GxmOpzXS0H5f50DuCbXoXcx-O7bgBMCXZdMpTxB27-wdXeLmxpYUySXgjSN2NAKmK16DmGLYvw5tMlrqwb8h4MJEEbXjP1pjPxXsahb7UZseEGyn80uLjATANJvusyJWCtzkkxYXPz-yI1rDvfEJKe2eyA-5AvFlzFBSwBMASn8f7mXinUrXMMREkJQjoi89NfZ91G7253OEVQOqcWxddiYtcHCO5v6Pl3QfV2SUTWXgggscDSY2ezjSPpYERNTXnIM_aCyWmIG7ybrfqOB0eVYBAgynyuPVbjd4KuZWZq2Dfu33HX1RuPKglbOuZGD1QbpJnruvUVkAmjDXI40ENN7X=w1600-h766);"
      >
        <div className="slider__content" id="slider-content">
          <div className="slider__images">
            <div
              className="slider__images-item slider__images-item--active"
              data-id="1"
            >
              <img
                src="https://i.pinimg.com/originals/cf/df/22/cfdf2282a9534e774a47bae5be535ceb.jpg"
                alt=""
              />
            </div>
            <div className="slider__images-item" data-id="2">
              <img
                src="https://img.freepik.com/free-photo/professional-mechanic-uniform-is-check-quality-new-car-engine-oil-before-delivering-customers-while-working-car-repair-center_61243-665.jpg?size=626&ext=jpg&ga=GA1.2.1153051939.1598227200"
                alt=""
              />
            </div>
            <div className="slider__images-item" data-id="3">
              <img src="https://wallpaperaccess.com/full/811596.jpg" alt="" />
            </div>
            <div className="slider__images-item" data-id="4">
              <img
                src="https://cdn.hipwallpaper.com/i/65/55/OCoh1G.jpg"
                alt=""
              />
            </div>
            <div className="slider__images-item" data-id="5">
              <img src="https://wallpaperaccess.com/full/122375.jpg" alt="" />
            </div>
          </div>
          <div className="slider__text">
            <div
              className="slider__text-item slider__text-item--active"
              data-id="1"
            >
              <div className="slider__text-item-head">
                <h3>Car parts</h3>
              </div>
              <div className="slider__text-item-info">
                <p>“Find the right car part with ease”</p>
              </div>
            </div>
            <div className="slider__text-item" data-id="2">
              <div className="slider__text-item-head">
                <h3>Quality</h3>
              </div>
              <div className="slider__text-item-info">
                <p>“We value quality above all else”</p>
              </div>
            </div>
            <div className="slider__text-item" data-id="3">
              <div className="slider__text-item-head">
                <h3>Variety</h3>
              </div>
              <div className="slider__text-item-info">
                <p>“We have a variety of options for you to explore”</p>
              </div>
            </div>
            <div className="slider__text-item" data-id="4">
              <div className="slider__text-item-head">
                <h3>Technology</h3>
              </div>
              <div className="slider__text-item-info">
                <p>“Futuristic features to enjoy”</p>
              </div>
            </div>
            <div className="slider__text-item" data-id="5">
              <div className="slider__text-item-head">
                <h3>Design</h3>
              </div>
              <div className="slider__text-item-info">
                <p>“Modern design to make you feel at home”</p>
              </div>
            </div>
          </div>
        </div>
        <div className="slider__nav">
          <div className="slider__nav-arrows">
            <div
              className="slider__nav-arrow slider__nav-arrow--left"
              id="left"
            >
              to left
            </div>
            <div
              className="slider__nav-arrow slider__nav-arrow--right"
              id="right"
            >
              to right
            </div>
          </div>
          <div className="slider__nav-dots" id="slider-dots">
            <div
              className="slider__nav-dot slider__nav-dot--active"
              data-id="1"
            ></div>
            <div className="slider__nav-dot" data-id="2"></div>
            <div className="slider__nav-dot" data-id="3"></div>
            <div className="slider__nav-dot" data-id="4"></div>
            <div className="slider__nav-dot" data-id="5"></div>
          </div>
        </div>
      </div>
      <Ads
        class="pater"
        link="http://go.thoughtleaders.io/SenchaCodrops141117"
        imgSrc="../../assets/Images/logo.svg"
        hoverImgSrc="../../assets/Images/sencha.png"
      />
    </section>
  );
}
