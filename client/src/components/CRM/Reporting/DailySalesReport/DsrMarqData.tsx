import {number} from 'yup';

export type DsrMarqueeData = {
  TotalSales: number;
  TopSellingEvent: string;
  TotalCustomers: number;
  DiscountsApplied: number;
  LastSale: string;
};

const DSRmarqueeData: DsrMarqueeData = {
  TotalSales: 350,
  TopSellingEvent: 'Portland Show',
  TotalCustomers: 350,
  DiscountsApplied: 100,
  LastSale: 'Portland Show - $20 + Discount',
};

export {DSRmarqueeData};
