import { Link } from "react-router-dom"

type DashboardCardProps = {
  heading: string
  title: string
  dateText: string
  linkTo: string
  linkLabel: string
}

export default function DashboardCard({
  heading,
  title,
  dateText,
  linkTo,
  linkLabel,
}: DashboardCardProps) {
  return (
    <div className="
        border border-gray-200 rounded-xl
        p-4 md:p-6
        bg-white
        ">
        <h3 className="
            text-base md:text-lg
            font-semibold
            mb-2 md:mb-4
        ">
            {heading}
        </h3>

        <div className="space-y-1 md:space-y-2">
            <p className="text-lg md:text-xl font-bold">
            {title}
            </p>
            <p className="text-xs md:text-sm text-gray-500">
            {dateText}
            </p>
        </div>

        <div className="mt-2 md:mt-6">
            <Link
            to={linkTo}
            className="
                inline-block
                text-xs md:text-sm
                font-medium
                text-blue-600
                hover:underline
            "
            >
            {linkLabel}
            </Link>
        </div>
    </div>

  )
}