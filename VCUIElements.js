/**
 * UI Elements Module
 * Author: Thien Vu
 */
class UIElements_VaoCa {
  constructor() {
    this._injectStyles();
    this._createPopupContainers();
    this._createAlertContainer();
    this._createLoadingScreen();
    this._createFullscreenImageOverlay();
    this._setupGlobalImageClickListener();
  }

  _injectStyles() {
    const styleId = "vc-vu-ui-styles";
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
            .VC-Vu-component-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.2);
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(2px);
                justify-content: center;
                display: flex;
                align-items: center;
                z-index: 9950;
                opacity: 0;
                pointer-events: none;
                transform: scale(0.95) translateY(10px);
                transition: all 0.3s ease;
            }

            .VC-Vu-component-overlay.active {
                opacity: 1;
                pointer-events: auto;
                transform: scale(1) translateY(0);
            }

            .VC-Vu-popup {
                width: 80%; 
                max-width: 450px; 
                min-width: 350px; 
                background-color: rgba(255, 255, 255, 1);
                border: 1px solid rgba(255, 255, 255, 1);
                border-radius: 32px;
                padding: 3rem 1.5rem;
                padding-bottom: 1.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                text-align: center;
                transition: transform 0.3s ease-out, opacity 0.3s ease-out;
                position: relative; 
                z-index: 9999;
            }


            .VC-Vu-popup .exitBtn {
                position: absolute;
                top: 20px;
                right: 20px;
                box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.08);
                background-color: rgb(255, 255, 255);
                border-radius: 50%;
                width: 40px;
                height: 40px;
                border: none;
                color: black;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0px !important;
            }

            .Vu-VC-popup-icon {
                transform: scale(1.2);
                margin-top: 10px;
                margin-bottom: 10px;
            }
            .Vu-VC-popup-icon svg {
                width: 80px; 
                height: auto;
                vertical-align: middle;
            }

            .VC-Vu-popup h2 {
                margin: 0 0 1rem;
                font-size: 1.2rem; 
                font-weight: bold;
                color: #004c39;
            }

            .VC-Vu-popup p {
                font-size: 0.7rem;
                margin-top: 2rem;
                margin-bottom: 0.5rem;
                line-height: 1.2;
            }

            .VC-Vu-popup-buttons {
                display: flex;
                justify-content: center; 
                gap: 20px;
                width: 100%;
                margin-top: 10px;
            }

            .VC-Vu-popup-buttons button {
                padding: 0.4rem 2rem;
                border: none;
                border-radius: 32px;
                cursor: pointer;
                font-weight: bold;
                width: 40%;
                transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                font-size: 0.9rem;
            }

            .VC-Vu-btn-cancel {
                background-color: #E6F4F1;
                color: #004c39;
            }

            .VC-Vu-btn-ok {
                background-color: #004c39;
                color: white;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            }
            .VC-Vu-btn-ok:hover {
                background-color: #E6F4F1;
                color: #004c39;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            }

            /* NEW: Style for the third button */
            .VC-Vu-btn-third {
                background-color: #f0ad4e; /* Example color for a warning/neutral third option */
                color: white;
            }
            .VC-Vu-btn-third:hover {
                background-color: #ec971f;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            }

            /* Responsive adjustments for popups */
            @media (max-width: 768px) {
                .VC-Vu-popup-buttons button {
                    width: 100%;
                }
            }

            #vc-vu-alert-container {
                position: fixed;
                bottom: 80px;
                right: 10px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                z-index: 10000; 
                width: calc(100% - 20px);
            }

            .alertFastMessgeByVu {
                width: 80%;
                padding: 12px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: start;
                border-radius: 50px;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                position: relative;
                opacity: 0;
                transform: translateX(100%);
                animation: fadeInRight 0.3s ease-out forwards, fadeOut 0.5s ease-in forwards 4.5s;
                pointer-events: all; 
                backdrop-filter: blur(12px) brightness(1.2);
                --webkit-backdrop-filter: blur(12px);
            }

            @keyframes fadeInRight {
                from { opacity: 0; transform: translateX(100%); }
                to { opacity: 1; transform: translateX(0); }
            }

            @keyframes fadeOut {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(100%); }
            }

            .alertFastMessgeByVu .iconAlert {
                width: 24px;
                height: 24px;
                margin-right: 10px;
                flex-shrink: 0; 
            }

            .alertFastMessgeByVu .iconAlert svg {
                width: 100%;
                height: 100%;
            }

            .alertFastMessgeByVu .iconAlert path {
                fill: #fff;
            }

            .alertFastMessgeByVu.error {
                background: rgba(209, 13, 13, 0.7);
                box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);;
            }

            .alertFastMessgeByVu.success {
                background: rgba(38, 155, 36, .7);
                box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
            }

            .alertFastMessgeByVu.notice {
                background: rgba(80, 154, 248, .7);
                box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
            }

            .alertFastMessgeByVu.warning {
                background-color: rgba(247, 199, 82, .7);
                box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
            }
            .alertFastMessgeByVu.warning .iconAlert path {
                fill: #333; 
            }
            .alertFastMessgeByVu.warning .alertMessage {
                color: #333;
            }

            .alertMessage {
                font-weight: 500;
                font-size: 0.8rem;
                color: #fff;
                flex-grow: 1;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            @media (max-width: 480px) {
                #vc-vu-alert-container {
                    bottom: 70px;
                    right: 10px;
                    left: 10px; 
                    align-items: center;
                }
                .alertFastMessgeByVu {
                    width: calc(100% - 20px); 
                }
            }

                .VC-Vu-component-loading {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    display: flex;
                    width: 190px;
                    height: 190px;
                    padding: 30px;
                    border-radius: 40px;
                    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
                    background-color: rgba(0, 0, 0, 0.6);
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    z-index: 9999;
                    backdrop-filter: blur(2px);
                    --webkit-backdrop-filter: blur(2px);
                    opacity: 0;
                    pointer-events: none;
                    transform: translate(-50%, -50%) scale(0.95) translateY(10px);
                    transition: all 0.3s ease;
                }

                 .VC-Vu-component-loading.active {
                      opacity: 1;
                      pointer-events: auto;
                      transform: translate(-50%, -50%) scale(1) translateY(0);
                  }

                .VC-Vu-component-loading .loadMessage {
                    color: #fff;
                    font-size: 0.6rem;
                    margin-top: 10px;
                    text-align: center;
                }

                 .loaderVu {
                    overflow: visible;
                    height: fit-content;
                    width: fit-content;
                    padding: 0px 20px;
                    padding-bottom: 0px;
                    display: flex;
                }

                .logoVu {
                    fill: none;
                    stroke-dasharray: 50px;
                    stroke-width: 0.5px;
                    stroke: #fff;
                    animation: load 3s infinite linear;
                }

                @keyframes load {
                    0% {
                        stroke-dashoffset: 0px;
                    }

                    100% {
                        stroke-dashoffset: 200px;
                    }
                }

                #fullscreenImageOverlay {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0, 0, 0, 0.95);
                  display: none;
                  justify-content: center;
                  align-items: center;
                  z-index: 2000;
                  animation: fadeIn 0.3s ease-out;
                  backdrop-filter: blur(2px) brightness(1.2);
                  -webkit-backdrop-filter: blur(2px);
                  -webkit-overflow-scrolling: touch;
                  overscroll-behavior: contain;
                  touch-action: manipulation;
                  -webkit-touch-callout: none;
                  -webkit-user-select: none;
                  -khtml-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                }

                /* Mobile specific optimizations */
                @media (max-width: 768px) {
                  #fullscreenImageOverlay {
                    background-color: rgba(0, 0, 0, 0.98);
                    backdrop-filter: none;
                    -webkit-backdrop-filter: none;
                    height: 100vh;
                    height: 100dvh; /* Dynamic viewport height for mobile */
                    width: 100vw;
                    overflow: hidden;
                    position: fixed;
                    -webkit-transform: translateZ(0);
                    transform: translateZ(0);
                    will-change: auto;
                  }
                }

                #fullscreenImageOverlay.active {
                    display: flex;
                }

                #fullscreenImage {
                  max-width: 100%;
                  max-height: 100%;
                  width: auto;
                  height: auto;
                  object-fit: contain;
                  cursor: pointer;
                  border-radius: 16px;
                  image-rendering: -webkit-optimize-contrast;
                  image-rendering: crisp-edges;
                  image-rendering: pixelated;
                  -webkit-touch-callout: none;
                  -webkit-user-select: none;
                  -khtml-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                  transition: transform 0.3s ease;
                  transform-origin: center center;
                  will-change: transform;
                }

                /* Responsive optimizations for mobile */
                @media (max-width: 768px) {
                  #fullscreenImage {
                    max-width: 100vw;
                    max-height: 100vh;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    image-rendering: -webkit-optimize-contrast;
                    image-rendering: high-quality;
                    -webkit-optimize-contrast: auto;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    perspective: 1000px;
                    -webkit-perspective: 1000px;
                  }
                }

                /* High DPI display optimization */
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
                  #fullscreenImage {
                    image-rendering: -webkit-optimize-contrast;
                    image-rendering: crisp-edges;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                  }
                }

                #closeImageOverlay {
                  position: absolute;
                  top: 20px;
                  right: 20px;
                  background-color: rgba(255, 255, 255, 0.3);
                  color: white;
                  border: none;
                  border-radius: 60px;
                  width: 50px;
                  height: 50px;
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  z-index: 2001;
                  transition: background-color 0.2s;
                }

                #closeImageOverlay svg {
                  width: 40px;
                  height: 40px;
                }

                #closeImageOverlay:hover {
                  background-color: rgba(255, 255, 255, 0.5);
                }

                /* Keyframe cho hiệu ứng fadeIn */
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }

                  to {
                    opacity: 1;
                  }
                }

                #imageActionButtons {
                  position: absolute;
                  bottom: 20px;
                  left: 20px;
                  display: flex;
                  gap: 16px;
                  /* Space between buttons */
                  z-index: 2001;
                  border: 1px solid rgba(255, 255, 255, 0.4);
                  padding: 8px 12px;
                  border-radius: 30px;
                  height: 3.6rem;
                }

                .image-action-btn {
                  background-color: rgba(255, 255, 255, 0.2);
                  color: white;
                  border: none;
                  border-radius: 50%;
                  /* Circular buttons */
                  width: 36px;
                  height: 36px;
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  transition: background-color 0.2s;
                }

                .image-action-btn:hover {
                  background-color: rgba(255, 255, 255, 0.5);
                }

                .image-action-btn svg {
                  width: 20px;
                  /* Icon size */
                  height: 20px;
                  fill: white;
                }

                #fullscreenImageLogo {
                  position: absolute;
                  bottom: 20px;
                  right: 20px;
                  width: 80px;
                  /* Adjust as needed */
                  height: auto;
                  opacity: 0.7;
                  /* Make it slightly transparent */
                  z-index: 2001;

                }

                /* Keyframe cho hiệu ứng fadeIn */
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }

                  to {
                    opacity: 1;
                  }
                }

                #fullscreenLogoContainer {
                  position: absolute;
                  bottom: 20px;
                  right: 20px;
                  display: flex;
                  width: 40%;
                  border: 1px solid rgba(255, 255, 255, 0.4);
                  padding: 8px 10px;
                  /* Use flexbox for alignment */
                  align-items: center;
                  justify-content: space-around;
                  border-radius: 40px;
                  /* Vertically align items */
                  gap: 8px;
                  height: 3.6rem;
                  /* Space between logos and divider */
                  z-index: 2001;
                  background-color: rgba(255, 255, 255, 0.1);
                   backdrop-filter: blur(8px) brightness(1.2);
                --webkit-backdrop-filter: blur(8px);
                }

                /* NEW: Styles for individual Logos */
                .fullscreen-logo {
                  transform: scale(0.8);
                }

                /* NEW: Styles for the Divider */
                .fullscreen-logo-divider {
                  width: 1px;
                  /* Độ rộng của đường ngăn */
                  height: 40px;
                  /* Chiều cao của đường ngăn, có thể điều chỉnh */
                  background-color: rgba(255, 255, 255, 0.5);
                }
        `;
    document.head.appendChild(style);
  }

  /**
   * Creates and appends the main popup overlay elements to the body.
   */
  _createPopupContainers() {
    // Confirm Popup
    this.confirmPopupOverlay = document.createElement("div");
    this.confirmPopupOverlay.id = "vc-vu-confirm-popup";
    this.confirmPopupOverlay.classList.add("VC-Vu-component-overlay");
    this.confirmPopupOverlay.innerHTML = `
            <div class="VC-Vu-popup">
                <button class="exitBtn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
              </svg>
                </button>
                <h2 class="vc-popup-title"></h2>
                <div class="Vu-VC-popup-icon"></div>
                <p class="vc-popup-content"></p>
                <div class="VC-Vu-popup-buttons">
                    <button class="VC-Vu-btn-cancel vc-btn-cancel">Hủy</button>
                    <button class="VC-Vu-btn-ok vc-btn-ok">Đồng ý</button>
                </div>
            </div>
        `;
    document.body.appendChild(this.confirmPopupOverlay);
    this._setupConfirmPopupEvents(this.confirmPopupOverlay);

    // Success/Info Popup
    this.infoPopupOverlay = document.createElement("div");
    this.infoPopupOverlay.id = "vc-vu-info-popup";
    this.infoPopupOverlay.classList.add("VC-Vu-component-overlay");
    this.infoPopupOverlay.innerHTML = `
            <div class="VC-Vu-popup">
                <button class="exitBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
              </svg></button>
                <h2 class="vc-popup-title"></h2>
                <div class="Vu-VC-popup-icon"></div>
                <p class="vc-popup-content"></p>
                <div class="VC-Vu-popup-buttons">
                    <button class="VC-Vu-btn-ok vc-btn-ok">OK</button>
                </div>
            </div>
        `;
    document.body.appendChild(this.infoPopupOverlay);
    this._setupInfoPopupEvents(this.infoPopupOverlay);

    // NEW: Three Option Popup Container
    this.threeOptionPopupOverlay = document.createElement("div");
    this.threeOptionPopupOverlay.id = "vc-vu-three-option-popup";
    this.threeOptionPopupOverlay.classList.add("VC-Vu-component-overlay");
    this.threeOptionPopupOverlay.innerHTML = `
            <div class="VC-Vu-popup">
                <button class="exitBtn">×</button>
                <h2 class="vc-popup-title"></h2>
                <div class="Vu-VC-popup-icon"></div>
                <p class="vc-popup-content"></p>
                <div class="VC-Vu-popup-buttons">
                    <button class="VC-Vu-btn-cancel vc-btn-cancel"></button>
                    <button class="VC-Vu-btn-third vc-btn-third"></button>
                    <button class="VC-Vu-btn-ok vc-btn-ok"></button>
                </div>
            </div>
        `;
    document.body.appendChild(this.threeOptionPopupOverlay);
    this._setupThreeOptionPopupEvents(this.threeOptionPopupOverlay);
  }

  _createFullscreenImageOverlay() {
    this.fullscreenImageOverlay = document.createElement("div");
    this.fullscreenImageOverlay.id = "fullscreenImageOverlay";
    this.fullscreenImageOverlay.innerHTML = `
  <img id="fullscreenImage" src="" alt="Full Screen Image">

  <button id="closeImageOverlay">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18L18 6M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
  <div id="imageActionButtons">
    <button id="saveImageBtn" class="image-action-btn" title="Lưu ảnh">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
      </svg>
    </button>
    <button id="copyImageBtn" class="image-action-btn" title="Sao chép ảnh">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
      </svg>
    </button>
    <button id="shareImageBtn" class="image-action-btn" title="Chia sẻ ảnh">
      <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" class="icon">
        <path fill="#ffffff"
          d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z">
        </path>
      </svg>
    </button>
  </div>
  <div id="fullscreenLogoContainer">
    <svg id="fullscreenLogo1" class="fullscreen-logo" width="171" height="44" viewBox="0 0 171 44" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1_1493_14" fill="white">
        <path
          d="M13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM125.706 35.7585C127.11 35.7585 128.206 35.6136 128.994 35.3239C129.801 35.0342 130.426 34.6771 130.868 34.2522C131.31 33.8277 131.695 33.4028 132.022 32.9779C132.329 32.5917 132.579 32.3024 132.772 32.1091C132.983 31.9162 133.271 31.781 133.637 31.7036C133.944 31.6071 134.435 31.5491 135.107 31.53C135.8 31.4913 136.482 31.472 137.155 31.472C137.847 31.472 138.328 31.4913 138.597 31.53C139.001 31.5491 139.279 31.6265 139.433 31.7617C139.587 31.8968 139.683 32.1862 139.721 32.6305C139.779 33.2483 139.808 33.9819 139.808 34.8316C139.827 35.681 139.818 36.4146 139.779 37.0328C139.76 37.2257 139.721 37.3899 139.664 37.5251C139.625 37.6602 139.529 37.8628 139.375 38.1332C139.183 38.4422 138.808 38.8958 138.251 39.4943C137.693 40.0737 136.876 40.6818 135.8 41.3189C134.723 41.9367 133.329 42.4677 131.618 42.912C129.926 43.3559 127.84 43.5778 125.36 43.5778C122.707 43.5778 120.227 43.24 117.92 42.5642C115.613 41.8693 113.585 40.7108 111.835 39.0887C110.105 37.467 108.75 35.2755 107.769 32.5146C106.808 29.7536 106.327 26.3072 106.327 22.1753C106.327 17.5801 107.115 13.6799 108.692 10.4748C110.287 7.25044 112.547 4.79837 115.469 3.11859C118.391 1.43883 121.852 0.598941 125.85 0.598941C128.657 0.598941 130.907 0.888558 132.598 1.46779C134.31 2.04702 135.607 2.73246 136.492 3.52407C137.376 4.29636 138.001 4.97213 138.366 5.55137C138.501 5.76377 138.597 5.95682 138.655 6.13061C138.712 6.28507 138.751 6.53606 138.77 6.88361C138.827 7.347 138.837 8.02277 138.799 8.91091C138.78 9.79908 138.712 10.581 138.597 11.2568C138.52 11.6816 138.395 11.9615 138.222 12.0967C138.145 12.1739 138.011 12.2415 137.818 12.2994C137.626 12.3574 137.338 12.3863 136.953 12.3863C136.338 12.3863 135.646 12.367 134.877 12.3284C134.108 12.2704 133.531 12.2125 133.147 12.1546C132.685 12.0774 132.349 11.9712 132.137 11.836C131.926 11.6816 131.714 11.4499 131.503 11.141C131.156 10.639 130.561 10.0597 129.715 9.40327C128.869 8.7468 127.475 8.41857 125.533 8.41857C122.803 8.41857 120.554 9.4805 118.785 11.6044C117.017 13.7089 116.132 17.1264 116.132 21.8568C116.132 26.5678 117.055 30.0625 118.901 32.3408C120.765 34.619 123.034 35.7585 125.706 35.7585ZM153.102 43.5778C150.276 43.5778 148.027 42.7865 146.354 41.2031C144.701 39.6004 143.874 37.3996 143.874 34.6C143.874 33.1518 144.134 31.8097 144.653 30.5742C145.191 29.3192 146.114 28.2186 147.421 27.2726C148.748 26.3072 150.594 25.5349 152.958 24.9556C155.342 24.3764 158.38 24.0385 162.071 23.942C162.071 22.185 161.629 20.9203 160.744 20.148C159.879 19.3757 158.572 18.9895 156.822 18.9895C155.246 18.9895 153.958 19.2599 152.958 19.8005C151.958 20.3411 151.334 20.7079 151.084 20.901C150.815 21.1327 150.488 21.2196 150.103 21.1617C149.584 21.0844 149.027 20.9493 148.431 20.7562C147.854 20.5631 147.229 20.3411 146.556 20.0901C146.46 20.0515 146.354 19.9935 146.239 19.9163C146.124 19.8198 146.056 19.6846 146.037 19.5109C146.037 19.4143 146.047 19.2985 146.066 19.1633C146.085 19.0088 146.133 18.7386 146.21 18.3524C146.287 17.9662 146.402 17.4932 146.556 16.9333C146.71 16.354 146.854 15.91 146.989 15.601C147.162 15.2728 147.45 14.9639 147.854 14.6743C148.181 14.404 149.171 13.9696 150.824 13.371C152.478 12.7725 154.871 12.4732 158.005 12.4732C166.637 12.4732 170.953 16.6919 170.953 25.1294V41.5215C170.953 41.8886 170.847 42.2071 170.636 42.4774C170.444 42.7284 170.107 42.8539 169.626 42.8539H165.301C164.993 42.8539 164.715 42.8152 164.465 42.7381C164.234 42.6416 164.013 42.4677 163.801 42.2167L162.013 39.8998H161.812C160.927 41.1934 159.735 42.13 158.236 42.709C156.755 43.2884 155.044 43.5778 153.102 43.5778ZM156.274 36.8589C158.043 36.8589 159.379 36.405 160.283 35.4978C161.187 34.5903 161.763 33.6538 162.013 32.6885V29.4736C159.341 29.4736 157.332 29.686 155.986 30.1108C154.66 30.5164 153.775 31.0568 153.333 31.7326C152.891 32.3891 152.67 33.1034 152.67 33.8757C152.67 34.9955 153.016 35.7775 153.708 36.2217C154.4 36.6466 155.256 36.8589 156.274 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91  15.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354  43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868  25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C
        fill="white" mask="url(#path-1-inside-1_1493_14)" />
      <path
        d="M91.2817 13.4653C92.0107 13.3825 92.7484 13.4917 93.4214 13.7817C94.0102 14.0357 94.5317 14.4198 94.9458 14.9038L95.1167 15.1177L101.796 24.0835C102.179 24.5966 102.436 25.1888 102.551 25.814L102.591 26.0845C102.676 26.8085 102.568 27.5419 102.278 28.2114L97.8169 38.4478V38.4487C97.5267 39.1166 97.064 39.6973 96.4761 40.1323C95.8878 40.5671 95.1943 40.8414 94.4663 40.9253H94.4653L83.3169 42.2212C82.6797 42.2953 82.0352 42.2213 81.4331 42.0073L81.1772 41.9077L80.9292 41.7905C80.3611 41.5001 79.8664 41.0834 79.4849 40.5708V40.5698L72.8042 31.603C72.3673 31.0164 72.0934 30.3263 72.0093 29.6021H72.0083C71.9239 28.8775 72.0332 28.143 72.3237 27.4731L72.3228 27.4722L76.7837 17.2388V17.2368C77.0738 16.5683 77.5367 15.9871 78.1245 15.5522C78.7122 15.1177 79.4052 14.8446 80.1333 14.7612H80.1353L91.2808 13.4644L91.2817 13.4653Z"
        stroke="white" stroke-width="2" />
      <mask id="mask0_1493_14" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="76" y="16" width="21"
        height="22">
        <path d="M96.854 16.8674H76.2964V37.5131H96.854V16.8674Z" fill="white" />
      </mask>
      <g mask="url(#mask0_1493_14)">
        <path
          d="M94.3995 22.7964C94.76 21.9448 94.7057 21.0581 94.2008 20.4607C93.5882 19.7363 92.4881 19.6639 91.4604 20.1709C92.5543 20.9078 93.5431 21.7911 94.3995 22.7964Z"
          fill="white" />
        <path
          d="M80.5898 31.0079C80.5055 31.2205 80.3594 31.4028 80.1707 31.5311C79.9818 31.6591 79.7592 31.7272 79.531 31.7265H78.5242C78.4735 31.7278 78.4229 31.7187 78.3756 31.7003C78.3284 31.6816 78.2852 31.6538 78.2488 31.6182C78.2124 31.5826 78.1835 31.5402 78.1639 31.493C78.144 31.4462 78.1338 31.3956 78.1338 31.3447C78.1338 31.2935 78.144 31.2433 78.1639 31.1962C78.1835 31.1493 78.2124 31.1066 78.2488 31.071C78.2852 31.0354 78.3284 31.0076 78.3756 30.9889C78.4229 30.9704 78.4735 30.9617 78.5242 30.963H79.531C79.6072 30.9633 79.6815 30.9405 79.7446 30.8977C79.8074 30.8549 79.8562 30.7944 79.8845 30.7235C79.9025 30.6761 79.9298 30.633 79.9647 30.5965C79.9995 30.5599 80.0411 30.5306 80.0871 30.5106C80.1334 30.4903 80.1832 30.4794 80.2335 30.4788C80.2839 30.4778 80.3339 30.4872 80.3806 30.5059C80.4275 30.525 80.4701 30.5528 80.5058 30.5883C80.5419 30.6236 80.5705 30.6661 80.5898 30.7126C80.6093 30.7594 80.6193 30.8094 80.6196 30.8599C80.6196 30.9105 80.609 30.9614 80.5898 31.0079ZM83.0868 26.0013C83.2748 26.0014 83.4585 25.9455 83.6149 25.8406C83.7712 25.7357 83.8931 25.5867 83.9652 25.4122C84.037 25.2378 84.056 25.0459 84.0193 24.8607C83.9826 24.6755 83.8922 24.5054 83.7591 24.3719C83.6264 24.2383 83.457 24.1474 83.2726 24.1105C83.088 24.0737 82.8972 24.0926 82.7234 24.1648C82.5496 24.237 82.401 24.3594 82.2966 24.5164C82.1922 24.6734 82.1365 24.858 82.1365 25.0468C82.1365 25.2999 82.2366 25.5426 82.4147 25.7217C82.5931 25.9007 82.8347 26.0013 83.0868 26.0013ZM86.1277 24.0924C85.1846 24.0924 85.0124 26.7819 84.9901 28.2918H84.4669C84.4013 28.2919 84.337 28.2748 84.2798 28.2424C84.2229 28.21 84.175 28.1633 84.1415 28.1069L83.4402 26.9373C83.3389 26.7681 83.1956 26.6281 83.0246 26.5309C82.8533 26.4337 82.66 26.3826 82.4635 26.3827H81.5624C81.5506 26.3819 81.5385 26.3819 81.5266 26.3827H80.5155C80.3038 26.3826 80.0961 26.4418 79.9162 26.5536C79.7362 26.6654 79.5904 26.8253 79.4959 27.0155L78.9457 28.1218C78.9031 28.212 78.8975 28.3154 78.9302 28.4098C78.9625 28.5042 79.0303 28.5821 79.1192 28.6267C79.2084 28.6714 79.311 28.6794 79.4058 28.6488C79.5003 28.6183 79.5792 28.5518 79.6258 28.4635L80.1757 27.3583C80.2074 27.2949 80.2559 27.2416 80.3159 27.2044C80.3759 27.1672 80.4449 27.1475 80.5155 27.1475H80.9786L80.3122 28.7789C80.2105 29.028 80.1993 29.3052 80.2808 29.5618C80.3625 29.8184 80.5313 30.0379 80.7582 30.1816L82.3261 31.1759V32.8738C82.3249 32.9247 82.3336 32.9752 82.3522 33.023C82.3706 33.0705 82.3986 33.1135 82.434 33.1501C82.4694 33.1866 82.5117 33.2156 82.5586 33.2356C82.6053 33.2553 82.6556 33.2656 82.7063 33.2656C82.7573 33.2656 82.8073 33.2553 82.8543 33.2356C82.9009 33.2156 82.9435 33.1866 82.9789 33.1501C83.0143 33.1135 83.042 33.0705 83.0603 33.023C83.079 32.9752 83.0877 32.9247 83.0865 32.8738V30.9639C83.0865 30.8996 83.0703 30.8359 83.0392 30.7797C83.0081 30.7232 82.9634 30.6754 82.9093 30.6408L82.1331 30.1488L83.0833 27.8227L83.4899 28.5005C83.5913 28.6698 83.7346 28.8098 83.9058 28.907C84.0768 29.0042 84.2705 29.0552 84.4669 29.0551H85.374C85.4234 29.0551 85.4722 29.0649 85.5176 29.0839C85.5629 29.103 85.6043 29.1308 85.6391 29.1659C85.6739 29.201 85.7013 29.2426 85.7199 29.2884C85.7386 29.3342 85.7479 29.3832 85.7476 29.4327V29.4404C85.7454 29.5406 85.7044 29.636 85.6335 29.7064C85.5626 29.7769 85.4672 29.817 85.3674 29.8183C85.1582 29.8332 85.0255 30.0168 85.0401 30.2271C85.2543 33.254 85.8881 33.254 86.1265 33.254C87.156 33.254 87.2661 30.0504 87.2661 28.6732C87.2661 27.296 87.1563 24.0924 86.1277 24.0924Z"
          fill="white" />
      </g>
    </svg>
    <div id="fullscreenLogoDivider" class="fullscreen-logo-divider"></div>
    <svg id="fullscreenLogo1" class="fullscreen-logo" width="200" height="51" viewBox="0 0 200 51" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1494_15)">
        <path
          d="M62.5816 38.3977C62.5816 35.4449 62.5815 32.5906 62.5816 29.7363C62.5816 28.1015 62.5808 28.0968 64.1528 27.797C64.4095 27.7481 64.6783 27.7617 65.0552 27.7398C65.0552 28.3575 65.0552 28.9536 65.0552 29.6665C68.0556 26.4872 70.9085 26.2381 74.8051 29.6032C76.5809 28.0691 78.6488 27.1049 81.0452 27.1951C83.3877 27.2832 85.4328 28.1634 87.1028 30.3095C87.1028 29.4635 87.002 28.925 87.1367 28.4528C87.2338 28.1123 87.5956 27.761 87.9301 27.598C88.2232 27.4552 88.6801 27.4735 88.9951 27.5963C89.2741 27.7051 89.6527 28.0544 89.6544 28.2997C89.6918 33.7773 89.6831 39.2552 89.6831 44.8928C88.9733 44.8928 88.2909 44.9415 87.6239 44.8627C87.428 44.8395 87.1522 44.4678 87.1269 44.2332C87.0579 43.5939 87.1032 42.9425 87.1032 42.1695C86.4536 42.6917 85.9455 43.1897 85.3559 43.56C80.1971 46.7998 73.402 43.8048 72.2115 37.9897C71.8039 35.9987 71.9833 34.0885 72.8922 32.2715C73.1464 31.7636 73.0653 31.4493 72.6733 31.0755C71.2345 29.7036 68.8193 28.9271 67.2291 30.4047C66.3916 31.1829 65.6758 32.4411 65.5494 33.5546C65.2084 36.5568 65.2074 39.5975 65.085 42.6235C65.0561 43.3386 65.0808 44.0559 65.0808 44.8338C64.2645 44.8338 63.5205 44.8338 62.5816 44.8338C62.5816 42.7247 62.5816 40.6104 62.5816 38.3977ZM74.8053 37.839C74.9029 38.1132 74.9821 38.3955 75.1007 38.6604C77.0099 42.9217 82.686 43.9116 85.7133 40.5141C87.4904 38.5198 87.8091 35.5272 86.5131 33.0058C85.319 30.6828 83.069 29.5164 80.2769 29.73C76.3001 30.0341 73.7957 34.2745 74.8053 37.839Z"
          fill="white" />
        <path
          d="M189.033 32.8393C187.578 34.2452 185.712 34.2225 183.748 34.5698C187.421 36.7719 189.938 39.7222 191.093 43.7128C191.248 44.2488 191.369 44.7947 191.381 45.3906C189.628 44.3008 188.744 42.5385 187.499 40.699C187.499 41.796 187.499 42.5894 187.499 43.3828C187.377 43.4075 187.255 43.4322 187.132 43.4569C186.717 42.2479 186.303 41.039 185.798 39.5674C185.715 40.6221 185.654 41.4114 185.592 42.2007C185.445 42.2218 185.297 42.2429 185.15 42.264C184.773 41.06 184.397 39.856 183.981 38.5252C183.933 39.3444 183.893 40.0288 183.852 40.7133C183.714 40.7416 183.576 40.7699 183.438 40.7981C183.028 39.6185 182.618 38.4388 182.202 37.242C182.15 37.757 182.101 38.2516 182.052 38.7462C181.93 38.7754 181.807 38.8046 181.685 38.8338C181.458 38.3008 181.21 37.775 181.008 37.2328C180.756 36.5588 180.586 35.8511 180.289 35.1989C180.157 34.9084 179.802 34.7178 179.548 34.4819C179.421 34.7739 179.187 35.0647 179.184 35.3578C179.156 38.1449 179.179 40.9324 179.153 43.7195C179.15 44.0992 179.009 44.7774 178.847 44.8036C178.18 44.9118 177.476 44.8496 176.795 44.773C176.701 44.7624 176.597 44.3204 176.597 44.078C176.586 37.0933 176.592 30.1086 176.583 23.124C176.582 22.496 176.831 22.2302 177.466 22.2478C180.267 22.3253 183.074 22.2961 185.868 22.4793C188.658 22.6622 190.825 25.2086 190.886 28.0162C190.925 29.8678 190.568 31.5262 189.033 32.8393ZM184.375 31.8994C184.637 31.8809 184.906 31.8919 185.161 31.8393C187.209 31.4172 188.101 30.4141 188.123 28.5288C188.146 26.4786 187.325 25.2816 185.224 24.9814C183.412 24.7225 181.543 24.8393 179.699 24.847C179.522 24.8477 179.198 25.2492 179.193 25.47C179.152 27.3701 179.182 29.2715 179.16 31.1723C179.154 31.7347 179.386 31.9142 179.927 31.906C181.347 31.8845 182.767 31.8992 184.375 31.8994Z"
          fill="white" />
        <path
          d="M110.913 22.8583C110.913 30.2307 110.913 37.5071 110.913 44.8397C110.114 44.8397 109.4 44.8397 108.563 44.8397C108.563 43.9983 108.563 43.1414 108.563 42.1817C103.222 46.8145 97.7361 44.707 95.247 41.6544C92.4519 38.2264 92.6131 32.9914 96.1189 29.6686C99.2287 26.7212 104.482 25.9446 108.531 30.1695C108.531 27.5362 108.517 24.9903 108.546 22.4449C108.551 22.0644 108.69 21.4023 108.879 21.3597C109.469 21.227 110.158 21.2038 110.711 21.4046C110.917 21.4798 110.854 22.2883 110.913 22.8583ZM108.149 38.6593C108.277 37.7972 108.506 36.936 108.514 36.0728C108.553 32.0646 105.494 29.3272 101.484 29.735C97.673 30.1224 94.9062 34.2485 96.1439 37.9978C96.9597 40.4688 99.289 42.3636 101.663 42.5308C104.549 42.734 106.842 41.4109 108.149 38.6593Z"
          fill="white" />
        <path
          d="M32.8818 1.04688C34.1713 0.899538 35.4769 1.09525 36.668 1.6123C37.8586 2.12948 38.8949 2.95077 39.6709 3.99512V3.99609L50.5146 18.6543C51.2415 19.637 51.715 20.7834 51.8945 21.9912L51.9268 22.2334C52.0673 23.4492 51.9068 24.6799 51.4609 25.8164L51.3682 26.042L44.1279 42.7744V42.7754C43.6122 43.9707 42.7914 45.0087 41.749 45.7852C40.7066 46.5612 39.479 47.0486 38.1904 47.1982H38.1895L20.0938 49.3174C18.885 49.4589 17.6609 49.298 16.5303 48.8506L16.3057 48.7578L16.084 48.6572C14.9859 48.1369 14.0313 47.3519 13.3057 46.3701V46.3691L2.46191 31.7109C1.73497 30.728 1.26054 29.582 1.08105 28.374L1.0498 28.1318C0.899855 26.8351 1.09237 25.5215 1.6084 24.3232L1.60742 24.3223L8.84766 7.59082L8.84863 7.58984C9.36402 6.39381 10.1844 5.35542 11.2266 4.5791C12.2685 3.80297 13.4962 3.3157 14.7852 3.16699H14.7871L32.8828 1.04785L32.8818 1.04688Z"
          stroke="white" stroke-width="2" />
      </g>
      <defs>
        <clipPath id="clip0_1494_15">
          <rect width="200" height="51" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
    `;
    document.body.appendChild(this.fullscreenImageOverlay);

    // Lưu trữ tham chiếu đến các phần tử con
    this.fullscreenImage =
      this.fullscreenImageOverlay.querySelector("#fullscreenImage");
    this.closeImageOverlayButton =
      this.fullscreenImageOverlay.querySelector("#closeImageOverlay");
    this.saveImageButton =
      this.fullscreenImageOverlay.querySelector("#saveImageBtn");
    this.copyImageButton =
      this.fullscreenImageOverlay.querySelector("#copyImageBtn");
    this.shareImageButton =
      this.fullscreenImageOverlay.querySelector("#shareImageBtn");

    // NEW: Tham chiếu đến các phần tử logo mới
    this.fullscreenLogoContainer = this.fullscreenImageOverlay.querySelector(
      "#fullscreenLogoContainer"
    );
    this.fullscreenLogo1 =
      this.fullscreenImageOverlay.querySelector("#fullscreenLogo1");
    this.fullscreenLogo2 =
      this.fullscreenImageOverlay.querySelector("#fullscreenLogo2");
    this.fullscreenLogoDivider = this.fullscreenImageOverlay.querySelector(
      "#fullscreenLogoDivider"
    );

    this._setupFullscreenImageOverlayEvents();
  }

  /**
   * Creates the main container for alert messages.
   */
  _createAlertContainer() {
    this.alertContainer = document.createElement("div");
    this.alertContainer.id = "vc-vu-alert-container";
    document.body.appendChild(this.alertContainer);
  }

  /**
   * NEW: Creates the loading screen HTML structure.
   */
  _createLoadingScreen() {
    this.loadingScreenElement = document.createElement("div");
    this.loadingScreenElement.id = "loadingScreen";
    this.loadingScreenElement.classList.add("VC-Vu-component-loading");
    this.loadingScreenElement.innerHTML = `
             <div class="loaderVu">
        <svg class="logoVu" width="120" height="120" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1551_31)">
                <path
                    d="M19.8477 0.529297C20.648 0.440501 21.4582 0.556632 22.1963 0.867188C22.9334 1.17748 23.5728 1.6698 24.0508 2.29297V2.29395L30.6016 10.875C31.079 11.5006 31.378 12.2361 31.4697 13.0068C31.5616 13.7773 31.4437 14.5581 31.127 15.2715L26.7529 25.0664V25.0674C26.4359 25.7793 25.9303 26.3992 25.2861 26.8643C24.7222 27.271 24.0699 27.5463 23.3799 27.6689L23.082 27.7119L12.1514 28.9531C11.4515 29.0325 10.7437 28.9528 10.083 28.7236L9.80273 28.6162C9.06489 28.3058 8.42609 27.8127 7.94922 27.1875L1.39844 18.6074C0.920976 17.9818 0.622046 17.2464 0.530273 16.4756V16.4746C0.438359 15.7038 0.556957 14.9224 0.874023 14.209L0.873047 14.208L5.24707 4.41504V4.41406C5.56386 3.70172 6.06888 3.08113 6.71289 2.61621C7.35698 2.15128 8.11733 1.85896 8.91699 1.76953H8.91797L19.8467 0.52832L19.8477 0.529297Z"
                    stroke="white" />
                <mask id="mask0_1551_31" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="6" y="5" width="21"
                    height="20">
                    <path d="M26.2013 5.01746H6.0459V24.7729H26.2013V5.01746Z" fill="white" />
                </mask>
                <g mask="url(#mask0_1551_31)">
                    <path
                        d="M23.7946 10.6905C24.1481 9.87561 24.0948 9.02711 23.5999 8.45543C22.9992 7.7623 21.9206 7.69302 20.9131 8.17814C21.9855 8.88328 22.955 9.72853 23.7946 10.6905Z"
                        fill="none" />
                    <path
                        d="M10.2561 18.5478C10.1735 18.7513 10.0302 18.9257 9.84525 19.0485C9.65995 19.171 9.44175 19.2361 9.21805 19.2355H8.23094C8.18126 19.2367 8.13158 19.228 8.08525 19.2104C8.03893 19.1925 7.99657 19.1659 7.96091 19.1318C7.92525 19.0978 7.89691 19.0572 7.87771 19.012C7.8582 18.9672 7.84814 18.9188 7.84814 18.8702C7.84814 18.8212 7.8582 18.7731 7.87771 18.728C7.89691 18.6832 7.92525 18.6422 7.96091 18.6082C7.99657 18.5741 8.03893 18.5475 8.08525 18.5296C8.13158 18.512 8.18126 18.5036 8.23094 18.5048H9.21805C9.29272 18.5051 9.36555 18.4833 9.42742 18.4424C9.48898 18.4015 9.53683 18.3435 9.56456 18.2757C9.58224 18.2303 9.60907 18.1891 9.6432 18.1541C9.67734 18.1192 9.71817 18.0911 9.76328 18.072C9.80869 18.0526 9.85744 18.0421 9.90681 18.0415C9.95618 18.0406 10.0053 18.0496 10.051 18.0675C10.097 18.0857 10.1387 18.1123 10.1738 18.1464C10.2091 18.1801 10.2372 18.2208 10.2561 18.2653C10.2753 18.3101 10.285 18.3579 10.2853 18.4063C10.2853 18.4546 10.275 18.5033 10.2561 18.5478ZM12.7042 13.7571C12.8886 13.7572 13.0687 13.7037 13.222 13.6033C13.3753 13.503 13.4948 13.3604 13.5655 13.1934C13.6359 13.0265 13.6545 12.8429 13.6185 12.6657C13.5825 12.4885 13.4939 12.3257 13.3634 12.1979C13.2333 12.0702 13.0672 11.9831 12.8865 11.9479C12.7054 11.9126 12.5183 11.9307 12.348 11.9998C12.1776 12.0689 12.0319 12.186 11.9295 12.3362C11.8271 12.4864 11.7726 12.6631 11.7726 12.8437C11.7726 13.0859 11.8707 13.3182 12.0453 13.4895C12.2203 13.6608 12.4571 13.7571 12.7042 13.7571ZM15.6857 11.9306C14.7611 11.9306 14.5922 14.504 14.5703 15.9489H14.0574C13.9931 15.9489 13.93 15.9326 13.8739 15.9016C13.8181 15.8706 13.7712 15.8259 13.7383 15.7719L13.0507 14.6527C12.9514 14.4908 12.8109 14.3568 12.6433 14.2639C12.4753 14.1709 12.2858 14.122 12.0932 14.1221H11.2097C11.1981 14.1213 11.1862 14.1213 11.1746 14.1221H10.1832C9.97569 14.122 9.77211 14.1786 9.59565 14.2856C9.41919 14.3925 9.27626 14.5456 9.18361 14.7276L8.64419 15.7862C8.60244 15.8725 8.59695 15.9715 8.62895 16.0618C8.66064 16.1521 8.72709 16.2266 8.81425 16.2693C8.90172 16.3121 9.00228 16.3197 9.09523 16.2905C9.18788 16.2613 9.26529 16.1976 9.311 16.1131L9.85012 15.0556C9.88121 14.995 9.92877 14.944 9.98759 14.9083C10.0464 14.8727 10.114 14.8538 10.1832 14.8539H10.6373L9.98391 16.4149C9.88426 16.6533 9.87329 16.9186 9.95313 17.1641C10.0333 17.4096 10.1988 17.6196 10.4212 17.7571L11.9585 18.7086V20.3333C11.9572 20.382 11.9658 20.4303 11.9841 20.476C12.002 20.5215 12.0295 20.5627 12.0642 20.5976C12.099 20.6326 12.1404 20.6604 12.1864 20.6795C12.2321 20.6983 12.2815 20.7081 12.3312 20.7081C12.3812 20.7081 12.4302 20.6983 12.4763 20.6795C12.522 20.6604 12.5637 20.6326 12.5985 20.5976C12.6332 20.5627 12.6603 20.5215 12.6783 20.476C12.6966 20.4303 12.7051 20.382 12.7039 20.3333V18.5057C12.7039 18.4442 12.6881 18.3833 12.6576 18.3295C12.6271 18.2754 12.5832 18.2297 12.5302 18.1966L11.7692 17.7258L12.7009 15.4999L13.0995 16.1485C13.1988 16.3105 13.3393 16.4445 13.5073 16.5376C13.6749 16.6305 13.8648 16.6794 14.0574 16.6792H14.9467C14.9951 16.6792 15.043 16.6886 15.0875 16.7068C15.1319 16.725 15.1725 16.7517 15.2066 16.7852C15.2407 16.8189 15.2676 16.8587 15.2859 16.9025C15.3041 16.9463 15.3133 16.9932 15.313 17.0406V17.0479C15.3108 17.1438 15.2706 17.2351 15.2011 17.3025C15.1316 17.3699 15.0381 17.4083 14.9403 17.4095C14.7351 17.4238 14.605 17.5995 14.6193 17.8007C14.8293 20.6971 15.4507 20.6971 15.6845 20.6971C16.6938 20.6971 16.8017 17.6316 16.8017 16.3138C16.8017 14.996 16.6942 11.9306 15.6857 11.9306Z"
                        fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_1551_31">
          <rect width="32" height="30" fill="white" />
        </clipPath>
      </defs>
        </svg>
    </div>
            <h3 class="loadMessage" id="loadingText">Đang tải...</h3> `;
    document.body.appendChild(this.loadingScreenElement);
    this.loadingTextElement =
      this.loadingScreenElement.querySelector("#loadingText");
  }

  /**
   * Sets up event listeners for the confirm popup.
   * @param {HTMLElement} overlay The confirm popup overlay element.
   */
  _setupConfirmPopupEvents(overlay) {
    const exitBtn = overlay.querySelector(".exitBtn");
    const btnOK = overlay.querySelector(".vc-btn-ok");
    const btnCancel = overlay.querySelector(".vc-btn-cancel");

    const closePopup = () => {
      overlay.classList.remove("active");
      overlay.removeEventListener("click", overlayCloseHandler); // Remove overlay click listener
      document.body.style.overflow = ""; // Restore body scroll
      // Clean up old event listeners to prevent memory leaks/multiple calls
      btnOK.onclick = null;
      btnCancel.onclick = null;
    };

    // Handler for clicking the overlay itself (outside the popup content)
    const overlayCloseHandler = (event) => {
      if (event.target === overlay) {
        closePopup();
        // Call the current onCancel if it's set for external clicks
        if (overlay._onCancelCallback) {
          overlay._onCancelCallback();
        }
      }
    };

    exitBtn.addEventListener("click", closePopup);
    // Delay adding overlay click listener to prevent immediate closing
    // after the event that triggered the popup shows up
    setTimeout(() => {
      overlay.addEventListener("click", overlayCloseHandler);
    }, 100);
  }

  /**
   * NEW: Sets up event listeners for the three-option popup.
   * @param {HTMLElement} overlay The three-option popup overlay element.
   */
  _setupThreeOptionPopupEvents(overlay) {
    const exitBtn = overlay.querySelector(".exitBtn");
    const btnOK = overlay.querySelector(".vc-btn-ok");
    const btnCancel = overlay.querySelector(".vc-btn-cancel");
    const btnThird = overlay.querySelector(".vc-btn-third");

    const closePopup = () => {
      overlay.classList.remove("active");
      overlay.removeEventListener("click", overlayCloseHandler);
      document.body.style.overflow = "";
      btnOK.onclick = null;
      btnCancel.onclick = null;
      btnThird.onclick = null;
    };

    const overlayCloseHandler = (event) => {
      if (event.target === overlay) {
        closePopup();
        if (overlay._onCancelCallback) {
          // Default to cancel if clicked outside
          overlay._onCancelCallback();
        }
      }
    };

    exitBtn.addEventListener("click", closePopup);
    setTimeout(() => {
      overlay.addEventListener("click", overlayCloseHandler);
    }, 100);
  }

  _setupFullscreenImageOverlayEvents() {
    // Đóng khi click nút "Đóng"
    this.closeImageOverlayButton.addEventListener("click", () => {
      this.hideFullscreenImage();
    });

    this.saveImageButton.addEventListener("click", () => {
      this._saveImage(this.fullscreenImage.src);
    });
    this.copyImageButton.addEventListener("click", () => {
      this._copyImage(this.fullscreenImage.src);
    });
    this.shareImageButton.addEventListener("click", () => {
      this._shareImage(this.fullscreenImage.src);
    });

    // Improved touch/click handling for mobile
    let lastTapTime = 0;
    const handleImageInteraction = (event) => {
      event.stopPropagation();

      // Check if this is a touch device
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      if (isTouchDevice) {
        // On touch devices, only close on double tap when not zoomed
        const currentTime = Date.now();
        const timeDiff = currentTime - lastTapTime;

        if (timeDiff < 300 && timeDiff > 0) {
          // Double tap detected
          const currentScale = this.fullscreenImage.style.transform.includes(
            "scale"
          )
            ? parseFloat(
                this.fullscreenImage.style.transform.match(
                  /scale\(([^)]+)\)/
                )?.[1] || 1
              )
            : 1;

          if (currentScale <= 1) {
            this.hideFullscreenImage();
          }
        }
        lastTapTime = currentTime;
      } else {
        // On desktop, single click to close
        if (event.target === this.fullscreenImage) {
          this.hideFullscreenImage();
        }
      }
    };

    this.fullscreenImage.addEventListener("click", handleImageInteraction);
    this.fullscreenImage.addEventListener("touchend", handleImageInteraction);

    // Đóng khi click vào overlay nhưng không phải ảnh hoặc nút đóng
    this.fullscreenImageOverlay.addEventListener("click", (event) => {
      if (event.target === this.fullscreenImageOverlay) {
        this.hideFullscreenImage();
      }
    });

    // Đóng bằng phím ESC
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        this.fullscreenImageOverlay.style.display === "flex"
      ) {
        this.hideFullscreenImage();
      }
    });
  }

  // Trong class UIElements_VaoCa
  _saveImage(imageSrc) {
    // 1. Kiểm tra ảnh dự phòng (fallback image)
    if (!imageSrc || imageSrc.startsWith("https://st5.depositphotos.com")) {
      this.showAlert({
        type: "warning",
        message: "Không thể lưu ảnh dự phòng.",
      });
      return;
    }

    try {
      // 2. Kiểm tra nếu là Base64 data URL
      if (imageSrc.startsWith("data:")) {
        // Xử lý Base64 data URL
        const link = document.createElement("a");
        link.href = imageSrc;
        link.download = `image_${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showAlert({ type: "success", message: "Ảnh đã được lưu!" });
      } else {
        // 3. Xử lý URL thông thường - tải ảnh và convert thành blob
        fetch(imageSrc, {
          method: "GET",
          headers: {
            Accept: "image/*",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
          })
          .then((blob) => {
            // Tạo URL từ blob
            const blobUrl = URL.createObjectURL(blob);

            // Tạo link download
            const link = document.createElement("a");
            link.href = blobUrl;

            // Xác định extension từ MIME type hoặc URL
            let extension = "png";
            if (blob.type) {
              const mimeToExt = {
                "image/jpeg": "jpg",
                "image/jpg": "jpg",
                "image/png": "png",
                "image/gif": "gif",
                "image/webp": "webp",
              };
              extension = mimeToExt[blob.type] || "png";
            } else if (imageSrc.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
              extension = imageSrc
                .match(/\.(jpg|jpeg|png|gif|webp)$/i)[1]
                .toLowerCase();
            }

            link.download = `image_${Date.now()}.${extension}`;
            link.style.display = "none";

            // Thêm vào DOM và click
            document.body.appendChild(link);
            link.click();

            // Cleanup
            setTimeout(() => {
              document.body.removeChild(link);
              URL.revokeObjectURL(blobUrl);
            }, 100);

            this.showAlert({ type: "success", message: "Ảnh đã được lưu!" });
          })
          .catch((error) => {
            console.error("Lỗi khi tải ảnh:", error);

            // Fallback 1: Thử với canvas method
            this._tryCanvasDownload(imageSrc)
              .then(() => {
                this.showAlert({
                  type: "success",
                  message: "Ảnh đã được lưu!",
                });
              })
              .catch(() => {
                // Fallback 2: Mở ảnh trong tab mới
                try {
                  const link = document.createElement("a");
                  link.href = imageSrc;
                  link.target = "_blank";
                  link.download = `image_${Date.now()}.png`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);

                  this.showAlert({
                    type: "notice",
                    message:
                      "Đã mở ảnh trong tab mới. Bạn có thể click chuột phải và chọn 'Lưu ảnh' để tải về.",
                  });
                } catch (fallbackError) {
                  console.error(
                    "Fallback download cũng thất bại:",
                    fallbackError
                  );
                  this.showAlert({
                    type: "error",
                    message: "Không thể lưu ảnh. Vui lòng thử lại.",
                  });
                }
              });
          });
      }
    } catch (error) {
      console.error("Lỗi khi lưu ảnh:", error);
      this.showAlert({
        type: "error",
        message: "Không thể lưu ảnh. Vui lòng thử lại.",
      });
    }
  }

  // Helper method để thử download qua canvas
  _tryCanvasDownload(imageSrc) {
    return new Promise((resolve, reject) => {
      try {
        // Thử tải ảnh bằng cách tạo canvas và convert sang blob
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
              if (blob) {
                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = `image_${Date.now()}.png`;
                link.style.display = "none";

                document.body.appendChild(link);
                link.click();

                setTimeout(() => {
                  document.body.removeChild(link);
                  URL.revokeObjectURL(blobUrl);
                }, 100);

                resolve();
              } else {
                reject(new Error("Cannot create blob from canvas"));
              }
            }, "image/png");
          } catch (canvasError) {
            reject(canvasError);
          }
        };

        img.onerror = () => {
          reject(new Error("Cannot load image"));
        };

        img.src = imageSrc;
      } catch (error) {
        reject(error);
      }
    });
  }

  // Trong class UIElements_VaoCa
  _copyImage(imageSrc) {
    // 2. Kiểm tra xem trình duyệt có hỗ trợ Web Clipboard API không
    if (navigator.clipboard && navigator.clipboard.write) {
      // 3. Chuyển đổi Data URL (Base64) thành Blob
      // Dùng fetch API để lấy dữ liệu ảnh từ Data URL và chuyển đổi nó thành Blob.
      fetch(imageSrc)
        .then((res) => res.blob()) // Lấy phản hồi dưới dạng Blob
        .then((blob) => {
          // 4. Tạo một ClipboardItem từ Blob
          // ClipboardItem là một phần của Clipboard API, cho phép sao chép các loại dữ liệu phức tạp.
          // Chúng ta chỉ định loại MIME của Blob là key và Blob là value.
          const item = new ClipboardItem({ [blob.type]: blob });

          // 5. Ghi ClipboardItem vào clipboard
          navigator.clipboard
            .write([item])
            .then(() => {
              this.showAlert({
                type: "success",
                message: "Ảnh đã được sao chép!",
              });
            })
            .catch((err) => {
              // Xử lý lỗi nếu việc ghi vào clipboard thất bại
              console.error("Lỗi khi sao chép ảnh:", err);
              this.showAlert({
                type: "error",
                message: "Không thể sao chép ảnh.",
              });
            });
        })
        .catch((err) => {
          // Xử lý lỗi nếu việc chuyển đổi ảnh sang Blob thất bại
          console.error("Lỗi khi chuyển đổi ảnh để sao chép:", err);
          this.showAlert({ type: "error", message: "Không thể sao chép ảnh." });
        });
    } else {
      // 6. Thông báo nếu trình duyệt không hỗ trợ API
      this.showAlert({
        type: "warning",
        message: "Trình duyệt không hỗ trợ sao chép ảnh.",
      });
    }
  }

  // Trong class UIElements_VaoCa
  _shareImage(imageSrc) {
    // 1. Kiểm tra ảnh dự phòng
    if (!imageSrc || imageSrc.startsWith("https://st5.depositphotos.com")) {
      this.showAlert({
        type: "warning",
        message: "Không thể chia sẻ ảnh dự phòng.",
      });
      return;
    }

    // 2. Kiểm tra xem trình duyệt có hỗ trợ Web Share API không
    if (navigator.share) {
      // 3. Chuyển đổi Data URL (Base64) thành Blob và sau đó thành File object
      fetch(imageSrc)
        .then((res) => res.blob()) // Lấy dữ liệu ảnh dưới dạng Blob
        .then((blob) => {
          // Tạo một đối tượng File từ Blob.
          // File object là cần thiết cho Web Share API khi chia sẻ file.
          const file = new File([blob], `image_${Date.now()}.png`, {
            type: blob.type,
          });

          // 4. Gọi navigator.share() để mở giao diện chia sẻ của hệ điều hành
          navigator
            .share({
              files: [file], // Mảng chứa các File để chia sẻ
              title: "Chia sẻ ảnh", // Tiêu đề của chia sẻ
              text: "Xem ảnh này từ ứng dụng của chúng tôi!", // Nội dung text đi kèm
            })
            .then(() => {
              this.showAlert({
                type: "success",
                message: "Ảnh đã được chia sẻ!",
              });
            })
            .catch((error) => {
              // Xử lý lỗi hoặc khi người dùng hủy chia sẻ
              if (error.name === "AbortError") {
                console.log("Chia sẻ bị hủy."); // Người dùng đóng giao diện chia sẻ
              } else {
                console.error("Lỗi khi chia sẻ ảnh:", error);
                this.showAlert({
                  type: "error",
                  message: "Không thể chia sẻ ảnh.",
                });
              }
            });
        })
        .catch((err) => {
          // Xử lý lỗi nếu việc chuẩn bị ảnh để chia sẻ thất bại
          console.error("Lỗi khi chuẩn bị ảnh để chia sẻ:", err);
          this.showAlert({ type: "error", message: "Không thể chia sẻ ảnh." });
        });
    } else {
      // 5. Thông báo nếu trình duyệt không hỗ trợ API
      this.showAlert({
        type: "warning",
        message: "Trình duyệt không hỗ trợ chia sẻ.",
      });
    }
  }

  /**
   * Sets up event listeners for the info/success/error popup.
   * @param {HTMLElement} overlay The info popup overlay element.
   */
  _setupInfoPopupEvents(overlay) {
    const exitBtn = overlay.querySelector(".exitBtn");
    const btnOK = overlay.querySelector(".vc-btn-ok");

    const closePopup = () => {
      overlay.classList.remove("active");
      overlay.removeEventListener("click", overlayCloseHandler);
      document.body.style.overflow = "";
      btnOK.onclick = null;
    };

    const overlayCloseHandler = (event) => {
      if (event.target === overlay) {
        closePopup();
        if (overlay._onOkCallback) {
          // Call onOk for info popups if defined for overlay click
          overlay._onOkCallback();
        }
      }
    };

    exitBtn.addEventListener("click", closePopup);
    setTimeout(() => {
      overlay.addEventListener("click", overlayCloseHandler);
    }, 100);
  }

  /**
   * Displays an image in full-screen overlay mode.
   * @param {string} imageSrc - The source of the image (URL or Base64 data URL).
   */
  showFullscreenImage(imageSrc) {
    if (!this.fullscreenImageOverlay || !this.fullscreenImage) {
      console.error("Fullscreen image overlay not initialized.");
      return;
    }

    // Reset any existing transforms
    this.fullscreenImage.style.transform = "scale(1) translate(0, 0)";

    // Tạo ảnh tạm để kiểm tra kích thước và tối ưu chất lượng
    const tempImage = new Image();
    tempImage.crossOrigin = "anonymous";

    tempImage.onload = () => {
      // Tối ưu hóa cho ảnh chất lượng cao
      this.fullscreenImage.style.imageRendering =
        tempImage.width > 1920 ? "crisp-edges" : "high-quality";
      this.fullscreenImage.src = imageSrc;

      // Thêm meta viewport cho mobile optimization
      let viewport = document.querySelector("meta[name=viewport]");
      if (!viewport) {
        viewport = document.createElement("meta");
        viewport.name = "viewport";
        document.head.appendChild(viewport);
      }
      const originalViewport = viewport.content;
      viewport.content =
        "width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=yes";

      // Lưu viewport gốc để khôi phục sau
      this.fullscreenImageOverlay._originalViewport = originalViewport;
    };

    tempImage.onerror = () => {
      // Nếu có lỗi, vẫn hiển thị ảnh nhưng với cài đặt mặc định
      this.fullscreenImage.src = imageSrc;
    };

    tempImage.src = imageSrc;

    this.fullscreenImageOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    // Thêm touch gestures cho mobile
    this._setupImageTouchGestures();
  }

  /**
   * Hides the full-screen image overlay.
   */
  hideFullscreenImage() {
    if (!this.fullscreenImageOverlay || !this.fullscreenImage) {
      return;
    }

    this.fullscreenImageOverlay.classList.remove("active");
    this.fullscreenImage.src = "";
    this.fullscreenImage.style.transform = "scale(1) translate(0, 0)";
    document.body.style.overflow = "";

    // Khôi phục viewport gốc
    const viewport = document.querySelector("meta[name=viewport]");
    if (viewport && this.fullscreenImageOverlay._originalViewport) {
      viewport.content = this.fullscreenImageOverlay._originalViewport;
      delete this.fullscreenImageOverlay._originalViewport;
    }

    // Xóa touch gestures
    this._removeTouchGestures();
  }

  /**
   * Helper to show a popup/loading overlay and apply `active` class.
   * @param {HTMLElement} element - The overlay element (popup or loading).
   */
  _activateOverlay(element) {
    element.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }

  /**
   * Helper to hide a popup/loading overlay.
   * @param {HTMLElement} element - The overlay element (popup or loading).
   */
  _deactivateOverlay(element) {
    element.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }

  _setupGlobalImageClickListener() {
    const handleImageActivation = (event) => {
      const clickedElement = event.target;

      if (
        clickedElement.tagName === "IMG" &&
        clickedElement.id !== "fullscreenImage" &&
        clickedElement.src &&
        clickedElement.src !== window.location.href &&
        clickedElement.id !== "fullscreenLogo1" &&
        clickedElement.id !== "fullscreenLogo2"
      ) {
        event.preventDefault();
        console.log("View Image By Vu");
        this.showFullscreenImage(clickedElement.src);
      }
    };

    document.body.addEventListener("click", handleImageActivation);
    document.body.addEventListener("touchend", handleImageActivation);
  }

  /**
   * Displays a confirmation popup with custom title, content, and callbacks.
   * @param {Object} options - Options for the popup.
   * @param {string} [options.title="Thông báo"] - The title of the popup.
   * @param {string} [options.content="Nội dung popup"] - The main content of the popup.
   * @param {string} [options.iconSvg=''] - SVG string for the icon.
   * @param {string} [options.confirmText="Đồng ý"] - Text for the confirm button.
   * @param {string} [options.cancelText="Hủy"] - Text for the cancel button.
   * @param {Function} [options.onConfirm=null] - Callback function when 'Đồng ý' is clicked.
   * @param {Function} [options.onCancel=null] - Callback function when 'Hủy' is clicked or popup is closed.
   */
  showConfirmPopup({
    title = "Thông báo",
    content = "Nội dung popup",
    iconSvg = "",
    confirmText = "Đồng ý", // New option for custom confirm button text
    cancelText = "Hủy", // New option for custom cancel button text
    onConfirm = null,
    onCancel = null,
  }) {
    const overlay = this.confirmPopupOverlay;
    const titleEl = overlay.querySelector(".vc-popup-title");
    const contentEl = overlay.querySelector(".vc-popup-content");
    const iconEl = overlay.querySelector(".Vu-VC-popup-icon");
    const btnOK = overlay.querySelector(".vc-btn-ok");
    const btnCancel = overlay.querySelector(".vc-btn-cancel");

    titleEl.textContent = title;
    contentEl.innerHTML = content;
    iconEl.innerHTML = iconSvg;
    btnOK.textContent = confirmText; // Set custom text
    btnCancel.textContent = cancelText; // Set custom text

    overlay._onConfirmCallback = onConfirm;
    overlay._onCancelCallback = onCancel;

    const closePopup = () => {
      this._deactivateOverlay(overlay);
      overlay._onConfirmCallback = null;
      overlay._onCancelCallback = null;
    };

    btnOK.onclick = () => {
      if (overlay._onConfirmCallback) overlay._onConfirmCallback();
      closePopup();
    };

    btnCancel.onclick = () => {
      if (overlay._onCancelCallback) overlay._onCancelCallback();
      closePopup();
    };

    this._activateOverlay(overlay);
  }

  /**
   * Displays an informational popup.
   * @param {Object} options - Options for the popup.
   * @param {string} [options.title="Thông báo"] - The title of the popup.
   * @param {string} [options.content="Nội dung popup"] - The main content of the popup.
   * @param {string} [options.iconSvg=''] - SVG string for the icon.
   * @param {string} [options.okText="Đã hiểu"] - Text for the OK button. // NEW: Tham số okText
   * @param {Function} [options.onOk=null] - Callback function when 'OK' is clicked or popup is closed.
   * @param {number} [options.timeout=0] - Duration in milliseconds after which the popup automatically closes. If 0, it stays open until manually closed.
   */
  showInfoPopup({
    title = "Thông báo",
    content = "Nội dung popup",
    iconSvg = "",
    okText = "Đã hiểu",
    onOk = null,
    timeout = 0,
  }) {
    const overlay = this.infoPopupOverlay;
    const titleEl = overlay.querySelector(".vc-popup-title");
    const contentEl = overlay.querySelector(".vc-popup-content");
    const iconEl = overlay.querySelector(".Vu-VC-popup-icon");
    const btnOK = overlay.querySelector(".vc-btn-ok");

    titleEl.textContent = title;
    contentEl.innerHTML = content;
    iconEl.innerHTML = iconSvg;
    btnOK.textContent = okText; // NEW: Gán văn bản tùy chỉnh cho nút OK

    overlay._onOkCallback = onOk;

    // Clear any existing timeout to prevent unexpected behavior if popup is re-used
    if (overlay._timeoutId) {
      clearTimeout(overlay._timeoutId);
      overlay._timeoutId = null;
    }

    const closePopup = () => {
      this._deactivateOverlay(overlay);
      overlay._onOkCallback = null;
      if (overlay._timeoutId) {
        // Clear timeout when closed manually as well
        clearTimeout(overlay._timeoutId);
        overlay._timeoutId = null;
      }
    };

    btnOK.onclick = () => {
      if (overlay._onOkCallback) overlay._onOkCallback();
      closePopup();
    };

    this._activateOverlay(overlay);

    // Tự động đóng popup sau thời gian timeout
    if (timeout > 0) {
      overlay._timeoutId = setTimeout(() => {
        closePopup();
        if (overlay._onOkCallback) overlay._onOkCallback(); // Call onOk when auto-closed
      }, timeout);
    }
  }

  /**
   * Displays a popup with three options (confirm, cancel, and a third custom option).
   * @param {Object} options - Options for the popup.
   * @param {string} [options.title="Thông báo"] - The title of the popup.
   * @param {string} [options.content="Nội dung popup"] - The main content of the popup.
   * @param {string} [options.iconSvg=''] - SVG string for the icon.
   * @param {string} [options.confirmText="Đồng ý"] - Text for the primary confirm button.
   * @param {string} [options.cancelText="Hủy"] - Text for the cancel button.
   * @param {string} [options.thirdOptionText="Tùy chọn khác"] - Text for the third custom button.
   * @param {Function} [options.onConfirm=null] - Callback function when the primary confirm button is clicked.
   * @param {Function} [options.onCancel=null] - Callback function when the cancel button or exit button is clicked, or overlay is clicked.
   * @param {Function} [options.onThirdOption=null] - Callback function when the third custom button is clicked.
   */
  showThreeOptionPopup({
    title = "Thông báo",
    content = "Nội dung popup",
    iconSvg = "",
    confirmText = "Đồng ý",
    cancelText = "Hủy",
    thirdOptionText = "Tùy chọn khác",
    onConfirm = null,
    onCancel = null,
    onThirdOption = null,
  }) {
    const overlay = this.threeOptionPopupOverlay;
    const titleEl = overlay.querySelector(".vc-popup-title");
    const contentEl = overlay.querySelector(".vc-popup-content");
    const iconEl = overlay.querySelector(".Vu-VC-popup-icon");
    const btnOK = overlay.querySelector(".vc-btn-ok");
    const btnCancel = overlay.querySelector(".vc-btn-cancel");
    const btnThird = overlay.querySelector(".vc-btn-third");

    titleEl.textContent = title;
    contentEl.innerHTML = content;
    iconEl.innerHTML = iconSvg;
    btnOK.textContent = confirmText;
    btnCancel.textContent = cancelText;
    btnThird.textContent = thirdOptionText;

    overlay._onConfirmCallback = onConfirm;
    overlay._onCancelCallback = onCancel;
    overlay._onThirdOptionCallback = onThirdOption;

    const closePopup = () => {
      this._deactivateOverlay(overlay);
      overlay._onConfirmCallback = null;
      overlay._onCancelCallback = null;
      overlay._onThirdOptionCallback = null;
    };

    btnOK.onclick = () => {
      if (overlay._onConfirmCallback) overlay._onConfirmCallback();
      closePopup();
    };

    btnCancel.onclick = () => {
      if (overlay._onCancelCallback) overlay._onCancelCallback();
      closePopup();
    };

    btnThird.onclick = () => {
      if (overlay._onThirdOptionCallback) overlay._onThirdOptionCallback();
      closePopup();
    };

    this._activateOverlay(overlay);
  }

  /**
   * Displays a fast alert message at the bottom right of the screen.
   * @param {Object} options - Options for the alert.
   * @param {'error'|'success'|'notice'|'warning'} options.type - Type of alert (determines color and icon).
   * @param {string} options.message - The message to display.
   * @param {number} [options.duration=5000] - Duration in milliseconds before the alert fades out.
   */
  showAlert({ type, message, duration = 3500 }) {
    const alertSvgIcons = {
      error: `<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37"></path></svg>`,
      success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9  10.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`,
      notice: `<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z" fill="#393a37"></path></svg>`,
      warning: `<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z" fill="#393a37"></path></svg>`,
    };

    if (!alertSvgIcons[type]) {
      console.warn(`Unknown alert type: ${type}. Defaulting to 'notice'.`);
      type = "notice";
    }

    const alertElement = document.createElement("div");
    alertElement.classList.add("alertFastMessgeByVu", type);
    alertElement.innerHTML = `
            <div class="iconAlert">
                ${alertSvgIcons[type]}
            </div>
            <div class="alertMessage">${message}</div>
        `;

    this.alertContainer.appendChild(alertElement);

    // Remove the alert after its duration
    setTimeout(() => {
      alertElement.style.animation = `fadeOut 0.5s ease-in forwards`;
      alertElement.addEventListener(
        "animationend",
        (event) => {
          if (event.animationName === "fadeOut") {
            alertElement.remove();
          }
        },
        { once: true }
      );
    }, duration);
  }

  /**
   * Shows the loading screen with an optional custom message.
   * @param {string} [message="Đang tải..."] - The message to display on the loading screen.
   */
  showLoading(message = "Đang tải...") {
    if (this.loadingTextElement) {
      this.loadingTextElement.textContent = message;
    }
    this._activateOverlay(this.loadingScreenElement);
  }

  /**
   * Hides the loading screen.
   */
  hideLoading() {
    this._deactivateOverlay(this.loadingScreenElement);
  }

  /**
   * Thiết lập touch gestures cho zoom và pan ảnh trên mobile
   */
  _setupImageTouchGestures() {
    if (!this.fullscreenImage) return;

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let lastTouchDistance = 0;
    let lastTouchCenter = { x: 0, y: 0 };
    let isZooming = false;
    let isPanning = false;
    let lastTouchTime = 0;

    const minScale = 1;
    const maxScale = 4;

    // Double tap to zoom
    const handleDoubleClick = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastTouchTime < 300) {
        if (scale === 1) {
          scale = 2;
          const rect = this.fullscreenImage.getBoundingClientRect();
          const centerX = e.clientX || e.touches[0].clientX;
          const centerY = e.clientY || e.touches[0].clientY;

          translateX = (rect.width / 2 - centerX) * (scale - 1);
          translateY = (rect.height / 2 - centerY) * (scale - 1);
        } else {
          scale = 1;
          translateX = 0;
          translateY = 0;
        }
        this._updateImageTransform(scale, translateX, translateY);
      }
      lastTouchTime = now;
    };

    // Touch start
    const handleTouchStart = (e) => {
      e.preventDefault();

      if (e.touches.length === 2) {
        isZooming = true;
        isPanning = false;

        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        lastTouchDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );

        lastTouchCenter = {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2,
        };
      } else if (e.touches.length === 1 && scale > 1) {
        isPanning = true;
        isZooming = false;

        lastTouchCenter = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    // Touch move
    const handleTouchMove = (e) => {
      e.preventDefault();

      if (isZooming && e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );

        if (lastTouchDistance > 0) {
          const scaleChange = currentDistance / lastTouchDistance;
          scale = Math.min(Math.max(scale * scaleChange, minScale), maxScale);

          // Adjust translation to zoom toward touch center
          const currentCenter = {
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2,
          };

          const rect = this.fullscreenImage.getBoundingClientRect();
          const scaleRatio = scale / (scale / scaleChange);

          translateX =
            (currentCenter.x - rect.width / 2) * (1 - scaleRatio) +
            translateX * scaleRatio;
          translateY =
            (currentCenter.y - rect.height / 2) * (1 - scaleRatio) +
            translateY * scaleRatio;

          this._updateImageTransform(scale, translateX, translateY);
        }

        lastTouchDistance = currentDistance;
        lastTouchCenter = {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2,
        };
      } else if (isPanning && e.touches.length === 1) {
        const currentTouch = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };

        const deltaX = currentTouch.x - lastTouchCenter.x;
        const deltaY = currentTouch.y - lastTouchCenter.y;

        translateX += deltaX;
        translateY += deltaY;

        // Constrain translation
        const rect = this.fullscreenImage.getBoundingClientRect();
        const maxTranslateX = (rect.width * (scale - 1)) / 2;
        const maxTranslateY = (rect.height * (scale - 1)) / 2;

        translateX = Math.min(
          Math.max(translateX, -maxTranslateX),
          maxTranslateX
        );
        translateY = Math.min(
          Math.max(translateY, -maxTranslateY),
          maxTranslateY
        );

        this._updateImageTransform(scale, translateX, translateY);

        lastTouchCenter = currentTouch;
      }
    };

    // Touch end
    const handleTouchEnd = (e) => {
      if (e.touches.length === 0) {
        isZooming = false;
        isPanning = false;
        lastTouchDistance = 0;
      } else if (e.touches.length === 1) {
        isZooming = false;
        if (scale > 1) {
          isPanning = true;
          lastTouchCenter = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
          };
        }
      }
    };

    // Lưu trữ event handlers để có thể remove sau
    this._imageGestureHandlers = {
      touchStart: handleTouchStart,
      touchMove: handleTouchMove,
      touchEnd: handleTouchEnd,
      doubleClick: handleDoubleClick,
    };

    // Thêm event listeners
    this.fullscreenImage.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    this.fullscreenImage.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    this.fullscreenImage.addEventListener("touchend", handleTouchEnd, {
      passive: false,
    });
    this.fullscreenImage.addEventListener("click", handleDoubleClick);
  }

  /**
   * Cập nhật transform của ảnh
   */
  _updateImageTransform(scale, translateX, translateY) {
    if (this.fullscreenImage) {
      this.fullscreenImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    }
  }

  /**
   * Xóa touch gesture event listeners
   */
  _removeTouchGestures() {
    if (this.fullscreenImage && this._imageGestureHandlers) {
      this.fullscreenImage.removeEventListener(
        "touchstart",
        this._imageGestureHandlers.touchStart
      );
      this.fullscreenImage.removeEventListener(
        "touchmove",
        this._imageGestureHandlers.touchMove
      );
      this.fullscreenImage.removeEventListener(
        "touchend",
        this._imageGestureHandlers.touchEnd
      );
      this.fullscreenImage.removeEventListener(
        "click",
        this._imageGestureHandlers.doubleClick
      );
      delete this._imageGestureHandlers;
    }
  }
}

// Export a singleton instance of the UIElements class
export const uiManager = new UIElements_VaoCa();
