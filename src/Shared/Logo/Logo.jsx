import React from 'react';
import { FcElectricity } from "react-icons/fc";
const Logo = ({title}) => {
    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-center'>
            <FcElectricity className='text-5xl -mr-5 shrink-0' />
            <h1 className='text-6xl yefo'>BoltPay</h1>
            </div>
            <div className='text-center'>
                <h1 className='pop font-bold text-2xl'>{title} To</h1>
                <p className='inter text-xs md:text-base'>Secure. Speedy. Simple. Boltpay – Revolutionizing Mobile Finance.</p>
            </div>
        </div>
    );
};

export default Logo;