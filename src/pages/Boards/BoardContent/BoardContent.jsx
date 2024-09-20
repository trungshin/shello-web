import { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCards } from '~/utils/formatters'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLOUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const BoardContent = ({ board, createNewColumn, createNewCard, moveColumns, moveCardInSameColumn, moveCardToDifferentColumns }) => {
  // Require the mouse to move by 10 pixels before activating, Block click event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  // Press delay of 250ms, with tolerance of 5px of movement to trigger the event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  const sensor = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])

  // Only one element is dragged at a time (Column or Card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  // Previous last collision point
  const lastOverId = useRef(null)

  // Find Column by CardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(col => col?.cards?.map(card => card._id)?.includes(cardId))
  }

  // Update the State in case of moving Card between different Columns
  const moveCardBetweenDiffrentColumns = (
    activeCol,
    overCol,
    overCardId,
    active,
    over,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom
  ) => {
    setOrderedColumns(preColumns => {
      // Find the overCard Index in the destination Column
      const overCardIndex = overCol?.cards.findIndex(card => card._id === overCardId)

      // New Card Index calculation logic ( Code from dndKit Library )
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overCol?.cards?.length + 1

      // Clone the old OrderedColumnState array into a new one to process the data and update the new OrderedColumnState.
      const nextColumns = cloneDeep(preColumns)
      const nextActiveColumn = nextColumns.find(col => col._id === activeCol._id)
      const nextOverColumn = nextColumns.find(col => col._id === overCol._id)

      if (nextActiveColumn) {
        // Delete Card in Column Active
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCards(nextActiveColumn)]
        }

        // Update cardOrderIds array
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      if (nextOverColumn) {
        // Check the Card being Dragged exists in the overColumn, if so that need to delete it first
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Add the Card being dragged to overColumn according to the new Index position
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          { ...activeDraggingCardData, columnId: nextOverColumn._id } // rebuild activeDraggingCardData
        )

        // Delete the FE_PlaceholderCard if it exists
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        // Update cardOrderIds array
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      if (triggerFrom === 'handleDragEnd') {
        // Call API update Column
        moveCardToDifferentColumns(
          activeDraggingCardId,
          oldColumnWhenDraggingCard._id,
          nextOverColumn._id,
          nextColumns
        )
      }

      return nextColumns
    })
  }

  //Trigger when Drag Start
  const handleDragStart = (e) => {
    // console.log('handleDragStart: ', e)
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemData(e?.active?.current)
    setActiveDragItemType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD :
      ACTIVE_DRAG_ITEM_TYPE.COLUMN)

    // If Dragging the Card, then perform the action of setting the value of oldColumn
    if (e?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(e?.active?.id))
    }
  }

  // Trigger while dragging an element
  const handleDragOver = (e) => {
    // console.log('handleDragOver: ', e)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) { return }

    const { active, over } = e

    if (!active || !over) return

    // activeDraggingCard: the Card is being dragged
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overCard: the Card that is interacting above or below the Card being dragged
    const { id: overCardId } = over

    // Find two Columns By CardId
    const activeCol = findColumnByCardId(activeDraggingCardId)
    const overCol = findColumnByCardId(overCardId)

    // If either column does not exist, Return
    if (!activeCol || !overCol) return

    // Logic when dragging Card in two different Columns
    if (activeCol._id !== overCol._id) {
      moveCardBetweenDiffrentColumns(
        activeCol,
        overCol,
        overCardId,
        active,
        over,
        activeDraggingCardId,
        activeDraggingCardData,
        handleDragOver
      )
    }
  }

  // //Trigger when Drag End
  const handleDragEnd = (e) => {
    // console.log('handleDragEnd: ', e)
    const { active, over } = e

    // Check if over does not exist
    if (!active || !over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log('Drag & Drop Card Action')

      // activeDraggingCard: the Card is being dragged
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // overCard: the Card that is interacting above or below the Card being dragged
      const { id: overCardId } = over

      // Find two Columns By CardId
      const activeCol = findColumnByCardId(activeDraggingCardId)
      const overCol = findColumnByCardId(overCardId)

      // If either column does not exist, Return
      if (!activeCol || !overCol) return

      console.log('oldColumnWhenDraggingCard: ', oldColumnWhenDraggingCard)
      console.log('overCol: ', overCol)
      if (oldColumnWhenDraggingCard._id !== overCol._id) {
        // Drag and drop Card between two different Columns
        moveCardBetweenDiffrentColumns(
          activeCol,
          overCol,
          overCardId,
          active,
          over,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd'
        )
      } else {
        // Drag and drop Card in the same Column
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(card => card._id === activeDragItemId)
        const newCardIndex = overCol?.cards?.findIndex(card => card._id === overCardId)

        // Use arrayMove to rearrange the original Cards array
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        const dndOrderedCardIds = dndOrderedCards.map(card => card._id)

        setOrderedColumns(preColumns => {
          // Clone the old OrderedColumnState array into a new one to process the data and update the new OrderedColumnState.
          const nextColumns = cloneDeep(preColumns)

          // Find the Column where the Card is about to be dropped
          const targetColumn = nextColumns.find(col => col._id === overCol._id)

          // Update two new values are Card and CardOrderIds in the targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCardIds

          return nextColumns
        })

        moveCardInSameColumn(dndOrderedCards, dndOrderedCardIds, oldColumnWhenDraggingCard._id)
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      console.log('Drag & Drop Column Action')

      // If the position after dragg and dropp is different from the original position
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(col => col._id === active.id)
        const newColumnIndex = orderedColumns.findIndex(col => col._id === over.id)

        // Use arrayMove to rearrange the original Columns array
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

        // Update the original state columns after dragging and dropping
        setOrderedColumns(dndOrderedColumns)

        moveColumns(dndOrderedColumns)
      }
    }

    // After dragging and dropping, these data must always be returned to the original default null value
    setActiveDragItemId(null)
    setActiveDragItemData(null)
    setActiveDragItemType(null)
    setOldColumnWhenDraggingCard(null)
  }

  const dropAnimation = { sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }) }

  useEffect(() => {
    // Columns have been arranged in the highest parent component (boards/_id.jsx)
    setOrderedColumns(board.columns)
  }, [board])

  // Customize collision detection strategy
  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    // Find intersection and collision points with the pointer
    const pointerIntersections = pointerWithin(args)

    if (!pointerIntersections?.length) return

    // Find the first overId in the pointerIntersections array above
    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId) {
      // If over is Column, it will find the closest cardId within that collision area based on the closestCornor collision detection algorithm.
      const checkColumn = orderedColumns.find(col => col._id === overId)
      if (checkColumn) {
        // console.log('overId before: ', overId)
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => container.id !== overId &&
            checkColumn?.cardOrderIds.includes(container.id)
          )
        })[0]?.id
        // console.log('overId after: ', overId)
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    // If overId is null, an empty array is returned
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <>
      <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} sensors={sensor} collisionDetection={collisionDetectionStrategy}>
        <Box sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.layoutCustom.boardContentHeight,
          display: 'flex',
          p: '10px 0'
        }}>
          <ListColumns columns={orderedColumns} createNewColumn={createNewColumn} createNewCard={createNewCard} />
          <DragOverlay dropAnimation={dropAnimation}>
            {!activeDragItemType && null}
            {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
            {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
          </DragOverlay>
        </Box>
      </DndContext>
    </>
  )
}

export default BoardContent