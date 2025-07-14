// qrCodeDisplayModule.js

/**
 * Creates and initializes a self-contained QR code display module.
 * The module injects its own HTML and CSS into the document.
 *
 * @param {string} userName - The name of the user to display on the QR card.
 * @param {string} qrImageUrl - The URL for the QR code image.
 * @param {string} [targetElementId='qr-display-container'] - The ID of the HTML element where the QR display will be rendered.
 */
export function createQrDisplayModule(userName, qrImageUrl, targetElementId = 'qr-display-container') {
    const htmlContent = `
        <div class="qr-popup-overlay">
        <div class="containerQRByVu">
            <div class="header">
                <div class="close-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#111" class="bi bi-x-lg"
                        viewBox="0 0 16 16">
                        <path stroke-width="3"
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                </div>
            </div>

            <div class="qr-section">
                <div class="qr-code-container">
                    <img src="${qrImageUrl}" alt="QR Code" class="qr-image">
                </div>
                <div class="user-info">
                    <span class="user-name">${userName}</span>
                </div>
                <div class="qr-description">
                    QR đồng bộ dữ liệu và kết nối nhân sự trên Vào Ca <br> Ứng dụng quản trị nhân sự toàn diện trên điện
                    thoại.
                </div>
            </div>

            <div class="activation-section">
                <div class="activation-header">
                    <div class="activation-title">Kích hoạt hồ sơ nhân viên</div>
                </div>
                <div class="activation-details">
                    Tải ứng dụng <span class="highlight">Vào Ca</span> về điện thoại, sau đó đăng nhập vào ứng dụng, mở chức
                    năng quét QR và thực hiện đồng bộ nhân sự trên ứng dụng.
                </div>
            </div>

            <div class="action-buttons">
                <div class="action-item">
                    <svg style="margin-bottom: 4px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                        height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="24" height="24" />
                            <path
                                d="M2,13 C2,12.5 2.5,12 3,12 C3.5,12 4,12.5 4,13 C4,13.3333333 4,15 4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 C2,15 2,13.3333333 2,13 Z"
                                fill="#004c39" fill-rule="nonzero" />
                            <rect fill="#73C41D"
                                transform="translate(12.000000, 8.000000) rotate(-180.000000) translate(-12.000000, -8.000000) "
                                x="11" y="1" width="2" height="14" rx="1" />
                            <path
                                d="M7.70710678,15.7071068 C7.31658249,16.0976311 6.68341751,16.0976311 6.29289322,15.7071068 C5.90236893,15.3165825 5.90236893,14.6834175 6.29289322,14.2928932 L11.2928932,9.29289322 C11.6689749,8.91681153 12.2736364,8.90091039 12.6689647,9.25670585 L17.6689647,13.7567059 C18.0794748,14.1261649 18.1127532,14.7584547 17.7432941,15.1689647 C17.3738351,15.5794748 16.7415453,15.6127532 16.3310353,15.2432941 L12.0362375,11.3779761 L7.70710678,15.7071068 Z"
                                fill="#73C41D" fill-rule="nonzero"
                                transform="translate(12.000004, 12.499999) rotate(-180.000000) translate(-12.000004, -12.499999) " />
                        </g>
                    </svg>
                    <span>Tải xuống</span>
                </div>
                <div class="action-item">
                    <svg style="margin-bottom: 4px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                        height="24px" viewBox="0 0 24 24" version="1.1">

                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="24" height="24" />
                            <path
                                d="M10.9,2 C11.4522847,2 11.9,2.44771525 11.9,3 C11.9,3.55228475 11.4522847,4 10.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,16 C20,15.4477153 20.4477153,15 21,15 C21.5522847,15 22,15.4477153 22,16 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L10.9,2 Z"
                                fill="#004c39" fill-rule="nonzero" />
                            <path
                                d="M24.0690576,13.8973499 C24.0690576,13.1346331 24.2324969,10.1246259 21.8580869,7.73659596 C20.2600137,6.12944276 17.8683518,5.85068794 15.0081639,5.72356847 L15.0081639,1.83791555 C15.0081639,1.42370199 14.6723775,1.08791555 14.2581639,1.08791555 C14.0718537,1.08791555 13.892213,1.15726043 13.7542266,1.28244533 L7.24606818,7.18681951 C6.93929045,7.46513642 6.9162184,7.93944934 7.1945353,8.24622707 C7.20914339,8.26232899 7.22444472,8.27778811 7.24039592,8.29256062 L13.7485543,14.3198102 C14.0524605,14.6012598 14.5269852,14.5830551 14.8084348,14.2791489 C14.9368329,14.140506 15.0081639,13.9585047 15.0081639,13.7695393 L15.0081639,9.90761477 C16.8241562,9.95755456 18.1177196,10.0730665 19.2929978,10.4469645 C20.9778605,10.9829796 22.2816185,12.4994368 23.2042718,14.996336 L23.2043032,14.9963244 C23.313119,15.2908036 23.5938372,15.4863432 23.9077781,15.4863432 L24.0735976,15.4863432 C24.0735976,15.0278051 24.0690576,14.3014082 24.0690576,13.8973499 Z"
                                fill="#73C41D" fill-rule="nonzero"
                                transform="translate(15.536799, 8.287129) scale(-1, 1) translate(-15.536799, -8.287129) " />
                        </g>
                    </svg>
                    <span>Chia sẻ</span>
                </div>
            </div>
        </div>
        </div>
    `;

    const cssContent = `
        .qr-popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1999;
        }
    
        .containerQRByVu {
            width: calc(100% - 40px);
            margin: 30px 20px;
            background: linear-gradient(290deg, #EAF6FF 9.78%, #F3FFE9 109.56%);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            position: relative;
            border-radius: 32px;
            z-index: 2000;
        }

        .containerQRByVu .header {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 10px 15px;
            padding-bottom: 0;
            margin: 5px;
            margin-bottom: 0px;
            font-size: 20px;
            color: #333;
        }

        .containerQRByVu .header .close-icon {
            background-color: #fff;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            cursor: pointer; /* Add cursor pointer for better UX */
        }

        .containerQRByVu .qr-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0px;
            background-color: transparent;
        }

        .containerQRByVu .qr-code-container {
            position: relative;
            width: 240px;
            height: 240px;
            border: 3px solid #004c39;
            background-color: #004c39;
            border-radius: 16px;
            margin-bottom: 20px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .containerQRByVu .qr-image {
            width: 90%;
            height: 90%;
            object-fit: contain;
        }

        .containerQRByVu .user-info {
            font-size: 1.2rem;
            color: #004c39;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .containerQRByVu .qr-description {
            font-size: 0.7rem;
            margin-top: 5px;
            color: #666;
            text-align: center;
            padding: 0 20px;
        }

        .containerQRByVu .activation-section {
            background-color: #f9f9f9;
            padding: 15px;
            margin: 10px 25px;
            border-radius: 10px;
            border: 1px solid #fff;
        }

        .containerQRByVu .activation-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .containerQRByVu .activation-title {
            font-weight: bold;
            font-size: 0.8rem;
            color: #004c39;
        }

        .containerQRByVu .activation-details {
            font-size: 0.6rem;
            color: #555;
            line-height: 1.5;
        }

        .containerQRByVu .activation-details .highlight {
            color: #28a745;
            font-weight: bold;
        }

        .containerQRByVu .action-buttons {
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
            border-top: 1px solid #eee;
            margin-top: 15px;
        }

        .containerQRByVu .action-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            color: #555;
            cursor: pointer;
        }

        .containerQRByVu .action-item i {
            font-size: 24px;
            margin-bottom: 5px;
            color: #007bff;
        }

        /* Note: .bottom-nav and .bottom-text were in your CSS but not in your HTML structure.
           I'm keeping them here for completeness if you decide to add them. */
        .containerQRByVu .bottom-nav {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 10px 0;
            background-color: #fff;
            border-bottom: 3px solid #fff;
        }

        .containerQRByVu .bottom-nav-item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }

        .containerQRByVu .bottom-text {
            font-size: 12px;
            color: #888;
            text-align: center;
            padding: 10px 20px;
            margin-bottom: 10px;
        }
    `;

    // Function to inject CSS
    function injectCss(css) {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    async function shareQrImage(qrImageUrl) {
        if (typeof apimobileAjax !== 'function') {
            alert('Chức năng chia sẻ hiện chỉ hỗ trợ trong ứng dụng di động!');
            return;
        }

        let filePath = qrImageUrl.replace(/^data:image\/png;base64,/, '');

        const fileName = 'QRCode.png';
        const tmpData = {
            MethodName: 'MobileShareFileAsync',
            prs: [safeDecodeURIComponent(filePath), safeDecodeURIComponent(fileName)],
        };

        const option = {
            success: (res) => console.log('✅ Chia sẻ thành công:', res),
            error: (err) => console.error('❌ Chia sẻ thất bại:', err),
        };

        apimobileAjax(option, tmpData);
    }

    // Function to set up event listeners
    function setupEventListeners(container) {
        const overlay = container.closest('.qr-popup-overlay');
        const closeIcon = container.querySelector('.close-icon');
        if (overlay && closeIcon) {
            closeIcon.addEventListener('click', () => {
                overlay.remove();
            });
        }

        const downloadButton = container.querySelector('.action-item:nth-child(1)');
        if (downloadButton) {
            downloadButton.addEventListener('click', async () => {
                try {
                    let imageDataUrl = qrImageUrl;

                    const link = document.createElement('a');
                    link.href = imageDataUrl;
                    link.download = 'QRCode.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    console.log('✅ Đã tải xuống mã QR.');
                } catch (error) {
                    console.error('❌ Lỗi khi tải QR:', error);
                    alert('Không thể tải ảnh QR. Vui lòng thử lại.');
                }
            });
        }

        const shareButton = container.querySelector('.action-item:nth-child(2)');
        if (shareButton) {
            shareButton.addEventListener('click', () => {
                shareQrImage(qrImageUrl);
            });
        }

        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.remove();
                    console.log('QR display closed via overlay click.');
                }
            });
        }
    }

    // Find or create the target element
    let targetElement = document.getElementById(targetElementId);
    if (!targetElement) {
        console.warn(`Target element with ID "${targetElementId}" not found. Creating a div at the end of body.`);
        targetElement = document.createElement('div');
        targetElement.id = targetElementId;
        document.body.appendChild(targetElement);
    }

    // Inject HTML
    targetElement.innerHTML = htmlContent;

    // Inject CSS
    injectCss(cssContent);

    // Set up event listeners on the newly injected content
    const qrDisplayContainer = targetElement.querySelector('.containerQRByVu');
    if (qrDisplayContainer) {
        setupEventListeners(qrDisplayContainer);
    } else {
        console.error('QR display container not found after injection.');
    }
}
