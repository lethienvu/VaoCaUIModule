# VaoCaUIModule

VaoCa UI Elements
**By Thien Vu**

Library UI Elements Use For VaoCa mobile application
Use ES Modules:

<script type="module" defer>
        import { uiManager } from 'https://cdn.jsdelivr.net/gh/lethienvu/VaoCaUIModule/VCUIElements.js';
</script>
<script>
            // Confirm Popup Button
            function showPopupConfirm(
                uiManager.showConfirmPopup({
                    title: "Xác nhận hành động",
                    content: "Bạn có chắc muốn thực hiện thao tác này? Dữ liệu có thể bị thay đổi vĩnh viễn.",
                    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
                    onConfirm: () => {
                        console.log("Người dùng đã Đồng ý!");
                        uiManager.showAlert({ type: 'success', message: 'Bạn đã xác nhận thành công!' });
                    },
                    onCancel: () => {
                        console.log("Người dùng đã Hủy!");
                        uiManager.showAlert({ type: 'notice', message: 'Hành động đã bị hủy bỏ.' });
                    }
                });
            )

            // Success Popup Button
                uiManager.showInfoPopup({
                    title: "Hoàn thành!",
                    content: "Thao tác của bạn đã được thực hiện thành công.",
                    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-8.83"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
                    onOk: () => {
                        console.log("Người dùng đã click OK trên Success Popup.");
                    }
                });

            // Error Popup Button
                uiManager.showInfoPopup({
                    title: "Lỗi!",
                    content: "Đã xảy ra lỗi trong quá trình xử lý yêu cầu của bạn. Vui lòng thử lại sau.",
                    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="94" fill="none">
                        <path fill="url(#a)" d="M36 89A36 36 0 1 0 0 53c0 20 16 36 36 36Z" opacity=".2"/>
                        <path fill="#004C39" d="M3 83c-3-5-3-12-1-18 2-8 9-14 17-16l2 7a17 17 0 0 0-11 24l-7 3Z"/>
                        <path fill="url(#b)" d="m3 94-2-1c-2-5 0-11 4-13 5-2 11 0 13 4 1 1 0 3-1 3-1 1-3 1-3-1l-3-2a5 5 0 0 0-6 7 2 2 0 0 1-2 3Z"/>
                        <path fill="#004C39" d="M65 53c-3 3-7 5-11 6l-2-8a17 17 0 0 0 14-17l8 1a25 25 0 0 1-9 18Z"/>
                        <path fill="url(#c)" d="M77 34a9 9 0 0 1-13 0c-2-2-3-4-3-7l2-2c2 0 3 1 3 2a5 5 0 0 0 9 0c0-1 1-2 3-2l2 2a9 9 0 0 1-3 7Z"/>
                        <path fill="url(#d)" d="m4 29 2 5-1 1 2 5c1 0 0 0 0 0l-6-5 1-1h1v-1l-2-3v-1h3Z"/>
                        <path fill="#004C39" d="m14 49 5 30a17 17 0 0 0 33 1l6-31H14Z"/>
                        <path fill="#fff" d="M27 72v-1h-1v1-2 1l1-1v2Zm1-2h1v1h-1v1-2Zm0 0v1l1-1h-1Zm2 1v-1 1h-1v-1h1v1l1-1v1-1l-1 1Zm3 0v-1 1h-1v-1h1v1l1-1v1-1l-1 1Zm3 0h-1v-1h1v1Zm-1 0h1l-1-1v1Zm1-2v1h1v1h-1v-2Zm1 1h-1v1h1v-1Zm1 0v1-1Zm0-1v1-1Zm0 2v-2 2Zm1-1h1v1h-1a1 1 0 0 0 1 0 1 1 0 0 1-1 0v-1Zm0 0h1-1Zm3 1h-1 1l-1-1v-1a1 1 0 0 1 1 0v1h-1 1v1Zm1 0h-1v-1h1v1Zm-1 0h1v-1l-1 1Zm2 0v-2 2Zm2-1v1h-2v-1h1v1-1h1Zm0 1h1-1v-2 1h1-1v1Zm1-1v1-1Zm0-1v1-1Zm2 1v1h-1l-1-1h2Zm-1 0v1-1Zm2 0v1-1h-1v1-1h1Zm-23-2a13 13 0 0 1-2-5h1v-1 1l1 1a11 11 0 0 0 1 3v-1a9 9 0 0 0 1-3l1-1a4 4 0 0 1 0 1v2a16 16 0 0 1-1 3l-1 1-1-1Zm5 1-1-1v-2h2v-1h-2l1-1h1l2 2v3h-1v-1h-1v1h-1Zm1-1v-1h-1v1h1Zm10-1h2a4 4 0 0 1 0 1h-1l-1 1-1-1h-1v-4l1-1 1-1h1a2 2 0 0 1 1 1v1a6 6 0 0 1-1 0v-1h-1l-1 1v3h1Zm4 1h-1v-1l1-1h2l-1-1h-1a8 8 0 0 1-1 0v-1h2c1 0 2 0 2 2v2h-3Zm1-1h1v-1h-1l-1 1h1Zm-12 1-1-1a1 1 0 0 1 0-1l1-1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 0l1 2-1 2h-2a1 1 0 0 1-1 0Z"/>
                        <mask id="e" width="4" height="4" x="36" y="64" maskUnits="userSpaceOnUse" style="mask-type:luminance">
                            <path fill="#fff" d="M39 65h-3v3h3v-3Z"/>
                        </mask>
                        <g mask="url(#e)">
                            <path fill="#F30" d="M39 66v-1h-1l1 1Z"/>
                            <path fill="#004C39" d="M37 67h-1 1Zm0-1Zm1 0h-1v1-1 1h1s-1 0 0 0v-1Z"/>
                            <path fill="#004C39" d="M38 65h-1v1-1a1 1 0 0 1 1 1 1 1 0 0 1 0 1 1 1 0 0 1-1 0 1 1 0 0 0 2-1 1 1 0 0 0-1-1h-1 1"/>
                        </g>
                        <path fill="#EDFFC8" d="M36 56c12 0 22-3 22-7 0-3-10-6-22-6s-22 3-22 6c0 4 10 7 22 7Z"/>
                        <path fill="#004C39" d="M57 27c2 10-7 16-19 17-12 2-23-1-24-11-1-9 7-22 19-23 12-2 23 8 24 17Z"/>
                        <path fill="url(#f)" d="m46 17-12 2a7 7 0 1 0 2 14l12-2a7 7 0 1 0-2-14Z"/>
                        <path fill="url(#g)" d="M32 2h-1l2 10h1L32 2Z"/>
                        <path fill="url(#h)" d="M31 5a2 2 0 1 0-1-2l1 2Z"/>
                        <path fill="#004C39" d="m38 28-6-4v-1h1l6 4a1 1 0 0 1-1 1Z"/>
                        <path fill="#004C39" d="M33 29a1 1 0 0 1 0-1l4-6h1v1l-4 5-1 1Zm16-2v-1l-5-4v-1h1l5 4a1 1 0 0 1-1 2Z"/>
                        <path fill="#004C39" d="M45 27a1 1 0 0 1-1-1l4-5h1v1l-3 5h-1Z"/>
                        <path fill="url(#i)" d="m42 35 1-1a2 2 0 0 1 3 1l-1 1a1 1 0 0 0-2 0l-1 1-1-1a2 2 0 0 1 1-1Z"/>
                        <mask id="j" width="16" height="16" x="63" y="6" maskUnits="userSpaceOnUse" style="mask-type:luminance">
                            <path fill="#fff" d="M79 6H63v16h16V6Z"/>
                        </mask>
                        <g mask="url(#j)">
                            <path fill="#F30" d="M79 14a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-4a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-3a1 1 0 0 0-1-1Zm0 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
                        </g>
                        <defs>
                            <linearGradient id="a" x1="36" x2="36" y1="17.6" y2="89.2" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#EAF6FF"/>
                            <stop offset="1" stop-color="#F3FFE9"/>
                            </linearGradient>
                            <linearGradient id="b" x1="9.1" x2="9.1" y1="79" y2="94" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#EAF6FF"/>
                            <stop offset="1" stop-color="#F3FFE9"/>
                            </linearGradient>
                            <linearGradient id="c" x1="70.5" x2="70.5" y1="24.7" y2="36.6" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#EAF6FF"/>
                            <stop offset="1" stop-color="#F3FFE9"/>
                            </linearGradient>
                            <linearGradient id="d" x1="4.1" x2="4.1" y1="29" y2="40.3" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#EAF6FF"/>
                            <stop offset="1" stop-color="#F3FFE9"/>
                            </linearGradient>
                            <linearGradient id="f" x1="40.7" x2="40.7" y1="16.8" y2="32.6" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#EAF6FF"/>
                            <stop offset="1" stop-color="#F3FFE9"/>
                            </linearGradient>
                            <linearGradient id="g" x1="31.3" x2="33.1" y1="2.3" y2="11.9" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#EAF6FF"/>
                            <stop offset="1" stop-color="#F3FFE9"/>
                            </linearGradient>
                            <linearGradient id="h" x1="31.4" x2="31.4" y1="1.2" y2="4.8" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#EAF6FF"/>
                            <stop offset="1" stop-color="#F3FFE9"/>
                            </linearGradient>
                            <linearGradient id="i" x1="43.5" x2="43.5" y1="33.9" y2="36.9" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#EAF6FF"/>
                            <stop offset="1" stop-color="#F3FFE9"/>
                            </linearGradient>
                        </defs>
                        </svg>`,
                    onOk: () => {
                        console.log("Người dùng đã click OK trên Error Popup.");
                    }
                });

            // Alert Buttons
                uiManager.showAlert({
                    type: 'success',
                    message: 'Dữ liệu đã được lưu thành công!',
                    duration: 4000 // Custom duration
                });


                uiManager.showAlert({
                    type: 'error',
                    message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại!',
                    duration: 6000
                });


                uiManager.showAlert({
                    type: 'notice',
                    message: 'Bạn có một thông báo mới!',
                    duration: 3000
                });

                uiManager.showAlert({
                    type: 'warning',
                    message: 'Cảnh báo: Dung lượng lưu trữ sắp đầy!',
                    duration: 5000
                });

                uiManager.showLoading("Đang xử lý yêu cầu...");

                // Hide loading screen after the operation
                uiManager.hideLoading();
</script>

**EXCUTION FLOW JS IN VAOCA**

1. Khai báo các biến và hằng số toàn cục  
   Lấy tham chiếu đến các phần tử DOM một lần

2. Khai báo các hàm tiện ích (Utility Functions)
   Các hàm này có thể được sử dụng lại bởi các hàm khác.

3. Khai báo các hàm xử lý logic chính (Core Logic Functions)

4. Khai báo các hàm khởi tạo / xử lý sự kiện (Initialization / Event Handlers)
   => Gọi trực tiếp ở cuối script
