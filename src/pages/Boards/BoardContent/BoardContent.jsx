import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { sortOrder } from '~/utils/sorts'
import { 
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

const BoardContent = ({ board }) => {
  // Require the mouse to move by 10 pixels before activating, Block click event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  // Press delay of 250ms, with tolerance of 5px of movement to trigger the event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  const sensor = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])

  const handleDragEnd = (e) => {
    console.log('handleDragEnd: ', e)
    const { active, over } = e

    // Check if over does not exist
    if (!over) return

    // If the position after dragg and dropp is different from the original position
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(col => col._id === active.id)
      const newIndex = orderedColumns.findIndex(col => col._id === over.id)

      // Use arrayMove to rearrange the original Columns array
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // const dndOrderedColumnsIds = dndOrderedColumns.map(col => col._id)

      // Update the original state columns after dragging and dropping
      setOrderedColumns(dndOrderedColumns)
    }
  }

  useEffect(() => {
    setOrderedColumns(sortOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} sensors={sensor}>
        <Box sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.layoutCustom.boardContentHeight,
          display: 'flex',
          p: '10px 0'
        }}>
          <ListColumns columns={orderedColumns} />
        </Box>
      </DndContext>
    </>
  )
}

export default BoardContent