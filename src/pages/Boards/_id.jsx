import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { generatePlaceholderCards } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { fetchBoardsDetailAPI,
  createColumnAPI,
  createCardAPI,
  updateBoardsDetailAPI,
  updateColumnDetailAPI,
  updateCardToDifferentColumnAPI,
  deleteColumnAPI } from '~/apis'
import { sortOrder } from '~/utils/sorts'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'

const Board = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '66eab4e177c6a363dc571b0c'
    fetchBoardsDetailAPI(boardId).then(board => {
      // Arrange the columns in order before passing the data below the child components
      board.columns = sortOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach(column => {
        // Drag and drop the card into an empty column when refreshing the web page
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCards(column)]
          column.cardOrderIds = [generatePlaceholderCards(column)._id]
        } else {
          // Arrange the cards in order before passing the data below the child components
          column.cards = sortOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  // Call create column API
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Drag & Drop empty column when create new column
    createdColumn.cards = [generatePlaceholderCards(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCards(createdColumn)._id]

    // Update state boards
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  // Call create card API
  const createNewCard = async (newCardData) => {
    const createdCard = await createCardAPI({
      ...newCardData,
      boardId: board._id
    })
    console.log('createdCard', createdCard)

    // Update state boards
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)

    // Empty column have FE_PlaceholderCard
    if (columnToUpdate) {
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    setBoard(newBoard)
  }

  // Call API and handle when drag and drop columns end
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(col => col._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Call API to update the order of columns
    updateBoardsDetailAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  const moveCardInSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(col => col._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    // Call API update Column
    updateColumnDetailAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  /**
   * Update the cardOrderIds array of the original column that contains it
   * Update the cardOrderIds array of the next column
   * Update the columnId field of the dragged card
  **/
  const moveCardToDifferentColumns = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(col => col._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Call API to update the order of columns
    let preCardOrderIds = dndOrderedColumns.find(col => col._id === prevColumnId)?.cardOrderIds
    if (preCardOrderIds[0].includes('placeholder-card')) { preCardOrderIds = [] }
    updateCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      preCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(col => col._id === nextColumnId)?.cardOrderIds
    })
  }

  const deleteColumn = (columnId) => {
    // Update state boards
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(col => col._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
    setBoard(newBoard)

    // Call API
    deleteColumnAPI(columnId).then(res => {
      toast.success(res.deleteResult)
    })
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}
      >
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInSameColumn={moveCardInSameColumn}
        moveCardToDifferentColumns={moveCardToDifferentColumns}
        deleteColumn={deleteColumn}
      />
    </Container>
  )
}

export default Board
