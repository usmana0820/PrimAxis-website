export const CARD_REVEAL_VARIANTS = [
  'slide-left',
  'slide-right',
  'slide-top',
  'slide-bottom',
]

export function getCardRevealVariant(index, columns = 3) {
  const col = index % columns
  const row = Math.floor(index / columns)

  const byPosition = [
    ['slide-left', 'slide-top', 'slide-right'],
    ['slide-top', 'slide-bottom', 'slide-top'],
    ['slide-right', 'slide-bottom', 'slide-left'],
    ['slide-bottom', 'slide-left', 'slide-bottom'],
  ]

  return byPosition[row % byPosition.length][col % columns]
    ?? CARD_REVEAL_VARIANTS[index % CARD_REVEAL_VARIANTS.length]
}
