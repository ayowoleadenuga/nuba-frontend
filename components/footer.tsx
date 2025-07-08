import Image from 'next/image';  
import Ellipse from "@/assets/svgs/Ellipse.svg"
import styles from './home.module.css'

export default function Footer() {
    return(
        <div>
            <footer className={`${styles.footer} relative  text-white `}> 
            <div className='absolute bottom-0 '>
                <Image alt='ellipse' src={Ellipse}/></div>                    
            </footer> 
        </div>
    )
}