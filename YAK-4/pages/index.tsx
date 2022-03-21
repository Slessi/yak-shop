import {
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import * as React from "react";
import { useQuery } from "react-query";
import { getHerd, getStock } from "../components/api";
import { Herd } from "../components/homePage/Herd";
import { Stock } from "../components/homePage/Stock";

const Home: NextPage = () => {
  const [days, setDays] = React.useState(14);
  const { data: herd, error: herdError } = useQuery(`herd-${days}`, () =>
    getHerd(days)
  );
  const { data: stock, error: stockError } = useQuery(`stock-${days}`, () =>
    getStock(days)
  );

  return (
    <Container>
      <Typography variant="h1">Yak shop</Typography>

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
    </Container>
  );
};

export default Home;
