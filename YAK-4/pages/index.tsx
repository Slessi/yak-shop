import { Container, Paper, TextField, Typography } from "@mui/material";
import type { NextPage } from "next";
import * as React from "react";
import { useQuery } from "react-query";
import { getHerd, getStock } from "../components/api";

const Home: NextPage = () => {
  const [days, setDays] = React.useState(14);
  const { data: herd } = useQuery(`herd-${days}`, () => getHerd(days));
  const { data: stock } = useQuery(`stock-${days}`, () => getStock(days));

  return (
    <Container>
      <Typography variant="h1">Yak shop</Typography>

      <TextField
        label="Days to calculate"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        onChange={(e) => setDays(Number(e.currentTarget.value))}
      />

      <Typography variant="h6">Herd</Typography>
      <Paper component="pre">
        {herd && JSON.stringify(herd.herd, null, 2)}
      </Paper>

      <Typography variant="h6">Stock</Typography>
      <Paper component="pre">{stock && JSON.stringify(stock, null, 2)}</Paper>
    </Container>
  );
};

export default Home;
