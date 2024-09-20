import { useState } from 'react'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'

const ListColumns = ({ columns, createNewColumn, createNewCard, deleteColumn }) => {
  const [newColumnForm, setNewColumnForm] = useState(false)
  const toggleNewColumnForm = () => setNewColumnForm(!newColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error('Please Enter Column Title!')
      return
    }

    // Create column data to call API
    const newColumnData = {
      title: newColumnTitle
    }

    createNewColumn(newColumnData)

    // Close newColumnForm state & clear Input
    toggleNewColumnForm()
    setNewColumnTitle('')
  }

  return (
    <SortableContext items={columns?.map(col => col._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {columns?.map(column => <Column
          key={column._id}
          column={column}
          createNewCard={createNewCard}
          deleteColumn={deleteColumn}
        /> )}

        {/* Box add new column */}
        {!newColumnForm
          ? <Box onClick={toggleNewColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}>
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}>
              Add new column
            </Button>
          </Box>
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              label="Enter column title..."
              type="text"
              variant='outlined'
              autoFocus
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
              size='small'
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={addNewColumn}
                variant='contained'
                color='success'
                size='small'
                sx={{
                  boxShadow: 'none',
                  border:'0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgColor: (theme) => theme.palette.success.main }
                }}
              >
              Add Column
              </Button>
              <CloseIcon
                fontSize='small'
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                onClick={toggleNewColumnForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns