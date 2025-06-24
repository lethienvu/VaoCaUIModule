// cameraModule.js

// Hàm để thêm CSS vào head của tài liệu
function addModuleCss() {
    if (document.getElementById('cameraModuleStyle')) {
        return; // Đã thêm rồi
    }
    const styleTag = document.createElement('style');
    styleTag.id = 'cameraModuleStyle';
    styleTag.textContent = `
        /* Quan trọng: #cameraAppContainer sẽ chiếm toàn màn hình và luôn nằm trên */
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
            display: none; /* Ẩn ban đầu */
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            -webkit-font-smoothing: antialiased; /* Làm mịn font trên Webkit */
            -moz-osx-font-smoothing: grayscale; /* Làm mịn font trên Firefox */
        }

        #cameraAppContainer.active {
            display: flex; /* Hiện khi module được kích hoạt */
        }

        /* CSS cho các phần tử con bên trong #cameraAppContainer */

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
            display: none; /* Ẩn ban đầu */
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
            color: #fff; /* Đảm bảo màu chữ là trắng */
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
            color: #fff; /* Đảm bảo màu chữ là trắng */
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
    document.head.appendChild(styleTag);
}

// Hàm để tạo và trả về phần tử HTML của giao diện camera
function createCameraAppHtmlElements() {
    const fragment = document.createDocumentFragment();

    // Camera Feed Container
    const cameraFeedContainer = document.createElement('div');
    cameraFeedContainer.className = 'camera-feed-container';
    const video = document.createElement('video');
    video.id = 'cameraFeed';
    video.autoplay = true;
    video.playsInline = true;
    cameraFeedContainer.appendChild(video);
    fragment.appendChild(cameraFeedContainer);

    // Header
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
    fragment.appendChild(header);

    // QR Scan Overlay
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
    fragment.appendChild(qrOverlay);

    // Bottom Content
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
    fragment.appendChild(bottomContent);

    // Navigation Bar
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
    fragment.appendChild(navbar);

    // Canvas cho chụp ảnh
    const photoCanvas = document.createElement('canvas');
    photoCanvas.id = 'photoCanvas';
    photoCanvas.style.display = 'none';
    fragment.appendChild(photoCanvas);

    return fragment;
}

// Export một function để khởi tạo và điều khiển module
export function initCameraModule(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    // Thêm CSS vào tài liệu
    addModuleCss();

    // Thêm các phần tử HTML vào container
    container.appendChild(createCameraAppHtmlElements());

    // Lấy các phần tử DOM sau khi chúng đã được thêm vào container
    const cameraFeed = container.querySelector('#cameraFeed');
    const uploadButton = container.querySelector('.upload-button');
    const imageUploadInput = container.querySelector('#imageUpload');
    const flashButton = container.querySelector('.header-right .fas.fa-bolt');
    const backButton = container.querySelector('#backButton');
    const takePhotoButton = container.querySelector('.take-photo-button');
    const photoCanvas = container.querySelector('#photoCanvas');
    const photoContext = photoCanvas.getContext('2d');
    const capturedPhotoDisplay = document.getElementById('capturedPhotoDisplay'); // Lấy từ DOM chính

    let stream = null;
    let track = null;
    let flashEnabled = false;

    // Hàm để mở camera và hiển thị trên giao diện
    async function startCamera() {
        container.classList.add('active'); // Hiển thị container
        if (options.onOpen) options.onOpen(); // Callback khi mở

        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Ưu tiên camera sau
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });

            cameraFeed.srcObject = stream;
            cameraFeed.style.display = 'block';

            track = stream.getVideoTracks()[0];

            if (track && 'torch' in track.getCapabilities()) {
                flashButton.style.display = 'block';
            } else {
                flashButton.style.display = 'none';
            }

            console.log("Camera đã được mở thành công.");

            cameraFeed.onloadedmetadata = () => {
                cameraFeed.play();
                // Ẩn ảnh đã chụp nếu có
                if (capturedPhotoDisplay) capturedPhotoDisplay.style.display = 'none';
            };

        } catch (err) {
            console.error("Lỗi khi truy cập camera: ", err);
            alert("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập hoặc thiết bị của bạn không có camera/webcam.");
            cameraFeed.style.display = 'none';
            flashButton.style.display = 'none';

            // Nếu lỗi, ẩn lại container và gọi callback đóng
            container.classList.remove('active');
            if (options.onClose) options.onClose();
        }
    }

    // Hàm để dừng camera
    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            cameraFeed.srcObject = null;
            stream = null;
            track = null;
            cameraFeed.style.display = 'none';
            flashButton.style.display = 'none';
            flashButton.classList.remove('active');
            flashEnabled = false;
            console.log("Camera đã được dừng.");
        }
        container.classList.remove('active'); // Ẩn container
        if (options.onClose) options.onClose(); // Callback khi đóng
    }

    // Hàm bật/tắt flash
    async function toggleFlash() {
        if (track && 'torch' in track.getCapabilities()) {
            try {
                await track.applyConstraints({
                    advanced: [{ torch: !flashEnabled }]
                });
                flashEnabled = !flashEnabled;
                flashButton.classList.toggle('active', flashEnabled);
                console.log(`Flash đã ${flashEnabled ? 'bật' : 'tắt'}.`);
            } catch (err) {
                console.error("Lỗi khi bật/tắt flash: ", err);
            }
        } else {
            console.log("Thiết bị không hỗ trợ flash hoặc camera chưa được mở.");
        }
    }

    // Hàm chụp ảnh và chuyển sang Base64
    function takePhotoToBase64() {
        if (!stream) {
            alert("Camera chưa được mở. Vui lòng mở camera trước khi chụp ảnh.");
            return null;
        }

        // Đảm bảo canvas có cùng kích thước với video stream
        photoCanvas.width = cameraFeed.videoWidth;
        photoCanvas.height = cameraFeed.videoHeight;

        // Vẽ frame hiện tại của video lên canvas
        photoContext.drawImage(cameraFeed, 0, 0, photoCanvas.width, photoCanvas.height);

        // Lấy dữ liệu ảnh dưới dạng URL Base64 (PNG)
        const imageDataURL = photoCanvas.toDataURL('image/png');
        console.log("Ảnh đã được chụp và chuyển thành Base64.");

        // Hiển thị ảnh đã chụp (nếu có phần tử hiển thị)
        if (capturedPhotoDisplay) {
            capturedPhotoDisplay.src = imageDataURL;
            capturedPhotoDisplay.style.display = 'block';
        }

        if (options.onPhotoTaken) options.onPhotoTaken(imageDataURL); // Callback khi chụp ảnh

        return imageDataURL;
    }

    // Gán sự kiện cho các phần tử trong module
    backButton.addEventListener('click', stopCamera);
    flashButton.addEventListener('click', toggleFlash);
    uploadButton.addEventListener('click', () => {
        imageUploadInput.click();
    });
    imageUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (options.onPhotoLoaded) options.onPhotoLoaded(e.target.result);
                // Hiển thị ảnh đã tải lên (nếu có phần tử hiển thị)
                if (capturedPhotoDisplay) {
                    capturedPhotoDisplay.src = e.target.result;
                    capturedPhotoDisplay.style.display = 'block';
                }
                console.log('Ảnh từ máy đã được tải và chuyển thành Base64.');
            };
            reader.readAsDataURL(file);
        }
        event.target.value = '';
    });
    takePhotoButton.addEventListener('click', takePhotoToBase64);

    const navButtons = container.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            console.log(`Chuyển sang: ${button.textContent.trim()}`);
        });
    });

    // Trả về các hàm điều khiển công khai
    return {
        start: startCamera,
        stop: stopCamera,
        takePhoto: takePhotoToBase64 // Hàm chụp ảnh và trả về Base64
    };
}

// Lắng nghe sự kiện click từ bên ngoài để khởi tạo và gọi hàm start
document.addEventListener('DOMContentLoaded', () => {
    const openCameraButton = document.getElementById('openCameraButton');
    const cameraAppContainer = document.getElementById('cameraAppContainer');

    // Khởi tạo module khi DOM đã tải hoàn chỉnh
    const cameraControl = initCameraModule('cameraAppContainer', {
        onOpen: () => {
            openCameraButton.style.display = 'none';
        },
        onClose: () => {
            openCameraButton.style.display = 'block';
        },
        onPhotoTaken: (base64Image) => {
            console.log("Ảnh Base64 đã được gửi từ module (chụp):", base64Image.substring(0, 50) + "...");
        },
        onPhotoLoaded: (base64Image) => {
            console.log("Ảnh Base64 đã được gửi từ module (tải từ máy):", base64Image.substring(0, 50) + "...");
        }
    });

    // Gán sự kiện click cho nút "Mở Giao Diện Camera" để khởi động module
    openCameraButton.addEventListener('click', () => {
        cameraControl.start();
    });

    // Dừng camera khi người dùng rời khỏi trang
    window.addEventListener('beforeunload', () => {
        cameraControl.stop();
    });
});