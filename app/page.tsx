import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import HowItWorks from "@/components/HowItWorks";
import Quiz from "@/components/Quiz";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Destinations />
      <HowItWorks />
      <Quiz />
      <BookingForm />
      <Footer />
    </main>
  );
}
