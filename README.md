# Hướng dẫn xây dựng trang web với `json-server` và deploy lên `render.com`

## Xây dựng trang web

Một số câu lệnh cần nhớ:

- Cài đặt dependencies: `npm i`
- Khởi chạy server: `npm run dev`
- Tắt server: `Ctrl + C` (Window) hoặc `Control + C` (Mac)

Lưu ý:

- Chỉ cần cài đặt dependencies 1 lần sau khi tải repo về
- Không cần khởi chạy lại server khi thay đổi nội dung file
- Các tệp HTML, CSS, JS, Image, Video, ... lưu trong thư mục `public`
- Dữ liệu khai báo trong file `data.json`

> Tham khảo thêm về `json-server` [tại đây](https://github.com/typicode/json-server) để biết cách cấu trúc dữ liệu hoặc mở rộng chức năng của server

## Deploy lên `render.com`

1. Commit code lên Github
2. Tạo tài khoản/đăng nhập vào `render.com`
3. Kết nối tài khoản Github
4. Tạo `Web Service` mới
5. Kết nối Github repo
6. Done

