import Image from "next/image";
import styles from "./page.module.css";
import HomepageClient from "@/components/homepage/components/homepage-client";
import GrandLayout from "@/components/layout/grand-layout";

export default function Home() {
  return (
    // <GrandLayout>
    <HomepageClient />
    // </GrandLayout>
  );
}
