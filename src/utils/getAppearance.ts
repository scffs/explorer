export const getProgressAppearance = (
  value: number
): 'positive' | 'accent' | 'negative' => {
  switch (true) {
    case value > 60:
      return 'positive'
    case value > 30:
      return 'accent'
    default:
      return 'negative'
  }
}
