import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import GetReady from "@/components/GertReady";
import Navbar from "@/components/header";
import styles from "@/components/home.module.css";

export default function FAQpage() {
  return (
    <div className="!bg-[#020A13]">
      <div>
        <Navbar />
      </div>
      <div className="flex justify-end   items-end">
        <p
          className={`${styles.faq} xl:h-[560px] lg:h-[500px] md:h-[400px] h-[350px] m-0 xl:text-[72px] xl:ps-10 ps-5 flex justify-start items-end lg:text-[50px] font-[600] md:text-[45px] text-[40px] text-white`}
        >
          Frequently Asked <br />
          Questions
        </p>
      </div>
      <div className="xl:my-20 lg:my-16 my-14">
        <FAQ />
      </div>
      <div>
        <GetReady />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
