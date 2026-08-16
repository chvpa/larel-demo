import { useState } from 'react'
import { categories, brands } from '../../data/products'

const SHOE_SIZES = ['37', '38', '39', '40', '41', '42', '43', '44']
const CLOTH_SIZES = ['S', 'M', 'L', 'XL', 'XXL']

function ChipGroup({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onToggle(o)}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            selected.includes(o) ? 'border-ink bg-ink text-white' : 'border-zinc-200 hover:border-ink'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export function Preferences() {
  // ponytail: local state only — a real app persists this to the user profile
  const [shoeSize, setShoeSize] = useState<string[]>(['38'])
  const [clothSize, setClothSize] = useState<string[]>(['M'])
  const [cats, setCats] = useState<string[]>(['Running', 'Fitness'])
  const [favBrands, setFavBrands] = useState<string[]>(['Nike', 'Adidas'])
  const [saved, setSaved] = useState(false)

  const mk = (arr: string[], set: (v: string[]) => void) => (v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

  return (
    <div className="max-w-2xl space-y-7">
      <div>
        <h2 className="headline text-lg">Tus talles</h2>
        <p className="mb-3 text-sm text-zinc-500">Te mostramos primero lo que hay en tu talle.</p>
        <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-zinc-500">Calzado</p>
        <ChipGroup options={SHOE_SIZES} selected={shoeSize} onToggle={mk(shoeSize, setShoeSize)} />
        <p className="mb-2 mt-4 text-xs font-extrabold uppercase tracking-wide text-zinc-500">Prendas</p>
        <ChipGroup options={CLOTH_SIZES} selected={clothSize} onToggle={mk(clothSize, setClothSize)} />
      </div>

      <div>
        <h2 className="headline mb-3 text-lg">Deportes que te interesan</h2>
        <ChipGroup
          options={categories.filter((c) => c.slug !== 'todos').map((c) => c.label)}
          selected={cats}
          onToggle={mk(cats, setCats)}
        />
      </div>

      <div>
        <h2 className="headline mb-3 text-lg">Marcas favoritas</h2>
        <ChipGroup options={brands} selected={favBrands} onToggle={mk(favBrands, setFavBrands)} />
      </div>

      <button
        onClick={() => {
          setSaved(true)
          setTimeout(() => setSaved(false), 2000)
        }}
        className="w-full rounded-full bg-ink py-4 font-bold text-white transition active:scale-[0.98] md:w-auto md:px-10"
      >
        {saved ? '✓ Preferencias guardadas' : 'Guardar preferencias'}
      </button>
    </div>
  )
}
