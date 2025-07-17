// pages/index.js
"use client";
import Navbar from '@/components/header';
import Head from 'next/head'; 
import Link from 'next/link'; 
import Image from 'next/image';  
import styles from '../components/home.module.css'
import Airplane from "../assets/svgs/airplane.svg"
import HomeIcon from "@/assets/svgs/Home.svg"
import Ph from "@/assets/svgs/ph.svg"
import Mynaui from "@/assets/svgs/mynaui.svg"
import { Button } from "@/components/ui/button"
import FrameOne from "@/assets/svgs/frame_one.svg"
import FrameTwo from "@/assets/svgs/imageo.svg"
import Boxone from "@/assets/svgs/mingcute_ticket-fill.svg"
import Boxtwo from "@/assets/svgs/ion_calendar.svg"
import EllipseTwo from "@/assets/svgs/ellipse2.svg"
import { Card, CardContent } from "@/components/ui/card"
import FrameDo from "@/assets/svgs/framedo.svg"
import { PiCoinsFill } from "react-icons/pi";
import {  BiSolidPlaneAlt } from "react-icons/bi";
import { RiBankFill } from "react-icons/ri";
import { MdHomeFilled } from "react-icons/md";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { RefObject, useRef, useState } from 'react';
import Footer from '@/components/footer';
import GetReady from '@/components/GertReady';
import Visa from "@/assets/svgs/visa.svg"
import Mastercard from "@/assets/svgs/mastercard.svg"
import Discover from "@/assets/svgs/discover.svg"
import American from "@/assets/svgs/american.svg"
import Rect from "@/assets/svgs/rect.svg"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CookieConsent from '@/components/cookie-consent';

export default function Home() { 
  const cards = useSelector((state: RootState) => state.card.cards);
  const cardsDuo = useSelector((state: RootState) => state.card.cardsDuo);
  const cardsCarou = useSelector((state: RootState) => state.card.cardsCarousel)
  const cardsCaroutwo = useSelector((state: RootState) => state.card.cardsCarouseltwo)
  const [activeIndex, setActiveIndex] = useState(4)
  const [activeIndextwo, setActiveIndextwo] = useState(4)
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };


  return ( 
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar/>
      {/* Hero Section */} 
      <main className='bg-[#020A13]'> 
        <section className="text-center"> 
          <div className="">
            <div className=""> 
              <div className={styles.hero}> 
                {/* Hero Section */} 
                <div className={`${styles.container} items-center  md:block lg:flex`}> 
                  <div  className={`${styles.content} md:block items-center lg:flex `}> {/* Headline */} 
                    <div data-aos="fade-down" className={`${styles.headline} text-start lg:w-[70%]`}> 
                      <h2 className={styles.title}> 
                        <span className={`${styles.highlight} lg:text-[62px] text-[35px] md:text-[50px] sm:text-[40px] lg:font-[500] leading-[100%]`}>Earn rents rewards </span>
                        <p className="m-0 md:mt-3 md:text-[24px] mt-2 sm:text-[22px] leading-[100%] font-[400]">Maximize benefits on your credit and debit card</p>
                      </h2> 
                      <Link href="/login" className={`${styles.ctaButton} md:mt-10 sm:mt-6 mt-12 bg-[#fff] rounded-[20px] border-none`} target="_blank" rel="noopener noreferrer" > 
                        <p className={styles.ctaText}>Start earning today</p> 
                      </Link> 
                    </div> 
                    {/* Pin Elements */} 
                    <div   className={`${styles.pins} xl:mt-0 lg:mt-0 mt-[160px] md:mt-[200px] pos1 relative lg:h-[302px] md:h-[200px]`}> 
                      {/* Rent Pin */} 
                      <div  className={`${styles.pin} absolute avios top-0`}> 
                        <div className={`${styles.pinCard}  backdrop-blur-sm bg-white/10`}> 
                          <div className={`${styles.pinIconWrapper} w-[48px] h-[48px] flex items-center justify-center bg-[#000A18]`}> 
                            <BiSolidPlaneAlt className='text-gray-400  text-3xl'/>
                          </div> 
                          <div className={styles.pinContent}> 
                            <p className={styles.pinTitle}>Avios airmiles</p> 
                            <div className={styles.pinPoints}> 
                              <Image  src={FrameDo} className='rounded-[20px]' alt='Frame-Duo'/>
                              <p className={styles.pointsText}>400 pts</p> 
                            </div> 
                          </div> 
                        </div> 
                        <span className="relative flex mt-3 w-[7px] h-[7px] left-1/2 transform -translate-x-1/2 opacity-[0.7]">
                          <span className="absolute inline-flex w-full h-full animate-[ping_2s_ease-in-out_infinite] rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.07)]"></span>
                          <span className="relative inline-flex w-[7px] h-[7px] rounded-full bg-white"></span>
                        </span> 



                      </div> 
                      {/* Pharmacy Pin */} 
                      <div className={`${styles.pin} absolute pos2  lg:right-[20px] lg:top-[100px]`}> 
                        <div className={`${styles.pinCard}  bg-gray-800`}> 
                          <div className={`${styles.pinIconWrapper} w-[48px] h-[48px] flex items-center justify-center bg-[#133049]`}>    
                            <MdHomeFilled className='text-blue-200 text-3xl'/>
                          </div> 
                          <div className={styles.pinContent}> 
                            <p className={`${styles.pinTitle}`}>Your referral pays rent</p> 
                            <div className={styles.pinPoints}> 
                              <Image  src={FrameDo} className='rounded-[20px]' alt='Frame-Duo'/>
                              <p className={styles.pointsText}>+5000 pts</p> 
                            </div> 
                          </div> 
                        </div> 
                        <span className="relative flex mt-3 w-[7px] h-[7px] left-1/2 transform -translate-x-1/2 opacity-[0.7]">
                          <span className="absolute inline-flex w-full h-full animate-[ping_2s_ease-in-out_infinite] rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.07)]"></span>
                          <span className="relative inline-flex w-[7px] h-[7px] rounded-full bg-white"></span>
                        </span> 
                      </div> 
                      <div className={`${styles.pin } absolute  pos xl:left-0 xl:top-[30px]`}> 
                        <div className={`${styles.pinCard} backdrop-blur-sm bg-white/10`}> 
                          <div className={`${styles.pinIconWrapper} w-[48px] h-[48px] flex items-center justify-center bg-[#000A18]`} > 
                            <MdHomeFilled className='text-purple-200  text-3xl'/>
                          </div> 
                          <div className={styles.pinContent}> 
                            <p className={styles.pinTitle}>Hilton Honors</p> 
                            <div className={styles.pinPoints}> 
                              <Image  src={FrameDo} className='rounded-[20px]' alt='Frame-Duo'/>
                              <p className={styles.pointsText}>200 pts</p> 
                            </div> 
                          </div> 
                        </div> 
                        <span className="relative flex mt-3 w-[7px] h-[7px] left-1/2 transform -translate-x-1/2 opacity-[0.7]">
                          <span className="absolute inline-flex w-full h-full animate-[ping_2s_ease-in-out_infinite] rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.07)]"></span>
                          <span className="relative inline-flex w-[7px] h-[7px] rounded-full bg-white"></span>
                        </span>                      
                      </div> 
                      {/* Restaurant Pin */} 
                      <div className={`${styles.pin} relative pos3  right-[50px] top-[120px]`}> 
                        <div className={`${styles.pinCard} backdrop-blur-sm bg-white/10`}> 
                          <div className={`${styles.pinIconWrapper} w-[48px] h-[48px] flex items-center justify-center bg-[#15150380] `}> 
                            <PiCoinsFill  className='text-3xl text-green-100'/>
                          </div> 
                          <div className={`${styles.pinContent} text-start`}>  
                            <p className={styles.pinTitle}>IHG rewards</p> 
                            <div className={styles.pinPoints}> 
                              <Image  src={FrameDo} className='rounded-[20px]' alt='Frame-Duo'/>
                              <p className={styles.pointsText}>300 pts</p> 
                            </div> 
                          </div> 
                        </div> 
                        <span className="relative flex mt-3 w-[7px] h-[7px] left-1/2 transform -translate-x-1/2 opacity-[0.7]">
                          <span className="absolute inline-flex w-full h-full animate-[ping_2s_ease-in-out_infinite] rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.07)]"></span>
                          <span className="relative inline-flex w-[7px] h-[7px] rounded-full bg-white"></span>
                        </span> 

                      </div> 
                      {/* Fitness Pin */} 
                      <div className={`${styles.pin} absolute pos4 top-[40px] left-[90px]`}> 
                        <div className={`${styles.pinCard}  backdrop-blur-sm bg-white/10`}> 
                          <div className={`${styles.pinIconWrapper} w-[48px] h-[48px] flex items-center justify-center bg-[#1e0e1a80] `}> 
                            <RiBankFill className='text-red-200 text-3xl' />
                          </div> 
                          <div className={styles.pinContent}> 
                            <p className={styles.pinTitle}>Platinum cashback</p> 
                            <div className={styles.pinPoints}> 
                              <Image  src={FrameDo} className='rounded-[20px]' alt='Frame-Duo'/>
                              <p className={styles.pointsText}>100 pts</p> 
                            </div> 
                            </div>
                          </div> 
                          <span className="relative flex mt-3 w-[7px] h-[7px] left-1/2 transform -translate-x-1/2 opacity-[0.7]">
                            <span className="absolute inline-flex w-full h-full animate-[ping_2s_ease-in-out_infinite] rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.07)]"></span>
                            <span className="relative inline-flex w-[7px] h-[7px] rounded-full bg-white"></span>
                          </span>                        
                      </div> 
                      </div> 
                    </div>                      
                    {/* Background Map */} 
                    <div className={styles.map}> 
                      <Image src="https://framerusercontent.com/images/ewZKWyEDBxGA5M6w17YPCdafro.png" alt="Map background" fill   style={{ objectFit: 'cover' }} priority unoptimized className='bg-cover bg-center z-[-1]'/> 
                    </div> 
                  </div> 
              </div>
            </div> 
          </div> 
        </section> 
        {/* Placeholder for Additional Sections */} 
        <section className=" flex items-center w-full"> 
          <div className="container-fluid px-10 md:py-5 py-3 bg-[#020A13] w-[100%]"> 
            <div className={`${styles.rent}  lg:h-[700px] h-[645px] rounded-[20px] mx-auto container`}>
              <div className="md:flex justify-center relative lg:items-start items-center  px-4 py-10">

                <div className="lg:w-[574px] md:w-[50%]">
                  <div className='lg:mt-10'>
                    <p className="m-0 text-white lg:text-[48px] md:text-[40px] text-[30px] sm:text-[35px]">Rent</p>
                    <p className="md:mt-2 text-[#ffffff] opacity-[90%]">
                      Turn every on-time rent into points, improve your credit with free rent reporting, and get Rent Day rewards every month.
                    </p>
                  </div>
                  <div>
                    <Link
                      href="#earn-rewards"
                      className={`${styles.ctaButton} md:mt-10 sm:mt-6 mt-3 bg-[#fff] hover:bg-blue-400 hover:text-white rounded-[20px] border-none`}
                    >
                      <p className={styles.ctaText}>Explore rewards</p>
                    </Link>
                  </div>
                </div>
                <div className="lg:w-[40%] md:mt-0 mt-10 md:w-[50%]  relative lg:top-[250px] md:px-5 flex justify-end">
                  <div className="w-full backdrop-blur-sm bg-black/35 sm:bg-white/1 rounded-[20px] p-5 mt-auto">
                    <div className="md:py-3 py-2 lg:py-4">
                      <p className="m-0 text-white lg:text-[20px] font-[600] md:text-[18px]">Fall seasons Apt</p>
                      <p className="m-0 text-[#ffffff] opacity-[66%] lg:text-[14px] font-[400] md:text-[13px]">WH3 1BS</p>
                    </div>
                    <div className={`${styles.hr} w-full`}></div>
                    <div className="md:py-3 lg:py-4 py-3 flex justify-between items-center">
                      <div>
                        <p className="m-0 text-white lg:text-[16px] font-[400] md:text-[14px]">Monthly rent</p>
                      </div>
                      <div>
                        <p className="m-0  lg:text-[16px] text-[#fff] font-[400]  md:text-[13px]">£ 3,232</p>
                      </div>
                    </div>
                    <div className={`${styles.hr} w-full`}></div>
                    <div className="flex md:py-3 lg:py-4 py-3 justify-between items-center">
                      <div>
                        <p className="m-0 text-white lg:text-[16px] font-[400] md:text-[14px]">Credit Boost</p>
                      </div>
                      <div>
                        <Link
                          href="https://id.biltrewards.com/login/enter-email/"
                          className={`${styles.ctaButton} !bg-[#009835] !m-0 rounded-[20px] border-none`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <p className={`${styles.ctaText} !text-white font-[500] lg:text-[14px] md:text-[14px] text-[13px]`}>Active</p>
                        </Link>
                      </div>
                    </div>
                    <div className={`${styles.hr} w-full`}></div>
                    <div className="md:py-3 lg:py-4 py-3 flex justify-between items-center">
                      <div>
                        <p className="m-0 text-white lg:text-[16px] font-[400] md:text-[14px]">Annual Points earned</p>
                      </div>
                      <div>
                        <p className="m-0 text-[#ffffff] opacity-[100%] lg:text-[16px] font-[400] md:text-[13px]">58,000 pts</p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div> 
        </section> 
        <section id='earn-rewards' className='xl:mx-20 lg:mx-10 md:mx-2 mx-6 md:my-32 xl:my-38 my-20'> 
          <div className=''>
            <div className='lg:w-[575px] md:mb-10 mb-3 md:w-[100%]'>
              <p className="m-0 lg:text-[48px] text-[#ffffff] md:text-[45px] sm:text-[40px] text-[35px] font-[500] leading-[100%]">Earn rewards on rent</p>
              <p className="m-0 mt-4 lg:text-[20px] leading-[145%] md:text-[18px] text-[16px] text-[#ffffff] opacity-[66%]">Transform your largest monthly expense into valuable rewards – earn Nuba Points with every on-time rent payment and unlock exclusive monthly Rent Day® benefits.</p>
            </div>
            <div className='xl:flex md:mt-0 mt-4 lg:block  items-center justify-center gap-5'>
              <div className="w-full   max-w-md mx-auto">
                <div className="bg-transparent xl:w-[407px] lg:h-[576px] md:h-[600px] rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group">
                  <div className="overflow-hidden">
                    <div className={`${styles.img2} px-7 py-6 flex justify-center items-center`}>
                      <div className='backdrop-blur-md px-7 py-5 rounded-[8px] bg-black/35 xl:w-[359px] xl:h-[143px] lg:w-[120px] lg:h-[140px] md:w-[330px] md:h-[130px] w-[300px] h-[150px]'>
                        <div className='flex xl:mt-1 mt-3 justify-between items-center'>
                          <div> 
                            <p className="m-0 xl:text-[14px] text-[13px]  text-white">Your rent</p>
                          </div>
                          <div>
                            <p className="m-0 xl:text-[14px] text-[13px]  text-[#fff]">£ 3,000</p>
                          </div>
                        </div>
                        <div className='flex xl:mt-4 mt-3 justify-between items-center'>
                          <div> 
                            <p className="m-0 xl:text-[14px] text-[13px]  text-white">Reward</p>
                          </div>
                          <div className=''>
                            <div className="m-0 xl:text-[14px] flex items-center gap-2 text-[13px]  text-[#FFC73B]">
                              <div>
                                <Image  src={FrameDo} className='' alt='Frame-Duo'/> 
                              </div>
                              <div>
                                <p className="m-0">58,000 pts</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={`${styles.hr} xl:mt-3`}></div>
                        <div className='flex items-center gap-4 mt-3 justify-center'>
                            <div>
                              <Image src={Visa} alt="visa-icon"/>
                            </div>
                            <div>
                              <Image src={Mastercard} alt="master-icon"/>
                            </div>
                            <div>
                              <Image src={Discover} alt="discover-icon"/>
                            </div>
                            <div>
                              <Image src={American} alt="american-icon"/>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-xl text-white font-semibold">Earn Points on rent</h3>
                    <p className="text-[#ffffff] opacity-[66%]">
                      Members can maximise earning points by making rent payment using their credit cards. Earn even more points by referring your mates and enjoy up to 100% off your next month rent.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:my-3 xl:my-0 my-5 max-w-md mx-auto">
                <div  className="bg-transparent  xl:w-[407px] lg:h-[576px] md:h-[600px] rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group ">
                  <div className={`${styles.img} px-7 py-6 flex justify-center items-center`}>
                    <div className='backdrop-blur-lg px-7 py-5 rounded-[8px]  bg-black/35 xl:w-[359px] xl:h-[269px] lg:w-[359px] lg:h-[250px] md:w-[330px] md:h-[269px] w-[300px] h-[280px]'>
                      <p className="m-0 text-white xl:text-[14px] text-[13px] opacity-[90%]">Credit score</p>
                      <p className="m-0 text-white text-[12px] mb-2  opacity-[60%]">
                        Experian, Equifax and Transunion
                      </p>
                      <div className={`${styles.hr}`}></div>
                      <div className='flex xl:mt-4 mt-3 justify-between items-center'>
                        <div> 
                          <p className="m-0 xl:text-[14px] text-[13px]  text-white">Good</p>
                        </div>
                        <div>
                          <p className="m-0 xl:text-[14px] text-[13px]  text-[#FFC73B]">3 rent payments</p>
                        </div>
                      </div>
                      <div>
                        <Image  src={EllipseTwo} alt='ellipse-two'/>
                        <div className='flex relative bottom-[60px] md:bottom-[80px] justify-center'>
                          <Image src={Rect} alt="rect-icon"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-xl text-white font-semibold">Enroll & Boost Credit</h3>
                    <p className="text-[#ffffff] opacity-[66%]">Grow your credit score for free—reporting your on-time rent payments to Experian, Equifax, and TransUnion</p>                    
                  </div>
                </div>
              </div>
              <div className="w-full  max-w-md mx-auto">
                <div  className="bg-transparent xl:w-[407px] lg:h-[576px] md:h-[600px] rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ">
                  <div className={`${styles.img3} px-7 py-6 flex justify-center items-center  `}>
                    <div className=''>
                      <div className='backdrop-blur-sm px-5 py-2 rounded-[20px] bg-black/70 xl:w-[359px] xl:h-[62px] lg:w-[350px] lg:h-[60px] md:w-[330px] md:h-[55px] w-[300px] h-[50px]'>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="m-0 text-white xl:text-[14px] text-[13px] opacity-[90%]">Rent Day</p>
                            <p className="m-0 text-white text-[12px] mb-2  opacity-[60%]">
                              1st of each month
                            </p>
                          </div>
                          <div>
                            <div className=''>
                              <div className="m-0 xl:text-[14px] flex items-center gap-2 text-[13px]  text-[#FFC73B]">
                                <div>
                                  <Image  src={FrameDo} className='' alt='Frame-Duo'/> 
                                </div>
                                <div>
                                  <p className="m-0">Rewards</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='backdrop-blur-sm px-5 py-3 mt-2 rounded-[20px] bg-[rgba(0,0,0,0.33)] xl:w-[359px] xl:h-[42px] lg:w-[350px] lg:h-[40px] md:w-[330px] md:h-[38px] w-[300px] h-[45px]'>
                        <div className="flex justify-start items-center">
                          <div className='flex justify-between items-center gap-2'>
                            <BiSolidPlaneAlt className='text-xl text-white'/>
                            <p className="m-0 text-white text-[12px] font-[400]  opacity-[60%]">
                              Industry leading transfer bonuses
                            </p>
                          </div>
                          
                        </div>
                      </div>
                      <div className='backdrop-blur-sm px-5 py-3 mt-2 rounded-[20px] bg-[rgba(0,0,0,0.33)] xl:w-[359px] xl:h-[42px] lg:w-[350px] lg:h-[40px] md:w-[330px] md:h-[38px] w-[300px] h-[60px]'>
                        <div className="flex justify-start items-center">
                          <div className='flex justify-between items-center gap-2'>
                            <Image src={Boxone} className="w-[16px] h-[16px]" alt="box-one"/>
                            <p className="m-0 text-white text-[12px] font-[400]  opacity-[60%]">
                              Exclusive experience in your neighbourhood
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='backdrop-blur-sm px-5 py-3 mt-2 rounded-[20px] bg-[rgba(0,0,0,0.33)] xl:w-[359px] xl:h-[42px] lg:w-[350px] lg:h-[40px] md:w-[330px] md:h-[38px] w-[300px] h-[40px]'>
                        <div className="flex justify-start items-center">
                          <div className='flex justify-between items-center gap-2'>
                            <Image src={Boxtwo} className="w-[16px] h-[16px]" alt="box-two"/>
                            <p className="m-0 text-white text-[12px] font-[400]  opacity-[60%]">
                              Rent free. Your chance to win free rent
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-xl text-white font-semibold">Celebrate Rent PayDay rewards</h3>
                    <p className="text-[#ffffff] opacity-[66%]">Every 1st of the month, we drop limited-time benefits – a chance to win free rent and so much more.</p>                    
                  </div>
                </div>
              </div>              
            </div>
          </div>
        </section>
        <section className='md:my-14 xl:mx-20 mt-[6rem]  lg:mt-[15rem] md:mt-[7rem] mx-5 lg:my-40 md:mx-15'>
          <div className='lg:w-[575px] md:mb-0 mb-4 w-[100%]'>
            <p className="m-0 font-[500] mb-3 leading-[100%] lg:text-[48px] md:text-[45px] text-white sm:text-[42px] text-[35px]">Travel Perks</p>
            <p className="m-0 lg:text-[20px] md:text-[18px] text-[#ffffff] opacity-[66%] ">Use your favorite points accumulated from credit cards for airmiles and hotel discounts.</p>
          </div>
          <div>
            {/* --- Airline Section --- */}
            <div className="flex flex-col items-start md:mt-12 lg:mt-20 px-3 md:px-2">
              <div className="flex justify-between items-center w-full mb-7">
                <p className="text-xl font-semibold text-white lg:text-[20px] text-[18px]">Airline transfer partners</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => scroll(scrollRef1, "left")}className="bg-white rounded-full p-2">
                    <FaArrowLeft className="text-black" />
                  </button>
                  <button onClick={() => scroll(scrollRef1, "right")} className="bg-white rounded-full p-2">
                    <FaArrowRight className="text-black" />
                  </button>
                </div>
              </div>
              <div
                ref={scrollRef1}
                className="flex gap-[8px] overflow-x-hidden scrollbar-hide w-full"
              >
                {cards.map((card, index) => (
                  <div key={index} className="flex-shrink-0 w-[120px] md:w-[144px]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      className="object-contain w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* --- Hotel Section --- */}
            <div className="flex flex-col items-start md:mt-12 mt-3 lg:mt-20 px-3 md:px-2">
              <div className="flex justify-between items-center w-full mb-7">
                <p className="text-xl font-semibold text-white lg:text-[20px] text-[18px]">Hotel transfer partners</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => scroll(scrollRef2, "left")} className="bg-white rounded-full p-2">
                    <FaArrowLeft className="text-black" />
                  </button>
                  <button onClick={() => scroll(scrollRef2, "right")} className="bg-white rounded-full p-2">
                    <FaArrowRight className="text-black" />
                  </button>
                </div>
              </div>
              <div
                ref={scrollRef2}
                className="flex gap-[8px] overflow-x-hidden  scrollbar-hide w-full"
              >
                {cardsDuo.map((card, index) => (
                  <div key={index} className="flex-shrink-0 w-[120px]  flex justify-center items-center md:h-[144px] h-[113px] md:p-0 sm:p-0 p-3 md:w-[152px] rounded-[5px] bg-[rgba(255,255,255,0.07)]">
                    <div className='flex justify-center items-center'>
                      <Image
                        src={card.image}
                        alt={card.title}
                        className="object-contain w-full h-auto"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className='lg:my-[10rem] lg:mt-[16rem] md:mt-[12rem]'>
          <div>
            <div className='sm:mx-10 xl:mx-20  xl:w-[975px] lg:w-[900px] mx-5 md:mx-15 md:my-8  sm:my-3 my-14 lg:mt-42'> 
              <p className="m-0 lg:text-[48px] md:text-[45px] sm:text-[40px] text-[30px] text-white font-[500] leading-[100%]">Why over 1 million members choose the smarter way to pay rent</p>
            </div>
            <div>

              <div className="px-4 lg:mt-14 md:mt-5 mt-6">
                <div className="flex overflow-x-auto gap-2 no-scrollbar pb-2">
                  {cardsCarou.map((card, index) => (
                    <div
                      key={card.id}
                      className="flex-shrink-0 w-[320px] md:w-[384px] h-[200px] sm:h-[266px] bg-white/5 border-none rounded-none"
                    >
                      <div className="p-4 h-full">
                        <Image
                          alt={`Card ${index}`}
                          src={card.title}
                          width={200}
                          height={100}
                          className="mb-4"
                          style={{ width: "auto", height: "auto" }}
                        />
                        <div className="flex mt-4 md:mt-8 lg:mt-10">
                          <p className="text-muted-foreground !text-[#ffffff] opacity-[66%]">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Hotel Partners */}
              <div className="px-4  lg:mb-14 mb-16 md:mb-5 mb-6">
                <div className="flex overflow-x-auto gap-2 no-scrollbar pb-2">
                  {cardsCaroutwo.map((card, index) => (
                    <div
                      key={card.id}
                      className="flex-shrink-0 w-[320px] md:w-[504px] h-[200px] sm:h-[266px] bg-white/5 border-none rounded-none"
                    >
                      <div className="p-4 h-full">
                        <Image
                          alt={`Card ${index}`}
                          src={card.title}
                          width={200}
                          height={100}
                          className="mb-4"
                          style={{ width: "auto", height: "auto" }}
                        />
                        <div className="flex mt-6 md:mt-8 lg:mt-10">
                          <p className="text-muted-foreground !text-[#ffffff] opacity-[66%]">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </div>
        </section>
        <GetReady/>
        <Footer/>
      </main> 
      <CookieConsent variant="default" onAcceptCallback={() => console.log('Accepted')} onDeclineCallback={() => console.log('Declined')}/>
      {/* Footer */} 
    </div> 
  );
}