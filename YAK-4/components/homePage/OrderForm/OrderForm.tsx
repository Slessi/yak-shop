import { Box } from "@mui/material";
import { BoxProps } from "@mui/material/Box";
import * as React from "react";

export interface OrderFormProps extends BoxProps {}

export const OrderForm: React.FC<OrderFormProps> = ({ ...props }) => {
  return <Box {...props}>hi</Box>;
};
