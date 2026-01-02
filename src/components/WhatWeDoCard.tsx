type Props = {
    title: string
    description: string
  }
  
  export default function WhatWeDoCard({ title, description }: Props) {
    return (
      <div className="
        border border-gray-200 rounded-xl
        p-4 md:p-6
        bg-white
      ">
        <h3 className="text-base md:text-lg font-semibold mb-2">
          {title}
        </h3>
  
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    )
  }  