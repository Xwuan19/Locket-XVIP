# Locket-XVIP — All-In-One Super VIP Pro Max 🚀

Được phát triển và tối ưu bởi **Xwuan** ([@Xwuan19](https://github.com/Xwuan19)).

Tích hợp hoàn hảo **2 trong 1**:
1. **Lớp Bản Quyền (RevenueCat)**: Mở khóa đặc quyền **Locket Gold** vĩnh viễn (Hạn dùng đến năm 2099).
2. **Lớp Cấu Hình Nâng Cao (Firebase Remote Config)**: Đẩy chất lượng ảnh/video lên **4K Ultra HD**, thời lượng quay **30 giây**, **vô hạn bạn bè** (999.999), kích hoạt **Ai đã xem**, **Khôi phục Streak** và **Chặn 100% quảng cáo**.

---

## 📲 Hướng Dẫn Cài Đặt Cho Từng App

### 1. Shadowrocket (Khuyên dùng)
- Mở **Shadowrocket** > mục **Cấu hình (Configuration)** > tab **Mô-đun (Modules)** > bấm dấu `+`.
- Nhập URL sau và lưu lại:
```text
https://raw.githubusercontent.com/Xwuan19/Locket-XVIP/main/modules/Locket_XVIP.module
```
- Bật module lên.
- Đảm bảo trong Shadowrocket đã bật **Giải mã HTTPS (HTTPS Decryption / MitM)** và đã cài + tin cậy Chứng chỉ CA.

### 2. Surge
- Mở **Surge** > tab **Modules** > **Install New Module**.
- Dán URL:
```text
https://raw.githubusercontent.com/Xwuan19/Locket-XVIP/main/modules/Locket_RemoteConfig.sgmodule
```

### 3. Loon
- Mở **Loon** > tab **Plugin** > bấm dấu `+`.
- Dán URL:
```text
https://raw.githubusercontent.com/Xwuan19/Locket-XVIP/main/modules/Locket_RemoteConfig.plugin
```

### 4. Quantumult X
- Mở **Quantumult X** > mục **Rewrite** > chọn **Snippet**.
- Thêm snippet từ URL:
```text
https://raw.githubusercontent.com/Xwuan19/Locket-XVIP/main/modules/Locket_RemoteConfig.snippet
```

### 5. Stash
- Mở **Stash** > mục **Overrides** > bấm dấu `+`.
- Dán URL:
```text
https://raw.githubusercontent.com/Xwuan19/Locket-XVIP/main/modules/Locket_RemoteConfig.stoverride
```

---

## 🌟 Vì Sao Module Này Toàn Diện Hơn Bản Thông Thường?

| Tính Năng | Locket Miễn Phí | Bản RevenueCat Đơn Thuần | **Locket-XVIP (Bản Này)** |
| :--- | :---: | :---: | :---: |
| **Locket Gold** | ❌ Không | ✅ Có | ✅ **Có (Trọn đời 2099)** |
| **Quay video** | 5 – 15 giây | 15 giây | 🎬 **30 giây** |
| **Chất lượng ảnh/video** | Bị nén mờ (1440px) | Bị nén mờ (1440px) | 💎 **4K Ultra HD (4096px, 100% gốc)** |
| **Giới hạn bạn bè** | 20 người | 20 người | 👥 **999.999 người (Vô hạn)** |
| **Ai đã xem ảnh (Views)** | ❌ Không | ❌ Không | 👀 **Hiển thị đầy đủ** |
| **Khôi phục Streak** | Bị tính phí | Bị tính phí | 🔄 **Miễn phí 999 lần** |
| **Chặn quảng cáo** | ❌ Có quảng cáo | ❌ Có quảng cáo | 🚫 **Chặn sạch 100% Ads** |
| **Bảo toàn Token thật** | Không | Không | 🛡️ **Không bao giờ bị lỗi hết hạn** |

---

## 🧪 Kiểm Thử Tự Động (Automated Testing)

Toàn bộ script RevenueCat và Firebase Remote Config đã được kiểm thử tự động với Node.js:
```bash
node tests/integration.test.js
```
Kết quả: 100% test case pass, dữ liệu JSON hợp lệ tuyệt đối.
