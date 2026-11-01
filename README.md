# Locket-XVIP — Remote Config Siêu VIP Pro Max 🚀

Được phát triển bởi **Xwuan** (@Xwuan19).

Bộ script & module ghi đè cấu hình Firebase Remote Config cho ứng dụng **Locket Widget**, mở khóa toàn bộ tính năng độc quyền của **Locket Gold**, nâng cấp chất lượng ảnh/video lên **4K Ultra HD**, **vô hạn bạn bè**, **khôi phục streak** và **chặn 100% quảng cáo**.

---

## 🌟 Tính Năng "Siêu VIP Pro Max"

1. **Mở Khóa Locket Gold Toàn Diện**:
   - Mở khóa biểu tượng ứng dụng độc quyền (**Custom App Icons**).
   - Mở khóa toàn bộ chủ đề / ốp lưng camera (**Camera Themes**).
   - Tải ảnh & video trực tiếp từ thư viện (**Camera Roll Upload**).
   - Quay và gửi video độ dài tối đa (**Longer Video**).
   - Phụ đề / caption ký tự siêu dài (**Long Captions**).
   - Huy hiệu thành viên Gold trên hồ sơ cá nhân (**Membership Badge**).
   - Toàn bộ khung widget sự kiện và lễ hội (**Custom Widget Frames**).

2. **Chất Lượng Ảnh & Video 4K Ultra HD**:
   - Chất lượng upload giữ nguyên 100% (`quality: 1.0`), không bị nén mờ.
   - Độ phân giải ảnh tối đa 4096px (Ultra HD 4K thay vì 1440px).
   - Khử nhiễu, chống rung và bộ lọc Lanczos cao cấp.

3. **Vô Hạn Bạn Bè (Unlimited Friends)**:
   - Gỡ bỏ hoàn toàn giới hạn 20 bạn bè (nâng mức giới hạn lên `999999`).
   - Mở khóa tính năng Nhóm bạn (**Groups / Conversations**).

4. **Xem Ai Đã Xem Ảnh (Moment Views)**:
   - Kích hoạt tính năng xem danh sách bạn bè đã mở ảnh/video của bạn.
   - Nhận thông báo tương tác khi có người xem.

5. **Bảo Vệ & Khôi Phục Streak (Streak Recovery Pro)**:
   - Mở khóa khôi phục chuỗi ngày chụp chung (Streak Recovery) không giới hạn lần khôi phục.

6. **Chặn Sạch Quảng Cáo & Tracking (Ad-Free)**:
   - Tắt 100% video ads và banner quảng cáo trong mục Lịch sử (History).
   - Tắt các dịch vụ phân tích dữ liệu Amplitude và Sentry theo dõi người dùng.

7. **Cơ Chế Dynamic Smart Merge (Không Lo Lỗi Thời)**:
   - Request bảo toàn trực tiếp Token và Account FID của thiết bị người dùng (không bị lỗi hết hạn token).
   - Response tự động merge tính năng mới từ server Firebase mà vẫn giữ trọn các quyền lợi VIP.

---

## 📲 Hướng Dẫn Cài Đặt 1-Chạm

### 1. Surge
- Mở **Surge** > tab **Modules** > **Install New Module**.
- Dán đường dẫn hoặc import file [`modules/Locket_RemoteConfig.sgmodule`](modules/Locket_RemoteConfig.sgmodule).
- Đảm bảo đã bật **MitM** và tin cậy chứng chỉ CA của Surge.

### 2. Shadowrocket
- Mở **Shadowrocket** > mục **Modules** > bấm dấu `+`.
- Nhập URL hoặc import file [`modules/Locket_RemoteConfig.sgmodule`](modules/Locket_RemoteConfig.sgmodule).
- Bật module và bật **HTTPS Decryption (MitM)** trong phần Cấu hình.

### 3. Loon
- Mở **Loon** > tab **Plugin** > bấm dấu `+`.
- Nhập URL hoặc import file [`modules/Locket_RemoteConfig.plugin`](modules/Locket_RemoteConfig.plugin).

### 4. Quantumult X
- Mở **Quantumult X** > mục **Rewrite** > chọn **Snippet**.
- Thêm snippet từ file [`modules/Locket_RemoteConfig.snippet`](modules/Locket_RemoteConfig.snippet).
- Đảm bảo hostname `firebaseremoteconfig.googleapis.com` đã được thêm vào mục **[mitm]**.

### 5. Stash
- Mở **Stash** > mục **Overrides** > bấm dấu `+`.
- Import file [`modules/Locket_RemoteConfig.stoverride`](modules/Locket_RemoteConfig.stoverride).

---

## 🧪 Kiểm Thử Tự Động (Verification)

Bộ test tích hợp sẵn trong thư mục `tests/`:
```bash
node tests/integration.test.js
```
Kết quả kiểm tra: 100% test case pass, dữ liệu JSON 341 khóa cấu hình hợp lệ tuyệt đối.
