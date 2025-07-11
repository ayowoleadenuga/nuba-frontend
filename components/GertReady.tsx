import Image from 'next/image'
import styles from '../components/home.module.css'
import { Button } from './ui/button'
import ArrowUp from "@/assets/svgs/arrow-up.svg"
import Link from 'next/link'
import { useState } from 'react'
import TermsModal from './termsModal'

export default function GetReady() {
  const [terms, SetTerms] = useState(false)
    return(
        <div>
        <section>
          <div className='sm:flex mx-3  sm:gap-3 items-center md:gap-5  xl:gap-10 justify-center'>
            <div className="">
              <div className="bg-transparent w-[350px] mx-auto lg:mx-auto sm:w-[320px] xl:h-[576px] md:w-[354px] lg:h-[600px] xl:w-[604px] lg:w-[454px] md:h-[600px] rounded-lg shadow-lg overflow-hidden transition-all duration-300  ">
                <div className={`${styles.sect}   sm:mb-0 mb-8 lg:w-[454px] xl:w-full sm:p-3 p-5 md:p-5 rounded-[16px]`}>
                  <div className='lg:mt-14 md:h-[auto] h-[250px] md:mt-12 items-center'>
                    <p className='m-0 lg:text-[40px] md:text-[30px] sm:text-[24px] text-[25px] leading-[125%] font-[500] '>Ready to start getting rewarded on your rent?</p>
                    <p className="m-0 text-[#000] opacity-[70%]">Join the millions of members renting smarter with Nuba.</p>                
                  </div>
                  <Button className='rounded-[20px] sm:mt-5 sm:px-6  md:mt-10 md:px-10 md:py-7 sm:py-3'>Start earning today</Button>
                </div>
                <div className="xl:p-4 p-2 sm:block space-y-2 hidden">
                  <div className="flex justify-between  md:pe-8 xl:pe-8">
                    <div className=''>
                      <p onClick={()=> SetTerms(true)} className="m-0 text-[#ffffff] text-[16px] bg-transparent p-0">Terms and conditions</p>
                    </div>
                    <div className='flex items-start xl:pe-1 justify-start'>
                      <p className="m-0 text-[#ffffff]">Career</p>
                    </div>  
                  </div>   
                  <div className="flex justify-between  xl:pe-[3px]">
                    <div>
                      <p className="m-0 text-[#ffffff] ">Terms of Use</p>
                    </div>
                    <div>
                      <p className="m-0 text-[#ffffff]">Newsroom</p>
                    </div>  
                  </div> 
                  <div className="flex justify-between md:pe-12 xl:pe-13">
                    <div>
                      <p className="m-0 text-[#ffffff] ">Privacy Center</p>
                    </div>
                    <div className=' '>
                      <p className="m-0 text-[#ffffff]">App</p>
                    </div>  
                  </div>  
                  <div className="flex justify-between xl:pe-8">
                    <div>
                      <p className="m-0 text-[#ffffff] ">Help Center</p>
                    </div>
                  </div>               
                </div>
              </div>
            </div>
            <div className="">
              <div className="bg-transparent w-[350px] mx-auto  lg:mx-auto sm:w-[320px] md:w-[354px]  xl:h-[576px]  xl:w-[604px] lg:h-[600px] lg:w-[454px] md:h-[600px] rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ">
                <div className={`md:h-[414px sm:h-[414px] xl:w-[604px] lg:w-[454px] p-5 sm:p-4 bg-white md:p-5 rounded-[16px]`}>
                  <div className=' lg:mt-8  md:mt-6  items-center'>
                    <Link href={"https://x.com/nubarewards?s=11&t=Y4ilsRpOL4SN7T2jp4D1Mw"} className='flex items-center  justify-between'>
                      <div>
                        <p className="m-0 md:text-[24px] font-[500]  sm:text-[18px] text-[20px]">Twitter</p>
                      </div>
                      <div>
                        <Image alt='arrow-up' src={ArrowUp}/>
                      </div>
                    </Link>
                  </div>
                  <div className={`${styles.hr2} w-full`}></div>
                  <Link href={"https://www.instagram.com/nubarewards?igsh=MXAxYXBhZm1ieGU1Ng=="} className=' lg:mt-8 sm:mt-5 mt-3 md:mt-6  items-center'>
                    <div className='flex lg:mt-8 sm:mt-5 mt-3 md:mt-6 items-center  justify-between'>
                      <div>
                        <p className="m-0 md:text-[24px] font-[500]  sm:text-[18px] text-[20px]">Instagram</p>
                      </div>
                      <div>
                        <Image alt='arrow-up' src={ArrowUp}/>
                      </div>
                    </div>
                  </Link>
                  <div className={`${styles.hr2} w-full`}></div>
                  <div className=' lg:mt-8 sm:mt-5 mt-3  md:mt-6  items-center'>
                    <div className='flex items-center  justify-between'>
                      <div>
                        <p className="m-0 md:text-[24px] font-[500]  sm:text-[18px] text-[20px]">Facebook</p>
                      </div>
                      <div>
                        <Image alt='arrow-up' src={ArrowUp}/>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.hr2} w-full`}></div>
                  <div className=' lg:mt-8 sm:mt-5 mt-3  md:mt-6  items-center'>
                    <div className='flex items-center  justify-between'>
                      <div>
                        <p className="m-0 md:text-[24px] font-[500]  sm:text-[18px] text-[20px]">YouTube</p>
                      </div>
                      <div>
                        <Image alt='arrow-up' src={ArrowUp}/>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.hr2} w-full`}></div>
                  <div className=' lg:mt-8 sm:mt-5 mt-3  md:mt-6  items-center'>
                    <div className='flex items-center  justify-between'>
                      <div>
                        <p className="m-0 md:text-[24px] font-[500] sm:text-[18px] text-[20px]">LinkedIn</p>
                      </div>
                      <div>
                        <Image alt='arrow-up' src={ArrowUp}/>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.hr2} w-full`}></div>
                </div>
                <div className="xl:p-4 my-5 p-2 sm:hidden block space-y-2">
                  <div className="flex justify-between items-center  pe-8">
                    <div>
                      <p onClick={()=> SetTerms(true)} className="m-0 text-[#ffffff] bg-transparent p-0">Terms and conditions</p>
                    </div>
                    <div className='flex items-start justify-start'>
                      <p className="m-0 text-[#ffffff]">Career</p>
                    </div>  
                  </div>   
                  <div className="flex justify-between ">
                    <div>
                      <p className="m-0 text-[#ffffff] ">Terms of Use</p>
                    </div>
                    <div>
                      <p className="m-0 text-[#ffffff]">Newsroom</p>
                    </div>  
                  </div> 
                  <div className="flex justify-between pe-12">
                    <div>
                      <p className="m-0 text-[#ffffff] ">Privacy Center</p>
                    </div>
                    <div className=' xl:pr-[51px]'>
                      <p className="m-0 text-[#ffffff]">App</p>
                    </div>  
                  </div>  
                  <div className="flex justify-between xl:pe-8">
                    <div>
                      <p className="m-0 text-[#ffffff] ">Help Center</p>
                    </div>
                  </div>               
                </div>
                <div className="xl:p-4 p-2 space-y-2">
                  <p className="text-[#ffffff] opacity-[60%]">Nuba is a trading name of Nuba Technologies LTD (16344130), a company registered in England and Wales. Nuba Technologies LTD is not a payment provider and operates through  licensed partners in the United Kingdom to provide regulated services.</p>    
                </div>
              </div>
            </div>
          </div>
          <div>
            {
              terms && 
              (
                <div>
                  <TermsModal open={terms} onClose={() => SetTerms(false)}/>
                </div>
              )
            }
          </div>
        </section>
        </div>
    )
}