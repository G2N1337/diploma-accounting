export const formatRaz = (n: number): string => {
  const lastDigit = n % 10;
  const lastTwoDigits = n % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return `${n} раз`;
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return `${n} раза`;
  } else {
    return `${n} раз`;
  }
}
