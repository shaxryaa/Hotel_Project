const CompanyHistory = () => {
  const milestones = [
    {
      year: "2021",
      title: "Founded in New Delhi",
      description:
        "StayKaro was born with a vision to make comfortable and affordable stays accessible across India.",
    },
    {
      year: "2022",
      title: "Launched StayKaro Luxe",
      description:
        "Introduced our luxury collection of curated hotels offering premium experiences.",
    },
    {
      year: "2023",
      title: "Mobile App Launch",
      description:
        "Released the StayKaro app to enable easy booking, personalized suggestions, and offers.",
    },
    {
      year: "2024",
      title: "50+ Cities Expansion",
      description:
        "Expanded across major cities in India with a loyal base of happy guests and hosts.",
    },
    {
      year: "2025",
      title: "Global Expansion",
      description:
        "Taking StayKaro international with plans to launch in Southeast Asia and the Middle East.",
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-700 text-center mb-12">
          Our History
        </h2>
        <div className="relative border-l-4 border-blue-500 ml-6">
          {milestones.map((item, idx) => (
            <div key={idx} className="mb-15 ml-10">
              <div className="absolute -left-3.5 w-7 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                {item.year.slice(2)}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;