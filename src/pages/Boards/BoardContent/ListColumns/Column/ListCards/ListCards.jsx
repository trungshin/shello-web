import Box from '@mui/material/Box'
import Card from './Card/Card'

const ListCards = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      p: '0 5px',
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
      <Card />
      <Card hideImg />
      <Card hideImg />
      <Card hideImg />
      <Card hideImg />
      <Card hideImg />
    </Box>
  )
}

export default ListCards