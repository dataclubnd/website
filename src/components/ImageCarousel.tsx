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
    <div className="w-full min-h-dvh overflow-hidden">
      <div
        className="flex min-h-dvh transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <div key={index} className="min-w-full min-h-dvh">
            <div className="min-w-dvh h-dvh overflow-hidden object-bottom">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="h-dvh min-w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}