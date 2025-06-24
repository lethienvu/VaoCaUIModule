function addModuleCss() {
    let head = document.head || document.getElementsByTagName('head')[0];
    if (!head) {
        head = document.createElement('head');
        document.documentElement.prepend(head);
    }

    if (!document.getElementById('cameraModuleStyle')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'cameraModuleStyle';
        styleTag.textContent = `
            html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .vu-captured-photo-display {
                margin-top: 20px;
                max-width: 90%;
                height: auto;
                border: 2px solid #ddd;
                display: none;
                z-index: 10;
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
                background-color: #000;
                display: none;
                flex-direction: column;
                justify-content: space-between;
                overflow: hidden;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            .vu-camera-app-container.active {
                display: flex;
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
                transform: scaleX(-1);
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
                background: linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0));
                padding-top: calc(15px + env(safe-area-inset-top));
            }

            .vu-camera-app-container .vu-header-left i,
            .vu-camera-app-container .vu-header-right i {
                font-size: 20px;
                color: #fff;
                cursor: pointer;
                padding: 5px;
            }

            .vu-camera-app-container .vu-header-right .fas.fa-bolt.active {
                color: yellow;
            }

            .vu-camera-app-container .vu-header-center {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 16px;
                font-weight: bold;
                color: #fff;
                cursor: pointer;
            }

            .vu-camera-app-container .vu-header-center .vu-flag-icon {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                object-fit: cover;
            }

            .vu-camera-app-container .vu-qr-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2;
            }

            .vu-camera-app-container .vu-qr-frame {
                width: 250px;
                height: 250px;
                position: relative;
                box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6);
                border-radius: 10px;
            }

            .vu-camera-app-container .vu-corner {
                position: absolute;
                width: 40px;
                height: 40px;
                border: 3px solid #fff;
                box-sizing: border-box;
            }

            .vu-camera-app-container .vu-top-left {
                top: 0;
                left: 0;
                border-right: none;
                border-bottom: none;
                border-top-left-radius: 10px;
            }

            .vu-camera-app-container .vu-top-right {
                top: 0;
                right: 0;
                border-left: none;
                border-bottom: none;
                border-top-right-radius: 10px;
            }

            .vu-camera-app-container .vu-bottom-left {
                bottom: 0;
                left: 0;
                border-right: none;
                border-top: none;
                border-bottom-left-radius: 10px;
            }

            .vu-camera-app-container .vu-bottom-right {
                bottom: 0;
                right: 0;
                border-left: none;
                border-top: none;
                border-bottom-right-radius: 10px;
            }

            .vu-camera-app-container .vu-bottom-content {
                text-align: center;
                position: relative;
                z-index: 3;
                background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0));
                padding: 20px 0 40px 0;
                margin-top: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .vu-camera-app-container .vu-scan-text {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 5px;
                color: #fff;
            }

            .vu-camera-app-container .vu-supported-services {
                font-size: 14px;
                color: #ccc;
                margin-bottom: 30px;
            }

            .vu-camera-app-container .vu-supported-services .vu-highlight {
                color: #4CAF50;
                font-weight: bold;
            }

            .vu-camera-app-container .vu-upload-button,
            .vu-camera-app-container .vu-take-photo-button,
            .vu-camera-app-container .vu-toggle-play-button {
                background-color: rgba(255, 255, 255, 0.15);
                color: #fff;
                border: none;
                padding: 12px 25px;
                border-radius: 25px;
                font-size: 16px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                transition: background-color 0.3s ease;
                margin: 0 10px 10px 10px;
            }

            .vu-camera-app-container .vu-upload-button:hover,
            .vu-camera-app-container .vu-take-photo-button:hover,
            .vu-camera-app-container .vu-toggle-play-button:hover {
                background-color: rgba(255, 255, 255, 0.25);
            }

            .vu-camera-app-container .vu-upload-button i,
            .vu-camera-app-container .vu-take-photo-button i,
            .vu-camera-app-container .vu-toggle-play-button i {
                font-size: 18px;
            }

            .vu-camera-app-container .vu-take-photo-button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .vu-camera-app-container .vu-navbar {
                display: flex;
                justify-content: center;
                background-color: rgba(0, 0, 0, 0.7);
                padding: 15px 0;
                position: relative;
                z-index: 3;
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
                padding-bottom: calc(15px + env(safe-area-inset-bottom));
            }

            .vu-camera-app-container .vu-nav-button {
                background-color: transparent;
                border: none;
                color: #fff;
                padding: 10px 20px;
                margin: 0 5px;
                border-radius: 20px;
                font-size: 15px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: background-color 0.3s ease;
            }

            .vu-camera-app-container .vu-nav-button i {
                font-size: 18px;
            }

            .vu-camera-app-container .vu-nav-button.active {
                background-color: rgba(255, 255, 255, 0.2);
                font-weight: bold;
            }

            .vu-camera-app-container .vu-nav-button:not(.active):hover {
                background-color: rgba(255, 255, 255, 0.1);
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
    container.className = 'vu-camera-app-container'; // Thêm class mới

    const cameraFeedContainer = document.createElement('div');
    cameraFeedContainer.className = 'vu-camera-feed-container'; // Đổi class
    const video = document.createElement('video');
    video.id = 'vuCameraFeed'; // Đổi ID
    video.className = 'vu-camera-feed'; // Thêm class mới
    video.playsInline = true;
    cameraFeedContainer.appendChild(video);
    container.appendChild(cameraFeedContainer);

    const header = document.createElement('header');
    header.className = 'vu-header'; // Đổi class

    const headerLeft = document.createElement('div');
    headerLeft.className = 'vu-header-left'; // Đổi class
    const backIcon = document.createElement('i');
    backIcon.className = 'fas fa-chevron-left';
    backIcon.id = 'vuBackButton'; // Đổi ID
    headerLeft.appendChild(backIcon);
    header.appendChild(headerLeft);

    const headerCenter = document.createElement('div');
    headerCenter.className = 'vu-header-center'; // Đổi class
    const flagImg = document.createElement('img');
    flagImg.src = 'https://flagicons.lipis.dev/flags/4x3/vn.svg';
    flagImg.alt = 'Cờ Việt Nam';
    flagImg.className = 'vu-flag-icon'; // Đổi class
    const countrySpan = document.createElement('span');
    countrySpan.textContent = 'Việt Nam';
    const dropdownIcon = document.createElement('i');
    dropdownIcon.className = 'fas fa-chevron-down';
    headerCenter.appendChild(flagImg);
    headerCenter.appendChild(countrySpan);
    headerCenter.appendChild(dropdownIcon);
    header.appendChild(headerCenter);

    const headerRight = document.createElement('div');
    headerRight.className = 'vu-header-right'; // Đổi class
    const flashIcon = document.createElement('i');
    flashIcon.className = 'fas fa-bolt';
    flashIcon.id = 'vuFlashButton'; // Đổi ID
    headerRight.appendChild(flashIcon);
    header.appendChild(headerRight);
    container.appendChild(header);

    const qrOverlay = document.createElement('div');
    qrOverlay.className = 'vu-qr-overlay'; // Đổi class
    const qrFrame = document.createElement('div');
    qrFrame.className = 'vu-qr-frame'; // Đổi class
    ['vu-top-left', 'vu-top-right', 'vu-bottom-left', 'vu-bottom-right'].forEach(cls => { // Đổi class
        const corner = document.createElement('div');
        corner.className = `vu-corner ${cls}`; // Đổi class
        qrFrame.appendChild(corner);
    });
    qrOverlay.appendChild(qrFrame);
    container.appendChild(qrOverlay);

    const bottomContent = document.createElement('div');
    bottomContent.className = 'vu-bottom-content'; // Đổi class

    const scanText = document.createElement('p');
    scanText.className = 'vu-scan-text'; // Đổi class
    scanText.textContent = 'Quét mọi mã QR';
    bottomContent.appendChild(scanText);

    const supportedServices = document.createElement('p');
    supportedServices.className = 'vu-supported-services'; // Đổi class
    supportedServices.innerHTML = 'Ngân hàng • Zalopay • <span class="vu-highlight">V</span>I<span class="vu-highlight">ETQR</span> • napas 247'; // Đổi class
    bottomContent.appendChild(supportedServices);

    const togglePlayButton = document.createElement('button');
    togglePlayButton.className = 'vu-toggle-play-button'; // Đổi class
    togglePlayButton.id = 'vuTogglePlayButton'; // Đổi ID
    togglePlayButton.innerHTML = '<i class="fas fa-play"></i> Bắt đầu xem trước';
    bottomContent.appendChild(togglePlayButton);

    const uploadButton = document.createElement('button');
    uploadButton.className = 'vu-upload-button'; // Đổi class
    uploadButton.innerHTML = '<i class="fas fa-image"></i> Tải ảnh từ máy';
    const imageUploadInput = document.createElement('input');
    imageUploadInput.type = 'file';
    imageUploadInput.id = 'vuImageUpload'; // Đổi ID
    imageUploadInput.accept = 'image/*';
    imageUploadInput.style.display = 'none';
    bottomContent.appendChild(uploadButton);
    bottomContent.appendChild(imageUploadInput);

    const takePhotoButton = document.createElement('button');
    takePhotoButton.className = 'vu-take-photo-button'; // Đổi class
    takePhotoButton.innerHTML = '<i class="fas fa-camera"></i> Chụp ảnh';
    takePhotoButton.id = 'vuTakePhotoButton'; // Đổi ID
    bottomContent.appendChild(takePhotoButton);
    container.appendChild(bottomContent);

    const navbar = document.createElement('nav');
    navbar.className = 'vu-navbar'; // Đổi class

    const navButton1 = document.createElement('button');
    navButton1.className = 'vu-nav-button active'; // Đổi class
    navButton1.innerHTML = '<i class="fas fa-qrcode"></i> Mã thanh toán';
    navbar.appendChild(navButton1);

    const navButton2 = document.createElement('button');
    navButton2.className = 'vu-nav-button'; // Đổi class
    navButton2.innerHTML = '<i class="fas fa-money-bill-wave"></i> Mã nhận tiền';
    navbar.appendChild(navButton2);
    container.appendChild(navbar);

    const photoCanvas = document.createElement('canvas');
    photoCanvas.id = 'vuPhotoCanvas'; // Đổi ID
    photoCanvas.style.display = 'none';
    container.appendChild(photoCanvas);

    return container;
}

export class CameraApp {
    constructor(options = {}) {
        if (!document.documentElement) {
            document.appendChild(document.createElement('html'));
        }
        if (!document.head) {
            document.documentElement.appendChild(document.createElement('head'));
        }
        if (!document.body) {
            document.documentElement.appendChild(document.createElement('body'));
        }

        addModuleCss();

        this.options = {
            containerId: 'vuCameraAppContainer', // Đổi ID
            facingMode: 'environment',
            onOpen: () => {},
            onClose: () => {},
            onPhotoTaken: () => {},
            onPhotoLoaded: () => {},
            ...options
        };

        this.cameraAppContainer = null;
        this.cameraFeed = null;
        this.uploadButton = null;
        this.imageUploadInput = null;
        this.flashButton = null;
        this.backButton = null;
        this.takePhotoButton = null;
        this.photoCanvas = null;
        this.photoContext = null;
        this.capturedPhotoDisplay = null;
        this.togglePlayButton = null;

        this.stream = null;
        this.track = null;
        this.flashEnabled = false;

        this._isInitialized = false;
    }

    init() {
        if (this._isInitialized) {
            console.warn("CameraApp đã được khởi tạo. Không cần gọi init() lần nữa.");
            return;
        }

        this.cameraAppContainer = createCameraAppContainer(this.options.containerId);
        document.body.appendChild(this.cameraAppContainer);

        this.capturedPhotoDisplay = document.createElement('img');
        this.capturedPhotoDisplay.id = 'vuCapturedPhotoDisplay'; // Đổi ID
        this.capturedPhotoDisplay.className = 'vu-captured-photo-display'; // Thêm class mới
        this.capturedPhotoDisplay.alt = 'Ảnh đã chụp';
        this.capturedPhotoDisplay.style.display = 'none';
        document.body.appendChild(this.capturedPhotoDisplay);

        this.cameraFeed = this.cameraAppContainer.querySelector('#vuCameraFeed'); // Đổi ID
        this.uploadButton = this.cameraAppContainer.querySelector('.vu-upload-button'); // Đổi class
        this.imageUploadInput = this.cameraAppContainer.querySelector('#vuImageUpload'); // Đổi ID
        this.flashButton = this.cameraAppContainer.querySelector('#vuFlashButton'); // Đổi ID
        this.backButton = this.cameraAppContainer.querySelector('#vuBackButton'); // Đổi ID
        this.takePhotoButton = this.cameraAppContainer.querySelector('#vuTakePhotoButton'); // Đổi ID
        this.photoCanvas = this.cameraAppContainer.querySelector('#vuPhotoCanvas'); // Đổi ID
        this.photoContext = this.photoCanvas.getContext('2d');
        this.togglePlayButton = this.cameraAppContainer.querySelector('#vuTogglePlayButton'); // Đổi ID

        this._addEventListeners();

        this._isInitialized = true;
        console.log("CameraApp đã được khởi tạo bởi Vu.");
    }

    _addEventListeners() {
        if (this.backButton) {
            this.backButton.addEventListener('click', () => this.stopStream());
        }
        if (this.flashButton) {
            this.flashButton.addEventListener('click', () => this._toggleFlash());
        }
        if (this.uploadButton) {
            this.uploadButton.addEventListener('click', () => {
                if (this.imageUploadInput) {
                    this.imageUploadInput.click();
                }
            });
        }
        if (this.imageUploadInput) {
            this.imageUploadInput.addEventListener('change', (event) => this._handleImageUpload(event));
        }
        if (this.takePhotoButton) {
            this.takePhotoButton.addEventListener('click', () => this.takePhoto());
            this.takePhotoButton.disabled = true;
        }
        if (this.togglePlayButton) {
            this.togglePlayButton.addEventListener('click', () => this._toggleVideoStream());
        }

        const navButtons = this.cameraAppContainer.querySelectorAll('.vu-nav-button'); // Đổi class
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                console.log(`Chuyển sang: ${button.textContent.trim()} bởi Vu.`);
            });
        });
    }

    async startStream() {
        if (!this._isInitialized) {
            console.error("CameraApp chưa được khởi tạo bởi Vu. Vui lòng gọi init() trước.");
            return;
        }
        
        if (this.stream) {
            this.cameraAppContainer.classList.add('active');
            this.options.onOpen();
            return;
        }

        this.cameraAppContainer.classList.add('active');
        this.options.onOpen();

        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: this.options.facingMode,
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });

            this.cameraFeed.srcObject = this.stream;
            this.cameraFeed.style.display = 'block';

            this.track = this.stream.getVideoTracks()[0];

            if (this.track && 'torch' in this.track.getCapabilities()) {
                this.flashButton.style.display = 'block';
            } else {
                this.flashButton.style.display = 'none';
            }

            console.log("Camera đã được mở thành công bởi Vu.");
            
            this.togglePlayButton.innerHTML = '<i class="fas fa-play"></i> Bắt đầu xem trước';
            this.takePhotoButton.disabled = true;

            if (this.capturedPhotoDisplay) this.capturedPhotoDisplay.style.display = 'none';

        } catch (err) {
            console.error("Lỗi khi truy cập camera bởi Vu: ", err);
            alert("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập hoặc thiết bị của bạn không có camera/webcam.");
            this.cameraFeed.style.display = 'none';
            this.flashButton.style.display = 'none';
            this.cameraAppContainer.classList.remove('active');
            this.options.onClose();
        }
    }

    stopStream() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.cameraFeed.srcObject = null;
            this.stream = null;
            this.track = null;
            this.cameraFeed.style.display = 'none';
            this.flashButton.style.display = 'none';
            this.flashButton.classList.remove('active');
            this.flashEnabled = false;
            console.log("Camera đã được dừng bởi Vu.");
            
            this.cameraFeed.pause();
            this.togglePlayButton.innerHTML = '<i class="fas fa-play"></i> Bắt đầu xem trước';
            this.takePhotoButton.disabled = true;
        }
        this.cameraAppContainer.classList.remove('active');
        this.options.onClose();
    }

    _toggleVideoStream() {
        if (!this.stream) {
            alert("Vui lòng mở giao diện camera trước bởi Vu.");
            return;
        }

        if (this.cameraFeed.paused) {
            this.cameraFeed.play();
            this.togglePlayButton.innerHTML = '<i class="fas fa-pause"></i> Tạm dừng xem trước';
            this.takePhotoButton.disabled = false;
            console.log("Xem trước camera đã bắt đầu bởi Vu.");
        } else {
            this.cameraFeed.pause();
            this.togglePlayButton.innerHTML = '<i class="fas fa-play"></i> Tiếp tục xem trước';
            this.takePhotoButton.disabled = true;
            console.log("Xem trước camera đã tạm dừng bởi Vu.");
        }
    }

    takePhoto() {
        if (!this.stream || this.cameraFeed.paused) {
            alert("Vui lòng bắt đầu xem trước camera trước khi chụp ảnh bởi Vu.");
            return null;
        }

        this.photoCanvas.width = this.cameraFeed.videoWidth;
        this.photoCanvas.height = this.cameraFeed.videoHeight;
        this.photoContext.drawImage(this.cameraFeed, 0, 0, this.photoCanvas.width, this.photoCanvas.height);
        const imageDataURL = this.photoCanvas.toDataURL('image/png');
        console.log("Ảnh đã được chụp và chuyển thành Base64 bởi Vu.");

        if (this.capturedPhotoDisplay) {
            this.capturedPhotoDisplay.src = imageDataURL;
            this.capturedPhotoDisplay.style.display = 'block';
        }

        this.options.onPhotoTaken(imageDataURL);
        return imageDataURL;
    }

    _handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (this.options.onPhotoLoaded) this.options.onPhotoLoaded(e.target.result);
                if (this.capturedPhotoDisplay) {
                    this.capturedPhotoDisplay.src = e.target.result;
                    this.capturedPhotoDisplay.style.display = 'block';
                }
                console.log('Ảnh từ máy đã được tải và chuyển thành Base64 bởi Vu.');
            };
            reader.readAsDataURL(file);
        }
        event.target.value = '';
    }

    async _toggleFlash() {
        if (this.track && 'torch' in this.track.getCapabilities()) {
            try {
                await this.track.applyConstraints({
                    advanced: [{ torch: !this.flashEnabled }]
                });
                this.flashEnabled = !this.flashEnabled;
                this.flashButton.classList.toggle('active', this.flashEnabled);
                console.log(`Flash đã ${this.flashEnabled ? 'bật' : 'tắt'} bởi Vu.`);
            } catch (err) {
                console.error("Lỗi khi bật/tắt flash bởi Vu: ", err);
            }
        } else {
            console.log("Thiết bị không hỗ trợ flash hoặc camera chưa được mở bởi Vu.");
        }
    }

    destroy() {
        this.stopStream();

        if (this.backButton) {
            this.backButton.removeEventListener('click', () => this.stopStream());
        }
        if (this.togglePlayButton) {
            this.togglePlayButton.removeEventListener('click', () => this._toggleVideoStream());
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