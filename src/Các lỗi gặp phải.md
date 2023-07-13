# Mình là `Lại Huỳnh Phát Đạt`, đây là những gì mình note lại cho những ngày sau

# `Sài Gòn, 11-07-2023, bây giờ là 18:30 rồi`

Markdown này sẽ liên quan tới phần cart mà mình xây dựng trong web clone tiki

---

action.payload: gồm các thông tin như: id, tên, hình ảnh, giá bản, mã giảm giá, giá sau khi áp mã giảm giá, và cuối cùng là số lượng sản phảm

---

# Phần dữ liệu cart trong redux sẽ bao gồm: `{cardList:[], soLuong: number}`

> # **Lỗi mất state**

- Vào trang khác state bị reset -> do sử dụng thẻ a mà không lưu lại dữ liệu dẫn đến refresh lại trang web, và dữ liệu cũng bị xóa luôn Giải pháp là sử dụng thẻ Link để không bị load lại trang
 

> # **Cart -> thêm vào giỏ hàng**

---

> ## **Cart là một object với 1 key là mảng sản phẩm trong cartList, 2 là số lượng sản phảm `{cartList: [], soLuong: 0}`**

---

### Khi nhận actions addProduct:

Mình sẽ kiểm tra `cartList[]` có phải là mảng rỗng hay không bằng cách check length coi có bằng 0 không, nếu phải thì sẽ `state.soLuong += 1`

###

- Tiếp theo sau đó mình sẽ push cái sản phẩm mà nhận trong phần `action.payload` vào mảnh `cardList[]`

###

- Có vấn đề mình nhận thấy ở đây là: Nếu thêm các sản phẩm khác nhau thì không sao, nhưng nếu thêm các sản phẩm trùng nhau thì `state.soLuong` vẫn tính luôn cả 3

###

- Trong khi mình muốn là nếu 3 sản phẩm giống nhau thì state.soLuong vẫn bằng = 1, và phần số lượng riêng của sản phẩm mới là = 3

###

- Vậy nên mình sử dụng thuật toán là khi nhận dữ liệu từ action.payload mình sẽ check coi cái id mà `action.payload` vừa truyền vào có trùng với cái nào trong mảng `cartList` hay không.

##

Mà đầu tiền phải coi mảng đó có rỗng hay không đã

###

> Nếu rỗng thì thêm vào luôn, còn không rỗng thì mới check điều kiện nhé tôi ơi

---

###

- Mình sẽ dùng hàm `find()` để tìm cái item bị trùng nha
* À ôn lại chút nhé hàm `find()` sẽ về vị trí `index` nếu điều kiện trong `callback` thỏa, còn không thì `return -1`

```
let find = state.cartList.findIndex((product, index) => {

        if ((product.id ===  action.payload.id)) {
          console.log('đã tồn tại')
          return product.quantity += 1
        }
      })
```

###

- Nếu hàm tìm được sẽ trả về index của item bị trùng id, còn không tìm thấy thì trả về -1

###

- Nếu tìm được thì mình sẽ không tăng `state.soLuong` mà tăng số lượng hiện diện của sản phẩm đó trong cart: `state.cardList[index].quantity +=1`, trong code thì nó như vậy nè `product.quantity += 1`, index là vị trí của phần tử trùng trong mảng

###

- Nếu không thì mình sẽ push sản phẩm đó vào giỏ hàng và tăng `state.soLuong` lên
