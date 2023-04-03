import DashboardBox from '@/components/DashboardBox'
import React, { useMemo } from 'react'
import { useGetKpisQuery, useGetProductsQuery } from '../state/api';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Line,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts";
import { Box, useTheme } from '@mui/material';
import BoxHeader from '@/components/BoxHeader';
import FlexBetween from '@/components/FlexBetween';
import Typography from '@mui/material/Typography';

type Props = {};

const pieData = [
  {name: "Group A", value: 600 },
  {name: "Group B", value: 400 },
]

const Row2 = (props: Props) => {
  const { palette } = useTheme();
  const pieColor = [palette.primary[800], palette.primary[300]];

  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  
  const expenses = useMemo(() => {
    return(
      operationalData &&
      operationalData[0].monthlyData.map(({month, operationalExpenses, nonOperationalExpenses})=>{
        return {
          name: month.substring(0,3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses": nonOperationalExpenses,
        }
      })
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    return(
      productData &&
      productData.map(({ _id, price, expense})=>{
        return {
          id: _id,
          price: price,
          expense: expense,
        }
      })
    );
  }, [productData]);
  


  return (
    <>
 
    </>
  )
}

export default Row2