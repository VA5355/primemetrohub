import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
  status: 'idle',
  error: null,
  items: [
    {
      id: 'm1',
      module_name: 'Main Dashboard',
      module_icon: 'Dashboard',
      module_url: '/home',
      active: true,
      expanded: false,
      submenus: []
    },
    {
      id: 'm2',
      module_name: 'Inventory Control',
      module_icon: 'Inventory',
      module_url: '/manage',
      active: false,
      expanded: true,
      submenus: [
        { id: 'sub-c1', module_name: 'Manage Categories', module_icon: 'Category', module_url: '/manage/category', active: false },
        { id: 'sub-p1', module_name: 'Manage Products', module_icon: 'Store', module_url: '/manage/product', active: false },
        { id: 'sub-w1', module_name: 'Warehouse Allocation', module_icon: 'Warehouse', module_url: '/manage/warehouse', active: false }
      ]
    },
    {
      id: 'm3',
      module_name: 'Purchase Operations',
      module_icon: 'Receipt',
      module_url: '/purchase',
      active: false,
      expanded: false,
      submenus: [
        { id: 'sub-po1', module_name: 'Create PO', module_icon: 'Add', module_url: '/create/po', active: false },
        { id: 'sub-po2', module_name: 'PO History', module_icon: 'Receipt', module_url: '/manage/purchaseorder', active: false }
      ]
    },
    {
      id: 'm4',
      module_name: 'IAM & User Settings',
      module_icon: 'AccountCircle',
      module_url: '/manage/users',
      active: false,
      expanded: false,
      submenus: []
    }
  ]
};
 
export const sidebarSlice = createSlice({
  name: 'sidebardata',
  initialState,
  reducers: {
    fetchSidebar: (state) => {
      state.status = 'succeeded';
    },
    expandItem: (state, action) => {
      state.items = state.items.map(item => 
        item.id === action.payload.id ? { ...item, expanded: !item.expanded } : item
      );
    },
    activateItem: (state, action) => {
      const activeUrl = action.payload.item.module_url;
      state.items = state.items.map(item => {
        const hasSubActive = item.submenus.some(sub => sub.module_url === activeUrl);
        const submenus = item.submenus.map(sub => ({
          ...sub,
          active: sub.module_url === activeUrl
        }));
        return {
          ...item,
          active: item.module_url === activeUrl || hasSubActive,
          expanded: item.module_url === activeUrl || hasSubActive ? true : item.expanded,
          submenus
        };
      });
    },
    triggerPageChange: (state, action) => {
      const path = action.payload.pathname;
      state.items = state.items.map(item => {
        const isMainActive = item.module_url === path;
        const submenus = item.submenus.map(sub => ({
          ...sub,
          active: sub.module_url === path
        }));
        const hasSubActive = submenus.some(sub => sub.active);
        return {
          ...item,
          active: isMainActive || hasSubActive,
          submenus
        };
      });
    }
  }
});
 
export const { fetchSidebar, expandItem, activateItem, triggerPageChange } = sidebarSlice.actions;
export default sidebarSlice.reducer;
