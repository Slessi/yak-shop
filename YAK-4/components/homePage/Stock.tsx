import { Card, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { StockResponse } from "../api";

export interface StockProps {
  stock: StockResponse;
}

export const Stock: React.FC<StockProps> = ({ stock }) => {
  return (
    <Card sx={{ width: 180 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Stock
        </Typography>

        <Typography variant="body2">Milk: {stock.milk}</Typography>
        <Typography variant="body2">Skins: {stock.skins}</Typography>
      </CardContent>
    </Card>
  );
};
