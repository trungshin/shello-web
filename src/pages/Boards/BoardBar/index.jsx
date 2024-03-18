import Box from '@mui/material/Box'

function BoardBar() {
  return (
    <>
      <Box sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.layoutCustom.boardBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Bar
      </Box>
    </>
  )
}

export default BoardBar