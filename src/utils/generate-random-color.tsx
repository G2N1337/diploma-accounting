export function getRandomMantineColor(): string {
  const colors = [
    'red',
    'pink',
    'grape',
    'violet',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
    'lime',
    'yellow',
    'orange',
  ]
  const randomIndex = Math.floor(Math.random() * colors.length)
  const selectedColor = colors[randomIndex]
  return `${selectedColor}.9`
}

export function getUniqueMantineColor(index: number): string {
  const colors = [
    'red',
    'pink',
    'grape',
    'violet',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
    'lime',
    'yellow',
    'orange',
  ]
  return `${colors[index % colors.length]}.9`
}
