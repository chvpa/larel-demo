const nf = new Intl.NumberFormat('es-PY')

export const gs = (n: number) => `Gs. ${nf.format(Math.round(n))}`

/** Short form for dashboard KPIs: Gs. 166,5 M */
export const gsCompact = (n: number) => {
  if (n >= 1_000_000) return `Gs. ${(n / 1_000_000).toFixed(1).replace('.', ',')} M`
  if (n >= 1_000) return `Gs. ${Math.round(n / 1000)} mil`
  return gs(n)
}

export const pct = (price: number, compareAt: number) =>
  Math.round((1 - price / compareAt) * 100)

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-PY', { day: 'numeric', month: 'short', year: 'numeric' })
