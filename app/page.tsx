import Hero from "@/components/sections/Hero";
import TrustTicket from "@/components/sections/TrustTicket";
import Destinations from "@/components/sections/Destinations";
import GroupTours from "@/components/sections/GroupTours";
import WhyYeto from "@/components/sections/WhyYeto";
import YetoExperience from "@/components/sections/YetoExperience";
import Reviews from "@/components/sections/Reviews";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustTicket />
      <Destinations />
      <GroupTours />
      <WhyYeto />
      <YetoExperience />
      <Reviews />
      <FinalCta />
    </>
  );
}
