import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const ListCards = ({ cards }) => {
  return (
    <SortableContext items={cards?.map(card => card._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: '0 5px 5px 5px',
        m: '0 5px',
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) => `calc(
            ${theme.layoutCustom.boardContentHeight} -
            ${theme.spacing(5)} -
            ${theme.layoutCustom.headerColumnHeight} -
            ${theme.layoutCustom.footerColumnHeight}
          )`,
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'bfc2cf' }
      }}>
        {cards?.map(card => <Card key={card._id} card={card} /> )}
      </Box>
    </SortableContext>
  )
}

export default ListCards