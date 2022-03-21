import { Card, CardContent, Stack, Typography } from "@mui/material";
import * as React from "react";
import { HerdResponse } from "../api";

export interface HerdProps {
  herd: HerdResponse;
}

export const Herd: React.FC<HerdProps> = ({ herd: { herd } }) => {
  return (
    <Stack direction="row" spacing={1}>
      {herd.map((h, i) => (
        <Card key={i}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {h.name}
            </Typography>

            <Typography variant="body2">Age: {h.age}</Typography>
            <Typography variant="body2">
              Age last shaved: {h["age-last-shaved"]}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
