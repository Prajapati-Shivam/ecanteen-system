import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { MenuItem, Select } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'Order ID', width: 150 },
  { field: 'name', headerName: 'Food Item', width: 200 },
  { field: 'price', headerName: 'Price (₹)', type: 'number', width: 120 },
  { field: 'quantity', headerName: 'Quantity', type: 'number', width: 120 },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    editable: true, // ✅ enable editing
    renderCell: (params) => (
      <span
        style={{
          color: params.value === 'completed' ? 'green' : 'orange',
          fontWeight: 'bold',
        }}
      >
        {params.value}
      </span>
    ),
    renderEditCell: (params) => (
      <Select
        value={params.value}
        onChange={(e) =>
          params.api.setEditCellValue({
            id: params.id,
            field: 'status',
            value: e.target.value,
          })
        }
        fullWidth
        size='small'
      >
        <MenuItem value='active'>Active</MenuItem>
        <MenuItem value='completed'>Completed</MenuItem>
      </Select>
    ),
  },
  {
    field: 'date',
    headerName: 'Order Date',
    type: 'date',
    width: 180,
    valueGetter: (params) => new Date(params.value),
  },
];

const initialRows = [
  {
    id: 'order1',
    name: 'Masala Dosa',
    price: 80,
    quantity: 2,
    status: 'active',
    date: '2025-06-09',
  },
  {
    id: 'order2',
    name: 'Butter Chicken',
    price: 250,
    quantity: 1,
    status: 'completed',
    date: '2025-06-07',
  },
  {
    id: 'order3',
    name: 'Paneer Tikka',
    price: 180,
    quantity: 3,
    status: 'active',
    date: '2025-06-08',
  },
  {
    id: 'order4',
    name: 'Veg Biryani',
    price: 150,
    quantity: 1,
    status: 'completed',
    date: '2025-06-10',
  },
  {
    id: 'order5',
    name: 'Chicken Curry',
    price: 200,
    quantity: 2,
    status: 'active',
    date: '2025-06-11',
  },
];

export default function OrderTable() {
  const [rows, setRows] = React.useState(initialRows);

  const processRowUpdate = (newRow) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === newRow.id ? newRow : row))
    );
    return newRow;
  };

  return (
    <Paper sx={{ height: 400, width: '100%', p: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode='row'
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          border: 0,
          '& .MuiDataGrid-cell': { fontSize: '0.95rem' },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
          },
        }}
      />
    </Paper>
  );
}
