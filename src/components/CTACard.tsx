import { Link } from "react-router-dom"

type CTACardProps = {
  to: string
  color: string
  hover: string
  text: string
  target: string
  border?: string
  textColor?: string
}

export default function CTACard({ to, color, hover, text, target="_self", border, textColor="text-white"}: CTACardProps) {
  return (
    <Link
      to={to}
      className={`
        inline-flex items-center justify-center
        rounded-lg
        ${color} ${textColor}
        px-6 py-3
        text-sm md:text-base font-medium
        text-center
        ${hover}
        transition
        ${border}
      `}
      target={target}
    >
      {text}
    </Link>
  )
}