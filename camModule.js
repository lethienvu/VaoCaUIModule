function addModuleCss() {
    let head = document.head || document.getElementsByTagName('head')[0];
    if (!head) {
        head = document.createElement('head');
        document.documentElement.prepend(head);
    }

    if (!document.getElementById('vuCameraModuleStyle')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'vuCameraModuleStyle';
        styleTag.textContent = `
            html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
            }

            .vu-camera-app-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                max-width: none;
                margin: 0;
                padding: 0;
                z-index: 9999;
                background-color: rgba(0, 0, 0, .2);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                overflow: hidden;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }

            .vu-camera-app-container.active {
                opacity: 1;
                visibility: visible;
            }

            .vu-camera-app-container .vu-camera-feed-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                z-index: 1;
            }

            .vu-camera-app-container .vu-camera-feed {
                min-width: 100%;
                min-height: 100%;
                width: auto;
                height: auto;
                display: none;
                transform: scaleX(1);
                object-fit: cover;
                filter: brightness(0.8);
            }

            .vu-camera-app-container .vu-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                position: relative;
                z-index: 3;
                background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
                padding-top: calc(15px + env(safe-area-inset-top));
                height: 3rem;
            }

            .vu-camera-app-container .vu-header-left,
            .vu-camera-app-container .vu-header-right {
                padding: 0.5rem 1.5rem;
                display: flex;
                border-radius: 2rem;
                justify-content: center;
                align-items: center;
                background-color: rgba(255, 255, 255, 0.3);
                font-size: 1rem;
                color: #fff;
                cursor: pointer;
                transition: background-color 0.2s ease;
            }
            .vu-camera-app-container .vu-header-left:hover,
            .vu-camera-app-container .vu-header-right:hover {
                background-color: rgba(255, 255, 255, 0.4);
            }

            .vu-camera-app-container .vu-header-left svg {
                width: 1rem;
                height: 1rem;
                color: #fff;
                margin-right: 5px;
            }
            .vu-camera-app-container .vu-header-right svg {
                width: 1.2rem;
                height: 1.2rem;
                color: #fff;
            }

            .vu-camera-app-container .vu-qr-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                margin-top: 5rem;
                z-index: 2;
            }

            .vu-camera-app-container .vu-qr-frame {
                width: 80%;
                max-width: 400px;
                height: calc(100% - 17rem);
                max-height: 400px;
                position: relative;
                box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6);
                border-radius: 2rem;
            }
            @media (max-height: 600px) {
                .vu-camera-app-container .vu-qr-frame {
                    height: calc(100% - 12rem);
                }
            }


            .vu-camera-app-container .vu-corner {
                position: absolute;
                width: 2rem;
                height: 2rem;
                border: 3px solid #fff;
                box-sizing: border-box;
            }
            .vu-camera-app-container .vu-top-left {
                top: 0; left: 0;
                border-right: none; border-bottom: none;
                border-top-left-radius: 2rem;
            }
            .vu-camera-app-container .vu-top-right {
                top: 0; right: 0;
                border-left: none; border-bottom: none;
                border-top-right-radius: 2rem;
            }
            .vu-camera-app-container .vu-bottom-left {
                bottom: 0; left: 0;
                border-right: none; border-top: none;
                border-bottom-left-radius: 2rem;
            }
            .vu-camera-app-container .vu-bottom-right {
                bottom: 0; right: 0;
                border-left: none; border-top: none;
                border-bottom-right-radius: 2rem;
            }

            .vu-camera-app-container .vu-bottom-content {
                text-align: center;
                position: relative;
                z-index: 2003;
                background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
                padding: 20px 0 30px 0;
                margin-top: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                min-height: 6rem;
                padding-bottom: calc(30px + env(safe-area-inset-bottom));
            }

            .vu-camera-app-container .vu-take-photo-button {
                background-color: rgba(255, 255, 255, 0.15);
                color: #fff;
                border: 1px solid rgba(255, 255, 255, .4);
                padding: 1rem 3rem;
                border-radius: 3rem;
                font-size: 1rem;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                transition: background-color 0.3s ease;
                margin: 0 10px 10px 10px;
            }
            .vu-camera-app-container .vu-take-photo-button:hover {
                background-color: rgba(255, 255, 255, 0.25);
            }
            .vu-camera-app-container .vu-take-photo-button svg {
                width: 1.2rem;
                height: 1.2rem;
            }
            .vu-camera-app-container .vu-take-photo-button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .vu-camera-app-container .vu-navbar {
                display: flex;
                justify-content: center;
                background-color: transparent;
                margin-top: -3rem;
                margin-bottom: 1rem;
                padding: 0;
                position: relative;
                z-index: 2001;
                width: 100%;
            }

            .vu-camera-app-container .logoFooter {
                background-color: transparent;
                border: none;
                color: #fff;
                border-radius: 30px;
                cursor: pointer;
                display: flex;
                align-items: center;
                transition: background-color 0.3s ease;
                transform: scale(0.7);
            }

            .vu-camera-app-container .logoFooter svg {
                transform: scale(0.8);
            }

            .vu-captured-photo-display {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 90%;
                max-height: 90%;
                width: auto;
                height: auto;
                border: 2px solid #ddd;
                display: none;
                z-index: 2000;
                object-fit: contain;
                background-color: #000;
            }
        `;
        head.appendChild(styleTag);
    }

    if (!document.querySelector('link[href*="font-awesome"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
        head.appendChild(faLink);
    }
}

function createCameraAppContainer(id) {
    const container = document.createElement('div');
    container.id = id;
    container.className = 'vu-camera-app-container';

    const cameraFeedContainer = document.createElement('div');
    cameraFeedContainer.className = 'vu-camera-feed-container';
    const video = document.createElement('video');
    video.id = 'vuCameraFeed';
    video.className = 'vu-camera-feed';
    video.playsInline = true;
    cameraFeedContainer.appendChild(video);
    container.appendChild(cameraFeedContainer);

    const header = document.createElement('header');
    header.className = 'vu-header';

    const headerLeft = document.createElement('div');
    headerLeft.className = 'vu-header-left';
    headerLeft.id = 'vuBackButton';
    headerLeft.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
        </svg>
        Trở về
    `;
    header.appendChild(headerLeft);

    const headerRight = document.createElement('div');
    headerRight.className = 'vu-header-right';
    headerRight.id = 'vuSwitchCameraButton';
    headerRight.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-arrow-repeat" viewBox="0 0 16 16">
            <path
                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
            <path fill-rule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z" />
        </svg>
    `;
    header.appendChild(headerRight);
    container.appendChild(header);

    const qrOverlay = document.createElement('div');
    qrOverlay.className = 'vu-qr-overlay';
    const qrFrame = document.createElement('div');
    qrFrame.className = 'vu-qr-frame';
    ['vu-top-left', 'vu-top-right', 'vu-bottom-left', 'vu-bottom-right'].forEach(cls => {
        const corner = document.createElement('div');
        corner.className = `vu-corner ${cls}`;
        qrFrame.appendChild(corner);
    });
    qrOverlay.appendChild(qrFrame);
    container.appendChild(qrOverlay);

    const bottomContent = document.createElement('div');
    bottomContent.className = 'vu-bottom-content';

    const navbar = document.createElement('nav');
    navbar.className = 'vu-navbar';

    const logoFooter1 = document.createElement('div');
    logoFooter1.className = 'logoFooter';
    navbar.appendChild(logoFooter1);

    const logoFooter2 = document.createElement('div');
    logoFooter2.className = 'logoFooter';
    navbar.appendChild(logoFooter2);
    
    bottomContent.appendChild(navbar);

    const takePhotoButton = document.createElement('button');
    takePhotoButton.className = 'vu-take-photo-button';
    takePhotoButton.id = 'vuTakePhotoButton';
    takePhotoButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-camera-fill" viewBox="0 0 16 16">
            <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
            <path
                d="M2 4a2 0 0 0-2 2v6a2 0 0 0 2 2h12a2 0 0 0 2-2V6a2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 0 0 0 9.172 2H6.828a2 0 0 0-1.414.586l-.828.828A2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0" />
        </svg>
        Chụp ảnh chấm công
    `;
    bottomContent.appendChild(takePhotoButton);
    container.appendChild(bottomContent);

    const photoCanvas = document.createElement('canvas');
    photoCanvas.id = 'vuPhotoCanvas';
    photoCanvas.style.display = 'none';
    container.appendChild(photoCanvas);

    return container;
}

export class CameraApp {
    constructor(options = {}) {
        if (!document.documentElement) document.appendChild(document.createElement('html'));
        if (!document.head) document.documentElement.appendChild(document.createElement('head'));
        if (!document.body) document.documentElement.appendChild(document.createElement('body'));

        addModuleCss();

        this.options = {
            containerId: 'vuCameraAppContainer',
            facingMode: 'environment',
            onOpen: () => {},
            onClose: () => {},
            onPhotoTaken: () => {},
            autoStart: true,
            ...options
        };

        this.cameraAppContainer = null;
        this.cameraFeed = null;
        this.switchCameraButton = null;
        this.backButton = null;
        this.takePhotoButton = null;
        this.photoCanvas = null;
        this.photoContext = null;
        this.capturedPhotoDisplay = null;

        this.stream = null;
        this.track = null;
        this.currentFacingMode = this.options.facingMode;

        this._isInitialized = false;
    }

    init() {
        if (this._isInitialized) {
            console.warn("CameraApp đã được khởi tạo bởi Vu. Không cần gọi init() lần nữa.");
            return;
        }

        this.cameraAppContainer = createCameraAppContainer(this.options.containerId);
        document.body.appendChild(this.cameraAppContainer);

        this.capturedPhotoDisplay = document.createElement('img');
        this.capturedPhotoDisplay.id = 'vuCapturedPhotoDisplay';
        this.capturedPhotoDisplay.className = 'vu-captured-photo-display';
        this.capturedPhotoDisplay.alt = 'Ảnh đã chụp';
        this.capturedPhotoDisplay.style.display = 'none';
        document.body.appendChild(this.capturedPhotoDisplay);


        this.cameraFeed = this.cameraAppContainer.querySelector('#vuCameraFeed');
        this.switchCameraButton = this.cameraAppContainer.querySelector('#vuSwitchCameraButton');
        this.backButton = this.cameraAppContainer.querySelector('#vuBackButton');
        this.takePhotoButton = this.cameraAppContainer.querySelector('#vuTakePhotoButton');
        this.photoCanvas = this.cameraAppContainer.querySelector('#vuPhotoCanvas');
        this.photoContext = this.photoCanvas.getContext('2d');
        
        this._addEventListeners();

        this._isInitialized = true;
        console.log("CameraApp đã được khởi tạo bởi Vu.");
    }

    _addEventListeners() {
        if (this.backButton) {
            this.backButton.addEventListener('click', () => {
                this.close();
            });
        }
        if (this.switchCameraButton) {
            this.switchCameraButton.addEventListener('click', () => this._switchCamera());
        }
        if (this.takePhotoButton) {
            this.takePhotoButton.addEventListener('click', () => this.takePhoto());
            this.takePhotoButton.disabled = true;
        }
    }

    async open() {
        if (!this._isInitialized) {
            console.error("CameraApp chưa được khởi tạo bởi Vu. Vui lòng gọi init() trước.");
            return;
        }
        
        this.cameraAppContainer.classList.add('active');
        if (this.capturedPhotoDisplay) this.capturedPhotoDisplay.style.display = 'none';

        this.options.onOpen();

        if (this.options.autoStart) {
            await this.startStream();
        }
    }

    async startStream() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.cameraFeed.srcObject = null;
        }

        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: this.currentFacingMode,
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });

            this.cameraFeed.srcObject = this.stream;
            this.cameraFeed.style.display = 'block';
            await this.cameraFeed.play();
            
            this.track = this.stream.getVideoTracks()[0];

            if (this.currentFacingMode === 'user') {
                this.cameraFeed.style.transform = 'scaleX(-1)';
            } else {
                this.cameraFeed.style.transform = 'scaleX(1)';
            }

            this.takePhotoButton.disabled = false;

            console.log(`Camera đã được mở thành công bởi Vu. Chế độ: ${this.currentFacingMode}.`);

        } catch (err) {
            console.error("Lỗi khi truy cập camera bởi Vu: ", err);
            alert("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập hoặc thiết bị của bạn không có camera/webcam.");
            
            this.cameraFeed.style.display = 'none';
            this.takePhotoButton.disabled = true;
            this.cameraAppContainer.classList.remove('active');
            this.options.onClose();
        }
    }

    close() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.cameraFeed.srcObject = null;
            this.stream = null;
            this.track = null;
            this.cameraFeed.style.display = 'none';
            this.takePhotoButton.disabled = true;
            console.log("Camera đã được dừng bởi Vu.");
        }
        this.cameraAppContainer.classList.remove('active');
        if (this.capturedPhotoDisplay) this.capturedPhotoDisplay.style.display = 'none';
        this.options.onClose();
    }

    takePhoto() {
        if (!this.stream || this.cameraFeed.paused) {
            alert("Vui lòng đảm bảo camera đang hoạt động trước khi chụp ảnh bởi Vu.");
            return null;
        }

        this.photoCanvas.width = this.cameraFeed.videoWidth;
        this.photoCanvas.height = this.cameraFeed.videoHeight;
        
        this.photoContext.save();

        if (this.currentFacingMode === 'user') {
            this.photoContext.translate(this.photoCanvas.width, 0);
            this.photoContext.scale(-1, 1);
        }
        
        this.photoContext.drawImage(this.cameraFeed, 0, 0, this.photoCanvas.width, this.photoCanvas.height);
        
        this.photoContext.restore();

        const imageDataURL = this.photoCanvas.toDataURL('image/png');
        console.log("Ảnh đã được chụp và chuyển thành Base64 bởi Vu.");

        if (this.capturedPhotoDisplay) {
            this.capturedPhotoDisplay.src = imageDataURL;
            this.capturedPhotoDisplay.style.display = 'block';
        }

        this.options.onPhotoTaken(imageDataURL);
        return imageDataURL;
    }

    async _switchCamera() {
        this.currentFacingMode = (this.currentFacingMode === 'user') ? 'environment' : 'user';
        console.log(`Chuyển camera sang chế độ: ${this.currentFacingMode} bởi Vu.`);
        
        await this.startStream();
    }

    destroy() {
        this.close();

        if (this.backButton) {
            this.backButton.removeEventListener('click', () => this.close());
        }
        if (this.switchCameraButton) {
            this.switchCameraButton.removeEventListener('click', () => this._switchCamera());
        }
        if (this.takePhotoButton) {
            this.takePhotoButton.removeEventListener('click', () => this.takePhoto());
        }

        if (this.cameraAppContainer && this.cameraAppContainer.parentNode) {
            this.cameraAppContainer.parentNode.removeChild(this.cameraAppContainer);
        }
        if (this.capturedPhotoDisplay && this.capturedPhotoDisplay.parentNode) {
            this.capturedPhotoDisplay.parentNode.removeChild(this.capturedPhotoDisplay);
        }

        this._isInitialized = false;
        console.log("CameraApp đã được hủy bởi Vu.");
    }
}