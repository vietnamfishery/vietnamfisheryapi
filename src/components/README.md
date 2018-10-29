1. Pagination
    - pageSize
    - pageIndex
2. Sort
    - ASC
    - DESC

3. Count
4. Like
5. Between

Ghi chú cho BaseComponent
GET = đang gặp vấn đề về create câu query kèm nhiều điều kiện, khóa chính - khóa ngoại;không push trực tiếp các query vào các phương thức của models cần khai báo const biến kiểu any rồi mới apply vào được trong phương thức của models.

Đặt khóa ngoại SQL
`
ALTER TABLE storages ADD userId bigint(20) NOT null;
ALTER TABLE storages add FOREIGN KEY (userId) REFERENCES users(userId);
`


nhập hàng:
    - giống
    - trang thiết bị
    - thức ăn   -Tên, đơn vị tính, số lượng, hdsd?, nhà cung cấp, thông tin nhà cung cấp, người nhập
    - thuốc


    Kho:                    Mã SP, Tên, số lượng, hdsd, loại.
    Phiếu nhập:             Mã phiếu nhập, Ngày nhập, người nhập
    Chi tiết phiếu nhập:    Mã phiếu nhập, Mã SP,  Đơn vị tính, số lượng nhập, giá nhập, nhà cc, thông tin nhà cung cấp

    thêm: 
        - chưa có trong kho: storages -> coupon -> materials
        - đã có trong kho: coupon -> materials && storage update khi nào cũng được