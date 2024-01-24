import React from 'react'
import { memo } from 'react'
import BrandPromotionTiki from './BrandPromotionTiki'
import ContactTiki from './ContactTiki'
import style from './style/aboutTiki.module.css'
import SupportTiki from './SupportTiki'

const AboutTiki = () => {
    const space = (
        <div
            style={{
                width: 'calc(100% + 35px)',
                height: 'auto',
                backgroundColor: '#ccc',
                margin: '25px 0px 25px -35px',
                opacity: 0.5,
            }}
        ></div>
    )

    return (
        <div className={`${style.aboutTiki}`} style={{ zIndex: 999, marginLeft: 278 }}>
            <SupportTiki />
            {space}
            <ContactTiki />
            {space}
            <BrandPromotionTiki />
        </div>
    )
}

export default memo(AboutTiki)
