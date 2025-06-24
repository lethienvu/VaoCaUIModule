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

            #openCameraButton {
                padding: 15px 30px;
                font-size: 18px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                margin-top: 50px;
                z-index: 100;
            }

            #openCameraButton:hover {
                background-color: #0056b3;
            }

            #capturedPhotoDisplay {
                margin-top: 20px;
                max-width: 90%;
                height: auto;
                border: 2px solid #ddd;
                display: none;
                z-index: 10;
            }

            #cameraAppContainer {
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

            #cameraAppContainer.active {
                display: flex;
            }

            #cameraAppContainer .camera-feed-container {
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

            #cameraAppContainer #cameraFeed {
                min-width: 100%;
                min-height: 100%;
                width: auto;
                height: auto;
                display: none;
                transform: scaleX(-1);
                object-fit: cover;
                filter: brightness(0.8);
            }

            #cameraAppContainer .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                position: relative;
                z-index: 3;
                background: linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0));
                padding-top: calc(15px + env(safe-area-inset-top));
            }

            #cameraAppContainer .header-left i,
            #cameraAppContainer .header-right i {
                font-size: 20px;
                color: #fff;
                cursor: pointer;
                padding: 5px;
            }

            #cameraAppContainer .header-right .fas.fa-bolt.active {
                color: yellow;
            }

            #cameraAppContainer .header-center {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 16px;
                font-weight: bold;
                color: #fff;
                cursor: pointer;
            }

            #cameraAppContainer .header-center .flag-icon {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                object-fit: cover;
            }

            #cameraAppContainer .qr-overlay {
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

            #cameraAppContainer .qr-frame {
                width: 250px;
                height: 250px;
                position: relative;
                box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6);
            }

            #cameraAppContainer .corner {
                position: absolute;
                width: 40px;
                height: 40px;
                border: 3px solid #fff;
                box-sizing: border-box;
            }

            #cameraAppContainer .top-left {
                top: 0;
                left: 0;
                border-right: none;
                border-bottom: none;
                border-top-left-radius: 10px;
            }

            #cameraAppContainer .top-right {
                top: 0;
                right: 0;
                border-left: none;
                border-bottom: none;
                border-top-right-radius: 10px;
            }

            #cameraAppContainer .bottom-left {
                bottom: 0;
                left: 0;
                border-right: none;
                border-top: none;
                border-bottom-left-radius: 10px;
            }

            #cameraAppContainer .bottom-right {
                bottom: 0;
                right: 0;
                border-left: none;
                border-top: none;
                border-bottom-right-radius: 10px;
            }

            #cameraAppContainer .bottom-content {
                text-align: center;
                position: relative;
                z-index: 3;
                background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0));
                padding: 20px 0 40px 0;
                margin-top: auto;
            }

            #cameraAppContainer .scan-text {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 5px;
                color: #fff;
            }

            #cameraAppContainer .supported-services {
                font-size: 14px;
                color: #ccc;
                margin-bottom: 30px;
            }

            #cameraAppContainer .supported-services .highlight {
                color: #4CAF50;
                font-weight: bold;
            }

            #cameraAppContainer .upload-button,
            #cameraAppContainer .take-photo-button {
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

            #cameraAppContainer .upload-button:hover,
            #cameraAppContainer .take-photo-button:hover {
                background-color: rgba(255, 255, 255, 0.25);
            }

            #cameraAppContainer .upload-button i,
            #cameraAppContainer .take-photo-button i {
                font-size: 18px;
            }

            #cameraAppContainer .navbar {
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

            #cameraAppContainer .nav-button {
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

            #cameraAppContainer .nav-button i {
                font-size: 18px;
            }

            #cameraAppContainer .nav-button.active {
                background-color: rgba(255, 255, 255, 0.2);
                font-weight: bold;
            }

            #cameraAppContainer .nav-button:not(.active):hover {
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

    const cameraFeedContainer = document.createElement('div');
    cameraFeedContainer.className = 'camera-feed-container';
    const video = document.createElement('video');
    video.id = 'cameraFeed';
    video.autoplay = true;
    video.playsInline = true;
    cameraFeedContainer.appendChild(video);
    container.appendChild(cameraFeedContainer);

    const header = document.createElement('header');
    header.className = 'header';

    const headerLeft = document.createElement('div');
    headerLeft.className = 'header-left';
    const backIcon = document.createElement('i');
    backIcon.className = 'fas fa-chevron-left';
    backIcon.id = 'backButton';
    headerLeft.appendChild(backIcon);
    header.appendChild(headerLeft);

    const headerCenter = document.createElement('div');
    headerCenter.className = 'header-center';
    const flagImg = document.createElement('img');
    flagImg.src = 'https://flagicons.lipis.dev/flags/4x3/vn.svg';
    flagImg.alt = 'Cờ Việt Nam';
    flagImg.className = 'flag-icon';
    const countrySpan = document.createElement('span');
    countrySpan.textContent = 'Việt Nam';
    const dropdownIcon = document.createElement('i');
    dropdownIcon.className = 'fas fa-chevron-down';
    headerCenter.appendChild(flagImg);
    headerCenter.appendChild(countrySpan);
    headerCenter.appendChild(dropdownIcon);
    header.appendChild(headerCenter);

    const headerRight = document.createElement('div');
    headerRight.className = 'header-right';
    const flashIcon = document.createElement('i');
    flashIcon.className = 'fas fa-bolt';
    headerRight.appendChild(flashIcon);
    header.appendChild(headerRight);
    container.appendChild(header);

    const qrOverlay = document.createElement('div');
    qrOverlay.className = 'qr-overlay';
    const qrFrame = document.createElement('div');
    qrFrame.className = 'qr-frame';
    ['top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach(cls => {
        const corner = document.createElement('div');
        corner.className = `corner ${cls}`;
        qrFrame.appendChild(corner);
    });
    qrOverlay.appendChild(qrFrame);
    container.appendChild(qrOverlay);

    const bottomContent = document.createElement('div');
    bottomContent.className = 'bottom-content';

    const scanText = document.createElement('p');
    scanText.className = 'scan-text';
    scanText.textContent = 'Quét mọi mã QR';
    bottomContent.appendChild(scanText);

    const supportedServices = document.createElement('p');
    supportedServices.className = 'supported-services';
    supportedServices.innerHTML = 'Ngân hàng • Zalopay • <span class="highlight">V</span>I<span class="highlight">ETQR</span> • napas 247';
    bottomContent.appendChild(supportedServices);

    const uploadButton = document.createElement('button');
    uploadButton.className = 'upload-button';
    uploadButton.innerHTML = '<i class="fas fa-image"></i> Tải ảnh từ máy';
    const imageUploadInput = document.createElement('input');
    imageUploadInput.type = 'file';
    imageUploadInput.id = 'imageUpload';
    imageUploadInput.accept = 'image/*';
    imageUploadInput.style.display = 'none';
    bottomContent.appendChild(uploadButton);
    bottomContent.appendChild(imageUploadInput);

    const takePhotoButton = document.createElement('button');
    takePhotoButton.className = 'take-photo-button';
    takePhotoButton.innerHTML = '<i class="fas fa-camera"></i> Chụp ảnh';
    bottomContent.appendChild(takePhotoButton);
    container.appendChild(bottomContent);

    const navbar = document.createElement('nav');
    navbar.className = 'navbar';

    const navButton1 = document.createElement('button');
    navButton1.className = 'nav-button active';
    navButton1.innerHTML = '<i class="fas fa-qrcode"></i> Mã thanh toán';
    navbar.appendChild(navButton1);

    const navButton2 = document.createElement('button');
    navButton2.className = 'nav-button';
    navButton2.innerHTML = '<i class="fas fa-money-bill-wave"></i> Mã nhận tiền';
    navbar.appendChild(navButton2);
    container.appendChild(navbar);

    const photoCanvas = document.createElement('canvas');
    photoCanvas.id = 'photoCanvas';
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
            containerId: 'cameraAppContainer',
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
        this.openCameraButton = null;

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

        this.openCameraButton = document.createElement('button');
        this.openCameraButton.id = 'openCameraButton';
        this.openCameraButton.textContent = 'Mở Giao Diện Camera';
        document.body.prepend(this.openCameraButton);

        this.capturedPhotoDisplay = document.createElement('img');
        this.capturedPhotoDisplay.id = 'capturedPhotoDisplay';
        this.capturedPhotoDisplay.alt = 'Ảnh đã chụp';
        this.capturedPhotoDisplay.style.display = 'none';
        document.body.appendChild(this.capturedPhotoDisplay);

        this.cameraFeed = this.cameraAppContainer.querySelector('#cameraFeed');
        this.uploadButton = this.cameraAppContainer.querySelector('.upload-button');
        this.imageUploadInput = this.cameraAppContainer.querySelector('#imageUpload');
        this.flashButton = this.cameraAppContainer.querySelector('.header-right .fas.fa-bolt');
        this.backButton = this.cameraAppContainer.querySelector('#backButton');
        this.takePhotoButton = this.cameraAppContainer.querySelector('.take-photo-button');
        this.photoCanvas = this.cameraAppContainer.querySelector('#photoCanvas');
        this.photoContext = this.photoCanvas.getContext('2d');

        this._addEventListeners();

        this._isInitialized = true;
        console.log("CameraApp đã được khởi tạo.");
    }

    _addEventListeners() {
        if (this.openCameraButton) {
            this.openCameraButton.addEventListener('click', () => this.start());
        }
        if (this.backButton) {
            this.backButton.addEventListener('click', () => this.stop());
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
        }

        const navButtons = this.cameraAppContainer.querySelectorAll('.nav-button');
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                console.log(`Chuyển sang: ${button.textContent.trim()}`);
            });
        });
    }

    async start() {
        if (!this._isInitialized) {
            console.error("CameraApp chưa được khởi tạo. Vui lòng gọi init() trước.");
            return;
        }

        this.cameraAppContainer.classList.add('active');
        if (this.openCameraButton) this.openCameraButton.style.display = 'none';
        this.options.onOpen();

        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
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

            this.cameraFeed.onloadedmetadata = () => {
                this.cameraFeed.play();
                if (this.capturedPhotoDisplay) this.capturedPhotoDisplay.style.display = 'none';
            };
            console.log("Camera đã được mở thành công.");

        } catch (err) {
            console.error("Lỗi khi truy cập camera: ", err);
            alert("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập hoặc thiết bị của bạn không có camera/webcam.");
            this.cameraFeed.style.display = 'none';
            this.flashButton.style.display = 'none';
            this.cameraAppContainer.classList.remove('active');
            if (this.openCameraButton) this.openCameraButton.style.display = 'block';
            this.options.onClose();
        }
    }

    stop() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.cameraFeed.srcObject = null;
            this.stream = null;
            this.track = null;
            this.cameraFeed.style.display = 'none';
            this.flashButton.style.display = 'none';
            this.flashButton.classList.remove('active');
            this.flashEnabled = false;
            console.log("Camera đã được dừng.");
        }
        this.cameraAppContainer.classList.remove('active');
        if (this.openCameraButton) this.openCameraButton.style.display = 'block';
        this.options.onClose();
    }

    takePhoto() {
        if (!this.stream) {
            alert("Camera chưa được mở. Vui lòng mở camera trước khi chụp ảnh.");
            return null;
        }

        this.photoCanvas.width = this.cameraFeed.videoWidth;
        this.photoCanvas.height = this.cameraFeed.videoHeight;
        this.photoContext.drawImage(this.cameraFeed, 0, 0, this.photoCanvas.width, this.photoCanvas.height);
        const imageDataURL = this.photoCanvas.toDataURL('image/png');
        console.log("Ảnh đã được chụp và chuyển thành Base64.");

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
                    capturedPhotoDisplay.style.display = 'block';
                }
                console.log('Ảnh từ máy đã được tải và chuyển thành Base64.');
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
                console.log(`Flash đã ${this.flashEnabled ? 'bật' : 'tắt'}.`);
            } catch (err) {
                console.error("Lỗi khi bật/tắt flash: ", err);
            }
        } else {
            console.log("Thiết bị không hỗ trợ flash hoặc camera chưa được mở.");
        }
    }

    destroy() {
        this.stop();

        if (this.openCameraButton) {
            this.openCameraButton.removeEventListener('click', () => this.start());
        }
        if (this.backButton) {
            this.backButton.removeEventListener('click', () => this.stop());
        }

        if (this.cameraAppContainer && this.cameraAppContainer.parentNode) {
            this.cameraAppContainer.parentNode.removeChild(this.cameraAppContainer);
        }
        if (this.openCameraButton && this.openCameraButton.parentNode) {
            this.openCameraButton.parentNode.removeChild(this.openCameraButton);
        }
        if (this.capturedPhotoDisplay && this.capturedPhotoDisplay.parentNode) {
            this.capturedPhotoDisplay.parentNode.removeChild(this.capturedPhotoDisplay);
        }

        this._isInitialized = false;
        console.log("CameraApp đã được hủy.");
    }
}