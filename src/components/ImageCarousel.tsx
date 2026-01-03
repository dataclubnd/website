import { useEffect, useState } from "react"

type CarouselProps = {
  images: string[]
  interval?: number // milliseconds
}

export default function ImageCarousel({
  images,
  interval = 5000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      )
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <div key={index} className="min-w-full">
            <div className="aspect-[80/27] w-full overflow-hidden">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}