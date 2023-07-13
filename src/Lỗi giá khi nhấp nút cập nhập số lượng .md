# Mình là `Lại Huỳnh Phát Đạt`, đây là những gì mình note lại cho những ngày sau

# `Sài Gòn, 11-07-2023, bây giờ là 21:45`

Markdown này sẽ liên quan tới phần cart mà mình xây dựng trong web clone tiki

---

# Ban đầu mình dự định khi nhấn nút tăng hoặc giảm số lượng thì sẽ cập nhập lại giá sản phẩm trong cartList[], nhưng mà...

> ## Giá tăng giảm theo cấp số nhân

- Khi một sản phẩm có giá 64620, nó được nhấn mua với số lượng là 2 ở Components Buy. Ok lúc này vẫn còn đang ổn 64620x2 = 129300đ. Nhưng khi nhấn nút mua ở Components Buy thì action addProduct sẽ được dispatch() dữ liệu sẽ được tràn vào cartList[], rồi từ cartList[] của redux, mình mới đổ dữ liệu vào Components Cart.jsx, và ở đây cũng có 2 action tăng giảm số lượng sản phẩm

- Mình đã cập nhật giá mới nhất bằng cách lấy giá _ số lượng. Đây là cách mình tính `giá = giá _ số lượng`. `Ví dụ giá = 50 thì sẽ là 50 = 50 _ 1`. Mình click tăng số lượng lên `2`sẽ là`50 = 50 x 2`. Giá bây giờ là `100`. Rồi tăng lên `3` `100 = 100 _ 3`. Thế là đã có `300`. Cao hơn giá đúng gấp đôi. Trường hợp giảm số lượng cũng không khác gì luôn.

> ## Sau gần nửa tiếng mình đã mài mò ra giải pháp...

- Trước `dispatch action` tăng hoặc giảm thì mình sẽ lọc trong mảng `cartList[]`, để lấy ra phần tử mình đang tác động, sau đó thì mới gửi dispatch, mục đích như vậy là để mình lấy lại giá gốc để nó không tăng như cái note ở trên

- Sau đó mình tạo `1 useState được khởi tạo là 0`, sau mỗi lần `dispatch action tăng hoặc giảm thì mình sẽ lấy giá gốc gán lại cho state.`

- Và trong jsx của mình không còn công thức giá = giá _ số lượng nữa. Nó sẽ là gia = state _ số lượng. Và sau mỗi lúc tăng giảm thì setState() sẽ gán `state` lại bằng giá gốc rồi mới \* số lượng.

## Action tăng

---

`const handleIncrease = (idSanPham) => {
    const getPriceCurrent = list.find((product) => product.id === idSanPham)
    dispatch(cartSlice.actions.increaseProduct(idSanPham))
    setPrice(getPriceCurrent.isPrice)
  }
`

---

## Action giảm

`const handleDecrease = (idSanPham) => {
const getPriceCurrent = list.find((product) => product.id === idSanPham)
dispatch(cartSlice.actions.decreaseProduct(idSanPham))
setPrice(getPriceCurrent.isPrice)
}
`

---

## Và đây là trong jsx của mình

`Giá:{price === 0 ? listItem.isPrice _ listItem.quantity : price _ listItem.quantity}`

- Và thêm một lưu ý nữa mình tự note lại, do `state` ban đàu có giá trị bằng 0, năm 0 \* số lượng thì ra 0. Lỗi rồi kìa, do đó mình đã check nó nếu nó bằng 0 thì mình sẽ lấy giá trong `cartList \* nhân với số lượng`. Và mình đã yên têm vì sau 3 phút thử mình chắc chắn lần render đầu lên cho kết quá đúng. Chỉ mấy lần sau mới tăng mất kiểm soát thôi, mà mấy lần sau đã có useState() lo rồi kkk...
