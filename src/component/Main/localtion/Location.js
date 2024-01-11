import React from 'react'
import { LOCATION } from '../../../constant/Location'
export default function Location() {
      const style = {
            color: 'rgb(39, 39, 42)',
            fontWeight: 600,
            fontSize: '0.89rem',
      }

      return (
            <a href='#!' style={style}>
                  {LOCATION}
            </a>
      )
}
