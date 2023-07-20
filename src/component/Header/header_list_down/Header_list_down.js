import './header_list_down.css'
import Location from '../../Main/localtion/Location'
import { USER } from '../../User/infoUser'
function Header_down() {
  const address = USER.userAddress

  return (
    <div id='header_down_fix' className='dienThoai:hidden xl:flex xl:justify-between xl:pl-20'>
      <ul id='list'>
        <li className='list_item'>trái cây</li>
        <li className='list_item'>thịt,trứng</li>
        <li className='list_item'>rau củ quả</li>
        <li className='list_item'>sữa,bơ,phô mai</li>
        <li className='list_item'>hải sản</li>
        <li className='list_item'>gạo,mì ăn liền</li>
        <li className='list_item'>đồ uống,rượu bia</li>
        <li className='list_item'>bánh kẹo</li>
      </ul>
      <div id='local'>
        <img src='https://salt.tikicdn.com/ts/upload/88/5c/9d/f5ee506836792eb7775e527ef8350a44.png' alt='' />
        <span>Giao đến {address}</span>
      </div>
    </div>
  )
}

export default Header_down
