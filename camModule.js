/**
 * CameraModule.js
 *
 * Một module JavaScript độc lập để chụp ảnh trên trình duyệt,
 * bao gồm giao diện người dùng HTML và CSS được nhúng.
 * Module này cung cấp khả năng:
 * - Truy cập camera của thiết bị.
 * - Hiển thị luồng video trực tiếp.
 * - Chụp ảnh từ luồng video.
 * - Chuyển đổi ảnh đã chụp thành định dạng Base64.
 * - Quản lý giao diện camera động (hiển thị/ẩn).
 * - Chuyển đổi camera trước/sau.
 */

const CameraModule = (() => {
    // --- Các biến và phần tử DOM nội bộ ---
    let _videoElement = null;
    let _canvasElement = null;
    let _context = null;
    let _stream = null; // Đối tượng MediaStream từ camera
    let _facingMode = 'user'; // Đã thay đổi thành 'user' để ưu tiên camera trước
    let _resolveCapturePromise = null; // Hàm resolve của Promise khi chụp ảnh thành công
    let _rejectCapturePromise = null; // Hàm reject của Promise khi có lỗi

    let _cameraAppContainer = null;
    let _takePhotoButton = null;
    let _backButton = null;
    let _switchCameraButton = null; // Nút chuyển đổi camera (trước/sau)

    // --- HTML và CSS mẫu được nhúng ---
    // Đây là toàn bộ cấu trúc HTML cho giao diện camera
    const _htmlTemplate = `
        <div id="vuCameraAppContainer" class="vu-camera-app-container">
            <div class="vu-camera-feed-container">
                <video id="vuCameraFeed" class="vu-camera-feed" playsinline></video>
            </div>

            <header class="vu-header">
                <div class="vu-header-left" id="vuBackButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>
                    Trở về
                </div>
                <div class="vu-header-right" id="vuSwitchCameraButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                        <path
                            d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                        <path fill-rule="evenodd"
                            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z" />
                    </svg>
                </div>
            </header>

            <div class="vu-qr-overlay">
                <div class="vu-qr-frame">
                    <div class="vu-corner vu-top-left"></div>
                    <div class="vu-corner vu-top-right"></div>
                    <div class="vu-corner vu-bottom-left"></div>
                    <div class="vu-corner vu-bottom-right"></div>
                </div>
            </div>

            <div class="vu-bottom-content">
                <nav class="vu-navbar">
                    <div class="logoFooter"></div>
                    <div class="logoFooter"></div>
                </nav>
                <button class="vu-take-photo-button" id="vuTakePhotoButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-fill"
                        viewBox="0 0 16 16">
                        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                        <path
                            d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0" />
                    </svg>
                    Chụp ảnh chấm công
                </button>
            </div>

            <canvas id="vuPhotoCanvas" style="display: none;"></canvas>
        </div>
        <img id="vuCapturedPhotoDisplay" class="vu-captured-photo-display" alt="Ảnh đã chụp">
    `;

    // Đây là toàn bộ CSS cho giao diện camera
    const _cssTemplate = `
        .vu-captured-photo-display {
            margin-top: 20px;
            max-width: 90%;
            height: auto;
            border: 2px solid #ddd;
            display: none;
            z-index: 2000;
        }

        .vu-camera-app-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90vw; /* Chiều rộng tối đa 90% viewport */
            max-width: 500px; /* Chiều rộng tối đa trên các màn hình lớn */
            height: 80vh; /* Chiều cao tối đa 80% viewport */
            max-height: 700px; /* Chiều cao tối đa */
            margin: 0;
            padding: 0;
            z-index: 9999;
            background-color: rgba(0, 0, 0, 0.9); /* Nền tối hơn để nổi bật */
            border-radius: 15px; /* Bo tròn các góc của container chính */
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); /* Thêm bóng đổ */
            display: none; /* Mặc định ẩn */
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .vu-camera-app-container.active {
            display: flex; /* Hiển thị khi active */
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
            width: 100%; /* Đặt chiều rộng 100% của container */
            height: 100%; /* Đặt chiều cao 100% của container */
            display: block; /* HIỂN THỊ VIDEO FEED */
            transform: scaleX(-1); /* Lật ngang để giống gương (vẫn cần cho canvas) */
            object-fit: contain; /* THAY ĐỔI TẠI ĐÂY: Chứa video trong khung mà không cắt xén, có thể có khoảng đen */
            filter: brightness(0.8);
            /* BỎ CÁC THUỘC TÍNH MIN-WIDTH/MIN-HEIGHT */
            /* min-width: 100%; */
            /* min-height: 100%; */
            /* width: auto; */
            /* height: auto; */
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

        .vu-camera-app-container .vu-header-left {
            padding: 0.5rem 1.5rem;
            display: flex;
            border-radius: 2rem;
            justify-content: center;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.3);
            font-size: 1rem;
            color: #fff;
            cursor: pointer; /* Thêm con trỏ cho nút */
        }

        .vu-camera-app-container .vu-header-right {
            padding: 0.5rem;
            display: flex;
            border-radius: 2rem;
            justify-content: center;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.3);
            font-size: 1rem;
            color: #fff;
            cursor: pointer; /* Thêm con trỏ cho nút */
        }

        .vu-camera-app-container .vu-header-left svg {
            width: 1rem;
            color: #fff;
            margin-right: 5px;
        }

        /* Flash icon - not directly implemented in JS but kept for styling */
        .vu-camera-app-container .vu-header-right .fas.fa-bolt.active {
            color: yellow;
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
            height: calc(100% - 17rem);
            position: relative;
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6);
            border-radius: 2rem;
        }

        .vu-camera-app-container .vu-corner {
            position: absolute;
            width: 2rem;
            height: 2rem;
            border: 3px solid #fff;
            box-sizing: border-box;
        }

        .vu-camera-app-container .vu-top-left {
            top: 0;
            left: 0;
            border-right: none;
            border-bottom: none;
            border-top-left-radius: 2rem;
        }

        .vu-camera-app-container .vu-top-right {
            top: 0;
            right: 0;
            border-left: none;
            border-bottom: none;
            border-top-right-radius: 2rem;
        }

        .vu-camera-app-container .vu-bottom-left {
            bottom: 0;
            left: 0;
            border-right: none;
            border-top: none;
            border-bottom-left-radius: 2rem;
        }

        .vu-camera-app-container .vu-bottom-right {
            bottom: 0;
            right: 0;
            border-left: none;
            border-top: none;
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
            height: 6rem;
        }

        /* Text elements - not directly used in this version but kept for future use */
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
            padding: 1rem 3rem;
            border-radius: 3rem;
            font-size: 1rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: background-color 0.3s ease;
            margin: 0 10px 10px 10px;
            border: 1px solid rgba(255, 255, 255, .4);
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
            background-color: transparent;
            margin-top: -3rem;
            margin-bottom: 1rem;
            padding: 0;
            position: relative;
            z-index: 2001;
            /* Width 10% was too small, adjusted for better button layout if needed */
            /* width: 10%; */
            padding-bottom: calc(15px + env(safe-area-inset-bottom));
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
            transform: scale(0.7); /* Scale logo smaller */
        }

        .vu-camera-app-container .logoFooter svg {
            transform: scale(0.8); /* Scale SVG inside logo smaller */
        }
    `;

    /**
     * Chèn CSS vào tài liệu.
     */
    const _injectCSS = () => {
        if (document.getElementById('vu-camera-module-style')) {
            // CSS đã được chèn, không làm gì cả
            return;
        }
        const style = document.createElement('style');
        style.id = 'vu-camera-module-style';
        style.textContent = _cssTemplate;
        document.head.appendChild(style);
    };

    /**
     * Dừng luồng camera hiện tại.
     */
    const _stopCameraStream = () => {
        if (_stream) {
            _stream.getTracks().forEach(track => track.stop());
            _stream = null;
            if (_videoElement) {
                _videoElement.srcObject = null;
                _videoElement.style.display = 'none'; // Đảm bảo video ẩn khi dừng stream
            }
        }
    };

    /**
     * Bắt đầu luồng camera với facingMode đã chọn.
     * @returns {Promise<void>}
     */
    const _startCameraStream = async () => {
        _stopCameraStream(); // Dừng luồng cũ nếu có

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error('Trình duyệt không hỗ trợ getUserMedia API.');
            _displayMessage('Lỗi: Trình duyệt của bạn không hỗ trợ truy cập camera.', true);
            return Promise.reject(new Error('getUserMedia not supported.'));
        }

        try {
            // Thử khởi động camera với facingMode hiện tại và độ phân giải thấp
            _stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: _facingMode,
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                }
            });

            _videoElement.srcObject = _stream;
            _videoElement.play();
            _videoElement.style.display = 'block'; // Hiển thị video khi stream sẵn sàng

            // Đảm bảo video đã tải đủ siêu dữ liệu để có thể lấy kích thước chính xác
            await new Promise(resolve => {
                _videoElement.onloadedmetadata = () => {
                    // Đặt kích thước canvas bằng kích thước thực của video
                    _canvasElement.width = _videoElement.videoWidth;
                    _canvasElement.height = _videoElement.videoHeight;
                    _takePhotoButton.disabled = false; // Bật nút chụp ảnh
                    resolve();
                };
            });
        } catch (err) {
            console.error('Lỗi khi truy cập camera:', err);
            _takePhotoButton.disabled = true; // Tắt nút chụp ảnh khi có lỗi

            let errorMessage = 'Lỗi không xác định khi truy cập camera.';
            if (err.name === 'NotAllowedError') {
                errorMessage = 'Bạn đã từ chối quyền truy cập camera. Vui lòng cấp quyền trong cài đặt trình duyệt.';
            } else if (err.name === 'NotFoundError') {
                errorMessage = 'Không tìm thấy camera trên thiết bị.';
            } else if (err.name === 'NotReadableError') {
                errorMessage = 'Camera đang được sử dụng bởi ứng dụng khác.';
            } else if (err.name === 'OverconstrainedError') {
                errorMessage = 'Không thể đáp ứng các ràng buộc camera (ví dụ: độ phân giải yêu cầu quá cao).';
            } else if (err.name === 'AbortError') {
                errorMessage = 'Truy cập camera bị gián đoạn.';
            }
            _displayMessage(`Lỗi camera: ${errorMessage}`, true);
            _stopCameraStream(); // Đảm bảo dừng stream nếu có lỗi
            return Promise.reject(err);
        }
    };

    /**
     * Hiển thị thông báo trong giao diện người dùng (thay thế alert).
     * @param {string} message - Nội dung thông báo.
     * @param {boolean} isError - True nếu là thông báo lỗi, false nếu là thông báo thông thường.
     */
    const _displayMessage = (message, isError = false) => {
        // Tạo một div để hiển thị thông báo
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: ${isError ? 'rgba(255, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.7)'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            font-size: 16px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: opacity 0.3s ease-in-out;
            opacity: 0;
            max-width: 80%;
        `;
        messageBox.textContent = message;
        document.body.appendChild(messageBox);

        // Hiển thị và tự động ẩn sau 3 giây
        setTimeout(() => {
            messageBox.style.opacity = '1';
        }, 10); // Cho phép render trước khi áp dụng opacity

        setTimeout(() => {
            messageBox.style.opacity = '0';
            messageBox.addEventListener('transitionend', () => messageBox.remove());
        }, 3000);
    };

    /**
     * Chụp ảnh từ luồng video và chuyển đổi sang Base64.
     * @returns {string|null} - Ảnh Base64 hoặc null nếu không thể chụp.
     */
    const _capturePhoto = () => {
        if (!_videoElement || !_canvasElement || !_context || !_stream) {
            console.error('Camera chưa được khởi tạo hoặc stream không hoạt động.');
            _displayMessage('Không thể chụp ảnh: Camera không sẵn sàng.', true);
            return null;
        }

        // Đảm bảo canvas có kích thước phù hợp với video
        _canvasElement.width = _videoElement.videoWidth;
        _canvasElement.height = _videoElement.videoHeight;

        // Vẽ frame hiện tại của video lên canvas
        // Cần lật lại ảnh theo trục X nếu video đang bị lật (-1, 1)
        // Việc lật này chỉ áp dụng nếu facingMode là 'user' (camera trước)
        // hoặc nếu video stream tự lật.
        if (_facingMode === 'user') { // Giả định camera trước cần lật
            _context.translate(_canvasElement.width, 0);
            _context.scale(-1, 1);
        }
        
        _context.drawImage(_videoElement, 0, 0, _canvasElement.width, _canvasElement.height);
        _context.setTransform(1, 0, 0, 1, 0, 0); // Đặt lại transform cho các lần vẽ sau

        // Chuyển canvas thành ảnh Base64 với chất lượng thấp nhất có thể (0.5)
        const imageDataURL = _canvasElement.toDataURL('image/jpeg', 0.5); // Định dạng JPEG, chất lượng 50%
        return imageDataURL;
    };

    /**
     * Chuyển đổi giữa camera trước và camera sau.
     */
    const _switchCamera = async () => {
        _facingMode = (_facingMode === 'environment') ? 'user' : 'environment';
        try {
            await _startCameraStream();
            _displayMessage(`Đã chuyển sang camera ${_facingMode === 'environment' ? 'sau' : 'trước'}.`);
        } catch (error) {
            console.error('Không thể chuyển đổi camera:', error);
            _displayMessage('Không thể chuyển đổi camera. Thiết bị có thể không có camera thứ hai.', true);
            // Đặt lại facingMode nếu không thể chuyển đổi
            _facingMode = (_facingMode === 'environment') ? 'user' : 'environment';
        }
    };

    // --- Phương thức công khai (Public API) của module ---
    return {
        /**
         * Khởi tạo module camera bằng cách chèn HTML và CSS vào DOM.
         * Nên gọi hàm này một lần khi ứng dụng khởi động.
         */
        init: () => {
            _injectCSS(); // Chèn CSS vào head

            // Tạo các phần tử HTML từ template và thêm vào body
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = _htmlTemplate;
            // Lấy các phần tử trực tiếp từ tempDiv để tránh lỗi "getElementById" trước khi append
            _cameraAppContainer = tempDiv.querySelector('#vuCameraAppContainer');
            _videoElement = tempDiv.querySelector('#vuCameraFeed');
            _canvasElement = tempDiv.querySelector('#vuPhotoCanvas');
            _takePhotoButton = tempDiv.querySelector('#vuTakePhotoButton');
            _backButton = tempDiv.querySelector('#vuBackButton');
            _switchCameraButton = tempDiv.querySelector('#vuSwitchCameraButton');

            document.body.appendChild(_cameraAppContainer);
            document.body.appendChild(tempDiv.querySelector('#vuCapturedPhotoDisplay')); // Thêm ảnh hiển thị

            _context = _canvasElement.getContext('2d');

            // Gắn các sự kiện click
            if (_takePhotoButton) {
                _takePhotoButton.addEventListener('click', () => {
                    const photoBase64 = _capturePhoto();
                    if (photoBase64 && _resolveCapturePromise) {
                        _resolveCapturePromise(photoBase64); // Giải quyết Promise với ảnh Base64
                    } else if (_rejectCapturePromise) {
                        _rejectCapturePromise(new Error('Failed to capture photo or no promise to resolve.'));
                    }
                    _stopCameraStream(); // Dừng stream sau khi chụp
                    _cameraAppContainer.classList.remove('active'); // Ẩn giao diện camera
                });
                _takePhotoButton.disabled = true; // Mặc định tắt cho đến khi camera sẵn sàng
            }

            if (_backButton) {
                _backButton.addEventListener('click', () => {
                    _stopCameraStream(); // Dừng stream khi thoát
                    _cameraAppContainer.classList.remove('active'); // Ẩn giao diện camera
                    if (_rejectCapturePromise) {
                        // Reject promise nếu người dùng thoát mà không chụp ảnh
                        _rejectCapturePromise(new Error('Camera operation cancelled by user.'));
                    }
                });
            }

            if (_switchCameraButton) {
                _switchCameraButton.addEventListener('click', _switchCamera);
            }
        },

        /**
         * Mở giao diện camera và bắt đầu luồng video.
         * Trả về một Promise sẽ được giải quyết với ảnh Base64 khi ảnh được chụp,
         * hoặc bị từ chối nếu có lỗi hoặc người dùng hủy.
         * @returns {Promise<string>} - Promise chứa chuỗi Base64 của ảnh.
         */
        open: () => {
            return new Promise(async (resolve, reject) => {
                _resolveCapturePromise = resolve;
                _rejectCapturePromise = reject;

                if (!_cameraAppContainer) {
                    console.warn('CameraModule chưa được khởi tạo. Đang tự động khởi tạo.');
                    CameraModule.init(); // Tự động khởi tạo nếu chưa gọi init
                }

                _cameraAppContainer.classList.add('active'); // Hiển thị giao diện camera
                _takePhotoButton.disabled = true; // Vô hiệu hóa nút chụp khi bắt đầu

                try {
                    await _startCameraStream();
                    // KHÔNG LÀM GÌ Ở ĐÂY ĐỂ VIDEO ELEMENT HIỂN THỊ THEO CSS
                } catch (error) {
                    _cameraAppContainer.classList.remove('active'); // Ẩn giao diện nếu lỗi
                    reject(error); // Từ chối Promise nếu không thể khởi động camera
                }
            });
        },

        /**
         * Đóng giao diện camera và dừng luồng video.
         */
        close: () => {
            _stopCameraStream();
            if (_cameraAppContainer) {
                _cameraAppContainer.classList.remove('active');
            }
        },

        /**
         * Hiển thị một ảnh Base64 đã chụp.
         * @param {string} base64Image - Chuỗi Base64 của ảnh.
         */
        displayCapturedPhoto: (base64Image) => {
            const displayElement = document.getElementById('vuCapturedPhotoDisplay');
            if (displayElement) {
                displayElement.src = base64Image;
                displayElement.style.display = 'block';
            } else {
                console.error('Không tìm thấy phần tử để hiển thị ảnh đã chụp.');
            }
        },
        hideCapturedPhoto: () => {
            const displayElement = document.getElementById('vuCapturedPhotoDisplay');
            if (displayElement) {
                displayElement.style.display = 'none';
                displayElement.src = ''; // Xóa nguồn ảnh
            }
        }
    };
})();

// Export CameraModule như là một default export
export default CameraModule;
