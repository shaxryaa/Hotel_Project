import React from "react";
import HeroSectionAbout from "@/components/HeroSectionAbout";
import CompanyHistory from "@/components/CompanyHistory";
import MissionVision from "@/components/MissionVision";
import TeamCarousel from "@/components/TeamCarousel";

const AboutPage = () => {
  return (
    <div>
      <HeroSectionAbout />
      <CompanyHistory />
      <MissionVision />
      <TeamCarousel />
    </div>
  );
};

export default AboutPage;