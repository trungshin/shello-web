import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { useParams } from 'react-router-dom'
import { fetchBoardsDetailAPI } from '~/apis'

const Board = () => {
  const [board, setBoard] = useState()
  const { id } = useParams()

  useEffect(() => {
    const boardId = '66ea2e63f00564eccc94acfb'
    fetchBoardsDetailAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
