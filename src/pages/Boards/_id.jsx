import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { generatePlaceholderCards } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { fetchBoardsDetailAPI, createColumnAPI, createCardAPI } from '~/apis'

const Board = () => {
  const [board, setBoard] = useState()

  useEffect(() => {
    const boardId = '66eab4e177c6a363dc571b0c'
    fetchBoardsDetailAPI(boardId).then(board => {
      // Drag & Drop empty column
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCards(column)]
          column.cardOrderIds = [generatePlaceholderCards(column)._id]
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
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard}/>
    </Container>
  )
}

export default Board
