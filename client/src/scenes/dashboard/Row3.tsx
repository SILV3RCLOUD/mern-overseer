import DashboardBox from '@/components/DashboardBox'
import React from 'react'
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '../state/api'
import { useTheme } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import BoxHeader from '@/components/BoxHeader'
import { GridCellParams } from '@mui/x-data-grid/models'

const Row3 = ( ) => {
  const { palette } = useTheme();
  const { data: kpiData } = useGetKpisQuery();
  const { data: transactionData } = useGetTransactionsQuery();
  const { data: productData } = useGetProductsQuery();
  
  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `PHP${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `PHP${params.value}`,
    }
  ]

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.65,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `PHP${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) => (params.value as Array<String>).length,
    }
  ]


  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader title="List of Products" sideText={`${productData?.length} products`} />
        <Box mt="0.5rem" p="0 0.5rem" height="75%" sx={{
          "& .MuiDataGrid-root": {
            color: palette.grey[300],
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${palette.grey[800]} !important`,
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: `1px solid ${palette.grey[800]} !important`,
          },
          "& .MuiDataGrid-columnSeperators": {
            visibility: "hidden"
          }
        }}>
          <DataGrid 
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          /> 
        </Box>
        
      </DashboardBox>
      <DashboardBox gridArea="h">
      <BoxHeader title="List of Recent Orders" sideText={`${transactionData?.length} latest transactions`} />
        <Box mt="1rem" p="0 0.5rem" height="80%" sx={{
          "& .MuiDataGrid-root": {
            color: palette.grey[300],
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${palette.grey[800]} !important`,
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: `1px solid ${palette.grey[800]} !important`,
          },
          "& .MuiDataGrid-columnSeperators": {
            visibility: "hidden"
          }
        }}>
          <DataGrid 
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
          </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        
      </DashboardBox>
      <DashboardBox gridArea="j"></DashboardBox>
    </>
  )
}

export default Row3