export const capitalizeFirstLetter = (value) => {
  if (!value) return ''
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}

export const generatePlaceholderCards = (col) => {
  return {
    _id: `${col._id}-placeholder-card`,
    boardId: col.boardId,
    columnId: col._id,
    FE_PlaceholderCard: true
  }
}