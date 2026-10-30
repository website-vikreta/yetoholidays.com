import Hero from "@/components/sections/Hero";
import Divider from "@/components/ui/Divider";
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
      <Divider variant="route" className="mt-10" />
      <Destinations />
      <Divider variant="dashed" className="my-6" />
      <GroupTours />
      <Divider variant="dashed" className="my-6" />
      <WhyYeto />
      <YetoExperience />
      <Reviews />
      <FinalCta />
    </>
  );
}
