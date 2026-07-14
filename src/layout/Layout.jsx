import React, { useState } from 'react';
import { 
  AppBar, Toolbar, IconButton, Typography, Drawer, List, 
  ListItemButton, ListItemIcon, ListItemText, Collapse, Box, 
  Avatar, Tooltip, useTheme 
} from '@mui/material';
import { 
  Menu as MenuIcon, ChevronUp, ChevronDown, User, Settings, 
  Bell, Sun, Moon, Plus, Layers, Warehouse, Users, 
  FileSpreadsheet, Package, Sliders, LayoutGrid 
} from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { expandItem, activateItem } from '../redux/reducer/sidebardata';
//import logo from './assets/logo_dark_header.png';
 import GoogleAdBanner from '../components/GoogleAdBanner';

function getImageUrl(name) {
  // note that this does not include files in subdirectories
  return new URL(`./assets/${name}.png`, import.meta.url).href
}

const  Layout = ({ sidebarList = [], themeMode, setThemeMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const logo = getImageUrl('logo_dark_header');
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const drawerWidth = 280;
 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
 
  const handleDesktopToggle = () => {
    setDesktopOpen(!desktopOpen);
  };
 
  const handleSidebarMenuClick = (item) => {
    if (item.submenus && item.submenus.length > 0) {
      dispatch(expandItem({ id: item.id }));
    } else {
      dispatch(activateItem({ item }));
      navigate(item.module_url);
    }
  };
 
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Dashboard': return <LayoutGrid size={20} />;
      case 'Inventory': return <Package size={20} />;
      case 'Category': return <Layers size={20} />;
      case 'Store': return <Sliders size={20} />;
      case 'Warehouse': return <Warehouse size={20} />;
      case 'Add': return <Plus size={20} />;
      case 'Receipt': return <FileSpreadsheet size={20} />;
      case 'AccountCircle': return <Users size={20} />;
      default: return <User size={20} />;
    }
  };
 
  const drawerContent = (
    <Box sx={{ height: '100%', bgcolor: 'background.paper', py: 2, px: 2 }}>
      {/* Branding Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, px: 1 }}>
        {/** rounded-lg bg-[#FF9900] text-[#131921]  */}
        <div className="w-16 h-16 font-black text-xl flex items-center justify-center">
          <img src={import.meta.env.BASE_URL+'assets/logo_dark_header.png'} alt="Logo" />
        </div>
        <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: -0.5, color: 'text.primary' }}>
          Prime Computers<span className="text-[#FF9900] font-medium">hub</span>
        </Typography>
      </Box>
 
      {/* Navigation List */}
      <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {sidebarList.map((item) => (
          <div key={item.id}>
            <ListItemButton
              onClick={() => handleSidebarMenuClick(item)}
              sx={{
                borderRadius: '8px',
                py: 1.2,
                bgcolor: item.active ? 'secondary.main' : 'transparent',
                color: item.active ? '#131921' : 'text.primary',
                '&:hover': {
                  bgcolor: item.active ? 'secondary.light' : 'action.hover',
                }
              }}
            >
              <ListItemIcon sx={{ color: item.active ? '#131921' : 'text.secondary', minWidth: 36 }}>
                {getIcon(item.module_icon)}
              </ListItemIcon>
              <ListItemText 
                primary={item.module_name} 
                primaryTypographyProps={{ fontSize: '13px', fontWeight: item.active ? 'bold' : 'medium' }} 
              />
              {item.submenus && item.submenus.length > 0 && (
                item.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />
              )}
            </ListItemButton>
 
            {item.submenus && item.submenus.length > 0 && (
              <Collapse in={item.expanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 2, mt: 0.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {item.submenus.map((sub) => (
                    <ListItemButton
                      key={sub.id}
                      onClick={() => handleSidebarMenuClick(sub)}
                      sx={{
                        borderRadius: '8px',
                        py: 1,
                        bgcolor: sub.active ? 'secondary.main' : 'transparent',
                        color: sub.active ? '#131921' : 'text.primary',
                        '&:hover': {
                          bgcolor: sub.active ? 'secondary.light' : 'action.hover',
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: sub.active ? '#131921' : 'text.secondary', minWidth: 32 }}>
                        {getIcon(sub.module_icon)}
                      </ListItemIcon>
                      <ListItemText 
                        primary={sub.module_name}
                        primaryTypographyProps={{ fontSize: '12px', fontWeight: sub.active ? 'bold' : 'normal' }} 
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </Box>
  );
 
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* AppBar Header */}
      <AppBar 
        position="fixed" 
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              color="inherit" 
              edge="start" 
              onClick={handleDrawerToggle} 
              sx={{ mr: 1, display: { sm: 'none' }, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              edge="start" 
              onClick={handleDesktopToggle} 
              sx={{ mr: 1, display: { xs: 'none', sm: 'inline-flex' }, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
 
          {/* Quick settings and details */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="Toggle light/dark theme">
              <IconButton 
                onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} 
                sx={{ color: 'secondary.main' }}
              >
                {themeMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </IconButton>
            </Tooltip>
 
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', p: 0.5 }}>
              <Avatar sx={{ bgcolor: 'secondary.main', color: '#131921', fontWeight: 'bold', width: 32, height: 32 }}>
                O
              </Avatar>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
 
      {/* Sidebars (Mobile Drawer & Desktop Persistent) */}
      <Box component="nav" sx={{ width: { sm: desktopOpen ? drawerWidth : 0 }, flexShrink: { sm: 0 }, transition: 'width 0.3s' }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="persistent"
          open={desktopOpen}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: desktopOpen ? drawerWidth : 0, transition: 'width 0.3s', pt: '64px' },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
 
      {/* Main Container Content */}
      <Box
        component="main" 
        sx={{
          flexGrow: 1, 
          pt: '84px', 
          px: { xs: 2, sm: 4 }, 
          pb: 4, 
          width: { sm: `calc(100% - ${desktopOpen ? drawerWidth : 0}px)` },
          transition: 'margin-left 0.3s',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Ad sits perfectly inside the content wrapper below the header, honoring grid constraints */}
        <Box sx={{ w: '100%', mb: 1 }}>
          <GoogleAdBanner />
        </Box>

        {/* Dynamic page contents go here */}
        <Outlet />
      </Box>
    </Box>
  );
};
 
export default Layout;
