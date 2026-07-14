import React, { useState } from 'react';
import { 
  Box, Grid, Card, CardContent, Typography, TextField, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, MenuItem, Select, FormControl, InputLabel, Divider
} from '@mui/material';
import { Plus, Trash2, CheckCircle, PackageOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CreatePurchaseOrder = () => {
  const [items, setItems] = useState([
    { id: 1, sku: 'SKU-AMZ-8821', name: 'Fire TV Stick 4K Max', quantity: 50, price: 45.00 },
    { id: 2, sku: 'SKU-AMZ-0034', name: 'Echo Dot (5th Gen)', quantity: 30, price: 35.00 }
  ]);

  const [formInput, setFormInput] = useState({ sku: '', name: '', quantity: '', price: '' });

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!formInput.sku || !formInput.name || !formInput.quantity || !formInput.price) return;

    const newItem = {
      id: Date.now(),
      sku: formInput.sku,
      name: formInput.name,
      quantity: parseInt(formInput.quantity, 10),
      price: parseFloat(formInput.price)
    };

    setItems([...items, newItem]);
    setFormInput({ sku: '', name: '', quantity: '', price: '' });
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Real-time Calculations
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const taxRate = 0.18; // 18% Standard Tax
  const shippingCost = subtotal > 1000 ? 0 : 50; 
  const totalTax = subtotal * taxRate;
  const grandTotal = subtotal + totalTax + shippingCost;

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>
        Create Purchase Order
      </Typography>

      <Grid container spacing={3} alignItems="flex-start">
        {/* Left Side 8-Columns: Dynamic Item Editor */}
        <Grid item xs={12} lg={8}>
          <Box className="flex flex-col gap-6">
            {/* Entry Form */}
            <Card sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '16px' }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Add Inventory Item
                </Typography>
                <form onSubmit={handleAddItem} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                  <TextField
                    label="SKU / Barcode"
                    value={formInput.sku}
                    onChange={(e) => setFormInput({ ...formInput, sku: e.target.value })}
                    variant="outlined"
                    size="small"
                    placeholder="e.g. SKU-AMZ-1234"
                  />
                  <TextField
                    label="Item Name"
                    value={formInput.name}
                    onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
                    variant="outlined"
                    size="small"
                    placeholder="e.g. Kindle Paperwhite"
                  />
                  <TextField
                    label="Quantity"
                    type="number"
                    value={formInput.quantity}
                    onChange={(e) => setFormInput({ ...formInput, quantity: e.target.value })}
                    variant="outlined"
                    size="small"
                    placeholder="0"
                  />
                  <TextField
                    label="Unit Cost ($)"
                    type="number"
                    value={formInput.price}
                    onChange={(e) => setFormInput({ ...formInput, price: e.target.value })}
                    variant="outlined"
                    size="small"
                    placeholder="0.00"
                  />
                  <div className="sm:col-span-2 md:col-span-4 flex justify-end">
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="secondary" 
                      startIcon={<Plus size={18} />}
                      sx={{ color: '#131921', fontWeight: 'bold', textTransform: 'none' }}
                    >
                      Add to PO list
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Added Items Table List */}
            <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '16px', boxShadow: 'none' }}>
              <Table>
                <TableHead sx={{ bgcolor: 'action.hover' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>SKU</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Qty</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Unit Price</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Total</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <AnimatePresence>
                    {items.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                          <Box className="flex flex-col items-center gap-2 text-gray-400">
                            <PackageOpen size={48} />
                            <Typography variant="body2">No inventory items added to this PO draft.</Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      items.map((item) => (
                        <TableRow 
                          key={item.id}
                          component={motion.tr}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                        >
                          <TableCell sx={{ fontFamily: 'monospace' }}>{item.sku}</TableCell>
                          <TableCell sx={{ fontWeight: 'medium' }}>{item.name}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                          <TableCell align="right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                          <TableCell align="center">
                            <IconButton onClick={() => handleDeleteItem(item.id)} color="error" size="small">
                              <Trash2 size={16} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        {/* Right Side 4-Columns: Sticky Summary Invoice Panel */}
        <Grid item xs={12} lg={4} className="lg:sticky lg:top-[84px]">
          <Card sx={{ border: '2px solid', borderColor: 'secondary.main', borderRadius: '16px', bgcolor: 'background.paper' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <div className="flex flex-col gap-3 mb-4">
                <div className="flex justify-between">
                  <Typography variant="body2" color="text.secondary">Total Items:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {items.reduce((sum, item) => sum + item.quantity, 0)} units
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="body2" color="text.secondary">Subtotal:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>${subtotal.toFixed(2)}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="body2" color="text.secondary">Estimated tax (18%):</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>${totalTax.toFixed(2)}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="body2" color="text.secondary">Shipping Fee:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {shippingCost === 0 ? <span className="text-green-600 font-bold">FREE</span> : `$${shippingCost.toFixed(2)}`}
                  </Typography>
                </div>
              </div>

              <Divider sx={{ mb: 2 }} />
              <div className="flex justify-between items-baseline mb-6">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Grand Total:</Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: 'secondary.dark' }}>
                  ${grandTotal.toFixed(2)}
                </Typography>
              </div>

              <Button 
                variant="contained" 
                color="secondary" 
                fullWidth
                size="large"
                disabled={items.length === 0}
                startIcon={<CheckCircle size={20} />}
                sx={{ 
                  color: '#131921', 
                  fontWeight: 'black', 
                  borderRadius: '12px',
                  py: 1.5,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: 'secondary.light',
                    boxShadow: 'none'
                  }
                }}
              >
                Approve & Submit PO
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatePurchaseOrder;
