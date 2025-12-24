export default function BlogHero() {
  return (
    <section className="relative h-[80vh] w-full">
      <img
        src="/blog-hero.png"
        alt="Blog Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
        <p className="text-lg md:text-xl text-center px-4 md:px-0">
          Explore the latest trends, insights, and stories from our experts.
        </p>
      </div>
    </section>
  );
}
