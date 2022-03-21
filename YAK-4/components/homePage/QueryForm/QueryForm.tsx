import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import { BoxProps } from "@mui/material/Box";
import * as React from "react";
import { useQuery } from "react-query";
import { getHerd, getStock } from "../../api";
import { Herd } from "./Herd";
import { Stock } from "./Stock";

export interface QueryFormProps extends BoxProps {}

export const QueryForm: React.FC<QueryFormProps> = ({ ...props }) => {
  const [days, setDays] = React.useState(14);
  const { data: herd, error: herdError } = useQuery(`herd-${days}`, () =>
    getHerd(days)
  );
  const { data: stock, error: stockError } = useQuery(`stock-${days}`, () =>
    getStock(days)
  );

  return (
    <Box {...props}>
      <TextField
        label="Days to calculate"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        value={days}
        onChange={(e) => setDays(Number(e.currentTarget.value))}
        sx={{ mb: 2 }}
      />

      {herdError && (
        <Typography color="error">
          Herd: {(herdError as Error)?.message}
        </Typography>
      )}

      {stockError && (
        <Typography color="error">
          Stock {(stockError as Error)?.message}
        </Typography>
      )}

      <Stack spacing={2} sx={{ mb: 2 }}>
        <div>
          <Typography variant="h6" gutterBottom>
            Results
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {stock && <Stock stock={stock} />}
        </div>

        <div>
          <Typography variant="h6" gutterBottom>
            Herd
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {herd && <Herd herd={herd} />}
        </div>
      </Stack>
    </Box>
  );
};
