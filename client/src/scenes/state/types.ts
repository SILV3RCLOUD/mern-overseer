export interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

export interface Month {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  nonOperationExpenses: number;
  operationExpenses: number;
}

export interface Day {
  id: string;
  date: string;
  revenue: number;
  expenses: number;
}

export interface GetKpisResponse {
  id: string;
  _id: string;
  __v: number;
  totalProfit: number;

  totalRevenue: number;
  totalExpenses: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<Month>;
  
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsResponse{
  id: string;
  _id: string;
  __v: number;

  price: number;
  expenses: number;
  transactions: Array<string>;

  createdAt: string;
  updatedAt: string;
}