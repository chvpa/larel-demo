const HEX: Record<string, string> = {
  negro: '#161616',
  blanco: '#f5f5f5',
  gris: '#9ca3af',
  verde: '#26fe41',
  azul: '#2563eb',
  rojo: '#dc2626',
  naranja: '#ea580c',
  amarillo: '#facc15',
  rosa: '#f9a8d4',
  crema: '#ede4d3',
}

/** Returns a CSS background for a color name, supporting "Rojo/Negro" duotones. */
export function colorSwatch(name: string): string {
  const parts = name.toLowerCase().split('/').map((p) => HEX[p.trim()] ?? '#d4d4d8')
  if (parts.length === 1) return parts[0]
  return `linear-gradient(135deg, ${parts[0]} 0 50%, ${parts[1]} 50% 100%)`
}
