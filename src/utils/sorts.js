// Order an array of objects based on another array & return new Ordered Array
// The original array will not be modified.
export const sortOrder = (originalArr, orderArr, key) => {
  if (!originalArr || !orderArr || !key) return []
  return [...originalArr].sort((a, b) => orderArr.indexOf(a[key]) - orderArr.indexOf(b[key]))
}