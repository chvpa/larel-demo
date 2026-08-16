import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function SectionHeader({ title, subtitle, to }: { title: string; subtitle?: string; to?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4 px-4 md:px-0">
      <div>
        <h2 className="headline text-xl md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-zinc-500">{subtitle}</p>}
      </div>
      {to && (
        <Link to={to} className="label flex shrink-0 items-center gap-1 text-sm underline-offset-4 hover:underline">
          Ver todo <ArrowRight size={15} />
        </Link>
      )}
    </div>
  )
}
