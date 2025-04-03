import BestBusiness from "@/components/BestBusiness/BestBusiness";
import Cards from "@/components/Cards/Card";
import Billing from "@/components/Billing/Billing";
import CounterData from "@/components/CounterData/CounterData";
import FirstBlock from "@/components/FirstBlock/FirstBlock";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Payments from "@/components/Payments/Payments";
import Testimonials from "@/components/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <FirstBlock />
      <CounterData />
      <BestBusiness />
      <Cards />
      <Billing />
      <Testimonials />
      <Payments />
      <Footer />
    </>
  )
}
