export const addThousandsSeparator = (amount: number) => {
  // Convert the amount to a string
  let amountStr = amount.toString()

  // Check if the amount is negative
  let isNegative = false
  if (amountStr.startsWith('-')) {
    isNegative = true
    amountStr = amountStr.substring(1)
  }

  // Split the string by the decimal point
  const parts = amountStr.split('.')

  // Process the integer part, add thousands separator
  let integerPart = parts[0]
  let result = ''
  while (integerPart.length > 3) {
    result = ',' + integerPart.substring(integerPart.length - 3) + result
    integerPart = integerPart.substring(0, integerPart.length - 3)
  }
  result = integerPart + result

  // Process the decimal part
  if (parts.length > 1) {
    const decimalPart = parts[1]
    result += '.' + decimalPart
  }

  // Add the negative sign
  if (isNegative) {
    result = '-' + result
  }

  return result
}
