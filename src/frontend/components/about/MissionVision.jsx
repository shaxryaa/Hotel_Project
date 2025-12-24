const MissionVision = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
          Our Mission & Vision
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-12 space-y-10 md:space-y-0">
          <div className="bg-white shadow-md p-8 rounded-lg flex-1 border-l-4 border-blue-500">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To redefine travel by making comfortable and affordable stays
              accessible across every corner of India, while ensuring every guest feels at home.
            </p>
          </div>

          <div className="bg-white shadow-md p-8 rounded-lg flex-1 border-l-4 border-blue-700">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become India’s most trusted hospitality brand, connecting millions of travelers with memorable and seamless experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;