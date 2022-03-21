import { Box, Container, Typography } from "@mui/material";
import type { NextPage } from "next";
import * as React from "react";
import { OrderForm } from "../components/homePage/OrderForm/OrderForm";
import { QueryForm } from "../components/homePage/QueryForm/QueryForm";

const Home: NextPage = () => (
  <Container>
    <Typography variant="h2" sx={{ mb: 4 }}>
      Yak shop
    </Typography>

    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <QueryForm sx={{ flex: 1, flexBasis: 300 }} />
      <OrderForm sx={{ flex: 1, flexBasis: 300 }} />
    </Box>
  </Container>
);

export default Home;
