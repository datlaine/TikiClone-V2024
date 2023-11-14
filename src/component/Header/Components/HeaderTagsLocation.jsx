// import './header_list_down.css'
import { USER } from '../../User/infoUser'
function HeaderTagsLocation() {
  const address = USER.userAddress

  return (
    <>
      <ul className='flex text-[15px] text-[#000] gap-2'>
        <li className='list_item'>
          trái cây,
        </li>
        <li className='list_item'>
          thịt,trứng, 
        </li>
        <li className='list_item'>
          rau củ quả, 
        </li>
        <li className='list_item'>
          sữa,bơ,phô mai, 
        </li>
        <li className='list_item'>
          hải sản, 
        </li>
        <li className='list_item'>
          gạo,mì ăn liền, 
        </li>
        <li className='list_item'>
          đồ uống,rượu bia, 
        </li>
        <li className='list_item'>
          bánh kẹo, 
        </li>
      </ul>
      <div
        id=''
        className='flex gap-4 text-[15px] text-[#000]'
      >
        <img
          src='https://salt.tikicdn.com/ts/upload/88/5c/9d/f5ee506836792eb7775e527ef8350a44.png'
          alt='Location'
          width={20}
          height={20}
        />
        <span>Giao đến {address}</span>
      </div>
    </>
  )
}

export default HeaderTagsLocation
