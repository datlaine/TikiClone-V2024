import { Link } from 'react-router-dom'

type Props = {
      products: any[]
}

const SideBarSection = (props: Props) => {
      const { products } = props

      return (
            <></>
            // <ul className='bg-white p-4 flex flex-col '>
            //       {products.map((product: any) => {
            //             return (
            //                   <Link to={`/${product.title}`} key={product.id} className='py-3'>
            //                         <li className='flex gap-5 items-center'>
            //                               <img src={require(`../Sidebar/${product.imgSrc}`)} className='w-5 h-5' alt='' />
            //                               <span>{product.title}</span>
            //                         </li>
            //                   </Link>
            //             )
            //       })}
            // </ul>
      )
}

export default SideBarSection
