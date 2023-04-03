import DashboardBox from '@/components/DashboardBox'
import React, { useMemo } from 'react'
import { useGetKpisQuery, useGetProductsQuery } from '../state/api';
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  Line,
  YAxis,
  Tooltip,
  Area,
  Legend,
  LineChart,
  BarChart,
  Bar
} from "recharts";
import { useTheme } from '@mui/material';
import BoxHeader from '@/components/BoxHeader';

type Props = {};

const Row2 = (props: Props) => {
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { palette } = useTheme();

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
      <DashboardBox gridArea="e" ></DashboardBox>
      <DashboardBox gridArea="f" ></DashboardBox>
    </>
  )
}

export default Row2