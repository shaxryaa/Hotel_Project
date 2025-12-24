import React from "react";
import HeroSectionAbout from "@/frontend/components/about/HeroSectionAbout";
import CompanyHistory from "@/frontend/components/about/CompanyHistory";
import MissionVision from "@/frontend/components/about/MissionVision";
import TeamCarousel from "@/frontend/components/about/TeamCarousel";

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