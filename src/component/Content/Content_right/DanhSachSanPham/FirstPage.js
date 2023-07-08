import React ,{memo} from 'react'
import MiniDanhSach from './MiniDanhSach'
const urlMiniSpe = `http://localhost:8000/danhSachMiniSpe/1`;

export default memo(function FirstPage({call}) {
    // console.log(`firstPage: `)
  return (
    <MiniDanhSach colums={[1, 7]} rows={[1,2]} urlApi={urlMiniSpe} isNotFirst = {false} call={call}/>
  )
})
