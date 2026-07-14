import React from 'react';
import { Grid, Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { AlertTriangle, Package } from 'lucide-react';
 
const  Home = () => {
  const stats = [
    { label: "Total Stock On Hand", value: "3,842 units", color: "success.main", desc: "Healthy distribution", icon: <Package size={24} /> },
    { label: "Low Stock Alert", value: "14 SKUs", color: "warning.main", desc: "Action required soon", icon: <AlertTriangle size={24} /> },
    { label: "Out of Stock", value: "3 SKUs", color: "error.main", desc: "Order immediate batch", icon: <AlertTriangle size={24} /> }
  ];
 
  const warehouses = [
    { name: "Mumbai FC (BOM-1)", capacity: 82 },
    { name: "Bengaluru Sort (BLR-2)", capacity: 94 },
    { name: "NCR Logistics (DEL-4)", capacity: 48 }
  ];
 
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>
        Inventory Overview
      </Typography>
 
      {/* Stats Cards Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, i) => (
          <Grid item xs={12} sm={6} lg={4} key={i}>
            <Card sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '16px', bgcolor: 'background.paper' }}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, my: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: stat.color, display: 'block', fontWeight: 'medium' }}>
                    {stat.desc}
                  </Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: '12px', color: stat.color }}>
                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
 
      {/* Split Load Factor Tables */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '16px' }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Warehouse Occupancy Limits
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {warehouses.map((wh, idx) => (
                  <Box key={idx}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{wh.name}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{wh.capacity}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={wh.capacity} 
                      color={wh.capacity > 90 ? 'error' : wh.capacity > 75 ? 'warning' : 'primary'}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
 
export default  Home;