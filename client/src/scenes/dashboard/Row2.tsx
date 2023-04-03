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
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational and Non Operational Expenses"
          subtitle="THIS REPRESENTS MONTHLY OPERATIONAL AND NON-OPERATIONAL EXPENSES"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={expenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          > 
            {/* CHART LINES */}
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            
            {/* CHART LABELS */}
            <XAxis dataKey="name" tickLine={false} style={{fontSize: "10px"}} />
            <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={ false } style={{fontSize: "10px"}}/>
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={ false } style={{fontSize: "10px"}}/>
            
            <Tooltip />
            <Legend height={20} wrapperStyle={{margin: '0 0 10px 0'}} />
            <Line yAxisId="left" type="monotone" dataKey="Operational Expenses" stroke={palette.tertiary[500]} />
            <Line yAxisId="right" type="monotone" dataKey="Non Operational Expenses" stroke={palette.primary.main} />
            
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e" >
        <BoxHeader
          title="Campaigns and Targets"
          sideText="+4%"
        />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
        <BoxHeader
          title="Campaigns and Targets"
          sideText="+4%"
        />
          <PieChart 
            width={110} 
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={pieColor[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography m="0.3rem 0" variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box ml="-0.7rem" flexBasis="40%">
            <Typography variant="h5">Losses in revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            
            <Typography mt="0.5rem" variant="h5">Profit Margins</Typography>
            <Typography variant="h6">Margins are up by 30% from last month</Typography>
            
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f" >
        <BoxHeader
          title="Product Prices vs Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 40,
              left: -20,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis 
              type="number" 
              dataKey="price" 
              name="price"
              axisLine={false}
              tickLine={false}
              style={{fontSize: "10px"}}
              tickFormatter={(v) => `PHP ${v}`}
            />
            <YAxis 
              type="number"
              dataKey="expense" 
              name="expense"
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `PHP ${v}`}/>
            <Scatter name="Product Expense" data={productExpenseData} fill={palette.tertiary[500]} />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row2