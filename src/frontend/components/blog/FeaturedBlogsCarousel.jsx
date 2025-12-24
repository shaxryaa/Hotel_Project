'use client'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function FeaturedBlogsCarousel({ blogs }) {
  const containerRef = useRef(null)

  const scroll = (direction) => {
    const container = containerRef.current
    if (direction === 'left') {
      container.scrollBy({ left: -300, behavior: 'smooth' })
    } else {
      container.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative px-4 py-8 w-full">
      <h2 className="text-4xl font-semibold text-center mb-6">Featured Blogs</h2>

      <div className="flex items-center gap-4">
        <button onClick={() => scroll('left')}>
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {blogs.map((blog, idx) => (
            <div
              key={idx}
              className="min-w-[300px] max-w-[300px] rounded-2xl shadow-md bg-white p-4 flex-shrink-0"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-xl mb-3"
              />
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{blog.description}</p>
              <p className="text-xs text-gray-500 mt-2">By {blog.author}</p>
              <a
                href={blog.link}
                className="text-blue-600 text-sm mt-2 inline-block hover:underline"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>

        <button onClick={() => scroll('right')}>
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  )
}
