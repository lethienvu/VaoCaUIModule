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
                background-color: rgba(0, 0, 0, 0.6);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.3s ease-out;
            }

            .VC-Vu-component-overlay.active {
                display: flex;
            }

            .VC-Vu-popup {
                width: 50%; 
                max-width: 400px; 
                background-color: rgba(255, 255, 255, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(12px) brightness(150%);
                -webkit-backdrop-filter: blur(20px);
                border-radius: 30px;
                padding: 20px 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                text-align: center;
                transform: scale(0.9);
                transition: transform 0.3s ease-out, opacity 0.3s ease-out;
                position: relative; 
            }


            .VC-Vu-popup .exitBtn {
                position: absolute;
                top: 10px;
                right: 10px;
                box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.08);
                background-color: rgb(255, 255, 255);
                border-radius: 50%;
                width: 30px;
                height: 30px;
                border: none;
                color: black;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0px !important;
            }

            .Vu-VC-popup-icon {
                transform: scale(1.5);
                margin-top: 10px;
                margin-bottom: 10px;
            }
            .Vu-VC-popup-icon svg {
                width: 80px; 
                height: auto;
                vertical-align: middle;
            }
            .Vu-VC-popup-icon path {
                fill: #004c39; 
            }

            .VC-Vu-popup h2 {
                margin: 0 0 10px;
                font-size: 1.2rem; 
                color: #004c39;
            }

            .VC-Vu-popup p {
                font-size: 1rem;
                margin-bottom: 20px;
                margin-top: 10px;
                line-height: 1.4;
            }

            .VC-Vu-popup-buttons {
                display: flex;
                justify-content: center; 
                gap: 20px;
                width: 100%;
                margin-top: 10px;
            }

            .VC-Vu-popup-buttons button {
                padding: 10px 20px;
                border: none;
                border-radius: 30px;
                cursor: pointer;
                font-weight: bold;
                width: 40%;
                transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            }

            .VC-Vu-btn-cancel {
                background-color: #ccc;
                color: #333;
            }
            .VC-Vu-btn-cancel:hover {
                background-color: #bbb;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            }

            .VC-Vu-btn-ok {
                background-color: #004c39;
                color: white;
            }
            .VC-Vu-btn-ok:hover {
                background-color: #006b53;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            }

            /* Responsive adjustments for popups */
            @media (max-width: 768px) {
                .VC-Vu-popup {
                    width: 60%;
                    padding: 15px 20px;
                }
                .VC-Vu-popup-buttons button {
                    width: 100%;
                }
            }

            #vc-vu-alert-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                z-index: 10000; 
            }

            .alertFastMessgeByVu {
                width: 80%;
                padding: 12px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: start;
                border-radius: 50px;
                box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
                position: relative;
                opacity: 0;
                transform: translateX(100%);
                animation: fadeInRight 0.3s ease-out forwards, fadeOut 0.5s ease-in forwards 4.5s;
                pointer-events: all; 
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
                background: #d10d0d;
                box-shadow: 0px 2px 8px #d10d0d;
            }

            .alertFastMessgeByVu.success {
                background: #269b24;
                box-shadow: 0px 2px 8px #269b24;
            }

            .alertFastMessgeByVu.notice {
                background: #509AF8;
                box-shadow: 0px 2px 8px #509AF8;
            }

            .alertFastMessgeByVu.warning {
                background-color: #F7C752;
                box-shadow: 0px 2px 8px #F7C752;
            }
            .alertFastMessgeByVu.warning .iconAlert path {
                fill: #333; 
            }
            .alertFastMessgeByVu.warning .alertMessage {
                color: #333;
            }

            .alertMessage {
                font-weight: 500;
                font-size: 1rem;
                color: #fff;
                flex-grow: 1;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            @media (max-width: 480px) {
                #vc-vu-alert-container {
                    bottom: 10px;
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
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.2);
                justify-content: center;
                align-items: center;
                display: none;
                z-index: 9999;
                backdrop-filter: blur(4px) brightness(.9);
                --webkit-backdrop-filter: blur(4px);
                animation: fadeIn 0.3s ease-out;
                color: #fff;
            }

            .VC-Vu-component-loading.active {
                display: flex;
            }

            #h3 {
                color: white;
                font-size: 1rem;
            }

            #loadingScreen #ring {
                width: 200px;
                height: 200px;
                border: 1px solid transparent;
                border-radius: 50%;
                position: absolute;
            }

            #loadingScreen #ring:nth-child(1) {
                border-bottom: 8px solid rgb(255, 141, 249);
                animation: rotate1 1s linear infinite;
            }

            @keyframes rotate1 {
                from {
                    transform: rotateX(50deg) rotateZ(110deg);
                }

                to {
                    transform: rotateX(50deg) rotateZ(470deg);
                }
            }

            #loadingScreen #ring:nth-child(2) {
                border-bottom: 8px solid rgb(255, 65, 106);
                animation: rotate2 1s linear infinite;
            }

            @keyframes rotate2 {
                from {
                    transform: rotateX(20deg) rotateY(50deg) rotateZ(20deg);
                }

                to {
                    transform: rotateX(20deg) rotateY(50deg) rotateZ(380deg);
                }
            }

            #loadingScreen #ring:nth-child(3) {
                border-bottom: 8px solid rgb(0, 255, 255);
                animation: rotate3 1s linear infinite;
            }

            @keyframes rotate3 {
                from {
                    transform: rotateX(40deg) rotateY(130deg) rotateZ(450deg);
                }

                to {
                    transform: rotateX(40deg) rotateY(130deg) rotateZ(90deg);
                }
            }

            #loadingScreen #ring:nth-child(4) {
                border-bottom: 8px solid rgb(252, 183, 55);
                animation: rotate4 1s linear infinite;
            }

            @keyframes rotate4 {
                from {
                    transform: rotateX(70deg) rotateZ(270deg);
                }

                to {
                    transform: rotateX(70deg) rotateZ(630deg);
                }
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
                <button class="exitBtn">×</button>
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
                <button class="exitBtn">×</button>
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
            <div id="ring"></div>
            <div id="ring"></div>
            <div id="ring"></div>
            <div id="ring"></div>
            <h3 id="loadingText">Đang tải...</h3> `;
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

  /**
   * Displays a confirmation popup with custom title, content, and callbacks.
   * @param {Object} options - Options for the popup.
   * @param {string} [options.title="Thông báo"] - The title of the popup.
   * @param {string} [options.content="Nội dung popup"] - The main content of the popup.
   * @param {string} [options.iconSvg=''] - SVG string for the icon.
   * @param {Function} [options.onConfirm=null] - Callback function when 'Đồng ý' is clicked.
   * @param {Function} [options.onCancel=null] - Callback function when 'Hủy' is clicked or popup is closed.
   */
  showConfirmPopup({
    title = "Thông báo",
    content = "Nội dung popup",
    iconSvg = "",
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
   * Displays a success/info/error popup with a single OK button.
   * @param {Object} options - Options for the popup.
   * @param {string} [options.title="Thông báo"] - The title of the popup.
   * @param {string} [options.content=""] - The main content of the popup.
   * @param {string} [options.iconSvg=''] - SVG string for the icon.
   * @param {Function} [options.onOk=null] - Callback function when 'OK' is clicked or popup is closed.
   */
  showInfoPopup({
    title = "Thông báo",
    content = "",
    iconSvg = "",
    onOk = null,
  }) {
    const overlay = this.infoPopupOverlay;
    const titleEl = overlay.querySelector(".vc-popup-title");
    const contentEl = overlay.querySelector(".vc-popup-content");
    const iconEl = overlay.querySelector(".Vu-VC-popup-icon");
    const btnOK = overlay.querySelector(".vc-btn-ok");

    titleEl.textContent = title;
    contentEl.innerHTML = content;
    iconEl.innerHTML = iconSvg;

    overlay._onOkCallback = onOk;

    const closePopup = () => {
      this._deactivateOverlay(overlay);
      overlay._onOkCallback = null;
    };

    btnOK.onclick = () => {
      if (overlay._onOkCallback) overlay._onOkCallback();
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
  showAlert({ type, message, duration = 5000 }) {
    const alertSvgIcons = {
      error: `<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37"></path></svg>`,
      success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`,
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
}

// Export a singleton instance of the UIElements class
export const uiManager = new UIElements_VaoCa();
