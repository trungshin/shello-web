import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import SelectMode from '~/components/SelectMode'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as ShelloIcon } from '~/assets/shello_logo.svg'
import SvgIcon from '@mui/material/SvgIcon'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Typography } from '@mui/material'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import Profiles from './Menus/Profiles'

const AppBar = () => {
  return (
    <>
      <Box px={0.5} sx={{
        width: '100%',
        height: (theme) => theme.layoutCustom.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AppsIcon sx={{ color: 'primary.main' }}/>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={ShelloIcon} inheritViewBox sx={{ color: 'primary.main', fontSize: 'small' }}/>
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>
              Shello
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button variant="outlined">Create</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField id="outlined-search" label="Search..." type="search" sx={{ minWidth: '120px' }} size='small' />
          <SelectMode />
          <Tooltip title="Notifications">
            <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
              <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
            </Badge>
          </Tooltip>
          <Tooltip title="Information" >
            <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main' }} />
          </Tooltip>
          <Profiles />
        </Box>
      </Box>
    </>
  )
}

export default AppBar
