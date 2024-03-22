import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { sortOrder } from '~/utils/sorts'

const BoardContent = ({ board }) => {
  const orderedColumns = sortOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.layoutCustom.boardContentHeight,
        display: 'flex',
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
      </Box>
    </>
  )
}

export default BoardContent