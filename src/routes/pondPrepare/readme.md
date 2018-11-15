# Thêm chuẩn bị ao, quá trình thêm thành công sẽ tạo ra một ao mới cho người dùng -> thêm data vào bảng pond
## *Đề xuất giao diện Material Stepper*
1. **Step 1:** Form nhập thông tin ao bao gồm [pondName, pondArea, pondDepth, createCost, pondLatitude, pondLongitude, status] tất cả để là form nhập:
2. **Step 2:** Form nhập tên gợi nhớ của đợt chuẩn bị ao bao gồm [pondPrepareName] - form nhập 
3. **Step 3:** Form nhập các món đồ của đợt chuẩn bị ao bao gồm [storageId, quantity] ở bước này set một nút thêm để người dùng có thể thêm nhiều món đồ ở bước này - phải hiển thị danh sách mà người dùng đã nhập.
4. **Step 4:** Là bước cuối cùng để người dùng có thể quyết định submit toàn bộ quá trình hoặc reset nhập lại hoặc hủy luôn thao tác.
## *Các trường hợp thêm chuẩn bị ao:*
1. Thêm một đợt chuẩn bị mới hoàn toàn cho một ao mới hoàn toàn.
2. Thêm các chi tiết của lần chuẩn bị các là sử dụng vật dụng trong kho.
### Các xử lý
__*Thêm mới hoàn toàn:*__
* Thêm ao lấy *pondId* - lấy thông tin từ form step 1
* Dùng ownerId để tìm vụ hiện tại của người dùng -> *seasonId*
* Thêm ao mới vào vụ -> *seasonAndPondId*
* Thêm tên gợi nhớ lần chuẩn bị -> *pondPrepareId* - từ form step 2
* Lặp mảng detailsOfPrepare - mảng chứa các CSVC để tuần tự thêm vào bảng pondPrepareDetail - từ mảng form step 3
__*Thêm chi tiết của lần chuẩn bị cũ:*__
*Phần này không cho người dùng nhập nhiều form mà thêm từng lần đơn lẻ, nếu thêm thành công reset form hiện tại và cho người dùng nhập tiếp*
* Dữ liệu người dùng cần lấy là: pondId, ownerId, pondPrepareId, storageId, quantity
