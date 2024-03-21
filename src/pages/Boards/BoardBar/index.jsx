import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  px: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

const BoardBar = () => {
  return (
    <>
      <Box sx={{
        width: '100%',
        height: (theme) => theme.layoutCustom.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        px: 2,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            sx={MENU_STYLES}
            icon={<DashboardIcon />}
            label="TrungShin"
            clickable
          />
          <Chip
            sx={MENU_STYLES}
            icon={<VpnLockIcon />}
            label="Private/Public Workspace"
            clickable
          />
          <Chip
            sx={MENU_STYLES}
            icon={<AddToDriveIcon />}
            label="Add To Google Drive"
            clickable
          />
          <Chip
            sx={MENU_STYLES}
            icon={<BoltIcon />}
            label="Automation"
            clickable
          />
          <Chip
            sx={MENU_STYLES}
            icon={<FilterListIcon />}
            label="Filters"
            clickable
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<PersonAddIcon />}
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': { borderColor: 'white' }
            }}
          >
            Invite
          </Button>
          <AvatarGroup
            max={5}
            sx={{
              gap:'10px',
              '& .MuiAvatar-root': {
                width: 34,
                height: 34,
                fontSize: 16,
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                '&:first-of-type': { bgcolor: '#a4b0be' }
              }
            }}
          >
            <Tooltip title='conan'>
              <Avatar
                alt="conan"
                src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474250ZNp/photo-6-16675562029442139900239-1667630383932-16676303841561657948359.jpg"
              />
            </Tooltip>
            <Tooltip title='luffy'>
              <Avatar
                alt="luffy"
                src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474052DNL/hinh-anh-luffy-de-thuong_101533809.jpg"
              />
            </Tooltip>
            <Tooltip title='zoro'>
              <Avatar
                alt="zoro"
                src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/anh-zoro-den-trang-cuc-ngau-1-02-13-45-40.jpg"
              />
            </Tooltip>
            <Tooltip title='sanji'>
              <Avatar
                alt="sanji"
                src="https://up-pic.itoon.org/contribute/fiction/5904922/avatar/40496615/1666760441112.jpeg-s200webp?sign=659423ce40620fa1a668bcf991373615&t=65badf00"
              />
            </Tooltip>
            <Tooltip title='songoku'>
              <Avatar
                alt="songoku"
                src="https://cdn.lazi.vn/storage/uploads/users/avatar/186103_1558271550.jpg"
              />
            </Tooltip>
            <Tooltip title='vegeta'>
              <Avatar
                alt="vegeta"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4b6edf66-34c7-4f96-b7c4-b01b89515e90/depwt9h-d2c34406-58d0-4f2a-a07c-67719b322a5c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRiNmVkZjY2LTM0YzctNGY5Ni1iN2M0LWIwMWI4OTUxNWU5MFwvZGVwd3Q5aC1kMmMzNDQwNi01OGQwLTRmMmEtYTA3Yy02NzcxOWIzMjJhNWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Js862OaLCZTgm4T2IhT_ulzEKCRdVdejF-KKSxRIxpI"
              />
            </Tooltip>
            <Tooltip title='shank'>
              <Avatar
                alt="shank"
                src="https://lh3.googleusercontent.com/proxy/ov7oPRDL7NXYilYcM_fwyITaTo4Vs0vAvY2gu2xGE-u5wOb6f3JMgV6FY89AeMAjg9ahzv1847NxUuEawn3mKeLaS0VngylLBxwuN5sw4xGyoxfABtEDkArTaO9e0KpO41FvZeeB-Qer4oY"
              />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
    </>
  )
}

export default BoardBar