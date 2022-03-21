import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BoxProps } from "@mui/material/Box";
import * as React from "react";
import { useMutation } from "react-query";
import { OrderResponse, placeOrder } from "../../api";

export interface OrderFormProps extends BoxProps {}

export const OrderForm: React.FC<OrderFormProps> = ({ ...props }) => {
  const [customer, setCustomer] = React.useState("");
  const [days, setDays] = React.useState(0);
  const [milk, setMilk] = React.useState(0);
  const [skins, setSkins] = React.useState(0);

  const [orders, setOrders] = React.useState<OrderResponse[]>([]);

  const { mutate, error } = useMutation(
    () => placeOrder(days, { customer, order: { milk, skins } }),
    {
      onSuccess(data) {
        setOrders((o) => [...o, data]);
      },
    }
  );

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Box {...props}>
      <Stack
        component="form"
        spacing={2}
        sx={{ maxWidth: 400, mx: "auto", mb: 2 }}
        onSubmit={onSubmit}
      >
        <Typography variant="h5">Place order</Typography>

        <TextField
          label="Customer"
          onChange={(e) => setCustomer(e.currentTarget.value)}
          required
        />

        <TextField
          label="Days"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(e) => setDays(Number(e.currentTarget.value))}
          required
        />

        <TextField
          label="Milk"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(e) => setMilk(Number(e.currentTarget.value))}
          required
        />

        <TextField
          label="Skins"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(e) => setSkins(Number(e.currentTarget.value))}
          required
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>

      {error && (
        <Typography color="error">
          Order error: {(error as Error)?.message}
        </Typography>
      )}

      <Typography variant="h6" gutterBottom>
        Orders
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {orders.length ? (
        <Stack direction="row" spacing={1}>
          {orders.map((o, i) => (
            <Card key={i}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order
                </Typography>

                {o.milk && (
                  <Typography variant="body2">Milk: {o.milk}</Typography>
                )}
                {o.skins && (
                  <Typography variant="body2">Skins: {o.skins}</Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        "None"
      )}
    </Box>
  );
};
