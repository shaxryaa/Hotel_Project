import React from 'react'
import BlogHero from '@/components/BlogHero';
import FeaturedBlogsCarousel from '@/components/FeaturedBlogsCarousel'
const blogs = [
  {
    title: 'Top 10 Destinations for Summer 2025',
    description: 'Explore the most trending places to visit this summer...',
    image: '/summer-destinations.jpeg',
    author: 'Samay Singh',
    link: '/blog/summer-destinations',
  },
  {
    title: 'How to Plan a Budget Trip',
    description: 'Learn to save money and still enjoy your trip like a pro.',
    image: '/budget-travel.jpg',
    author: 'Priya Mehra',
    link: '/blog/budget-trip',
  },
  {
    title: 'Travel Photography Tips',
    description: 'Capture your adventures with these beginner-friendly tips.',
    image: '/photography-tips.jpg',
    author: 'Arjun Singh',
    link: '/blog/travel-photography',
  },
  {
    title: 'Solo Travel: A Complete Guide',
    description: 'Solo travel can be life-changing. Here’s everything you need to stay safe and inspired.',
    image: '/solo-travel.jpg',
    author: 'Kavya Kapoor',
    link: '/blog/solo-travel-guide',
  },
  {
    title: 'Hidden Villages of Himachal',
    description: 'Discover offbeat, peaceful villages in Himachal that aren’t flooded with tourists.',
    image: '/himachal-villages.jpg',
    author: 'Rohit Thakur',
    link: '/blog/himachal-hidden-villages',
  },
  {
    title: 'Packing Like a Pro',
    description: 'Tired of overpacking? Learn the secrets to packing light and smart.',
    image: '/packing-tips.jpeg',
    author: 'Meena Rao',
    link: '/blog/packing-tips',
  },
  {
    title: 'Local Food You Must Try in India',
    description: 'From street food to local thalis — here’s a culinary journey across India.',
    image: '/indian-food.jpg',
    author: 'Nikhil Joshi',
    link: '/blog/indian-food-guide',
  },
]
const blog = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <BlogHero />
      <FeaturedBlogsCarousel blogs={blogs} />
    </div>
  )
}

export default blog