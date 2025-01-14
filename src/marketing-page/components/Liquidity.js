import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/system";

import sol_c from "./images/sol_c.png";
import sol_t from "./images/sol_t.png";
import eth_c from "./images/eth_c.png";
import eth_t from "./images/eth_t.png";
import base_c from "./images/base_c.png";
import base_t from "./images/base_t.png";

const userLiquidity = [
  {
    image1: eth_t,
    name: "Etherum-USDT",
    tvl: "TVL  :  $2000",
    apr: "APR  :  3.4%",
  },
  {
    image1: eth_c,
    name: "Etherum-USDC",
    tvl: "TVL  :  $62358951.52",
    apr: "APR  :  7.8%",
  },
  {
    image1: sol_t,
    name: "Sol-USDT",
    tvl: "TVL  :  $695478.56",
    apr: "APR  :  5.4%",
  },
  {
    image1: sol_c,
    name: "Sol-USDC",
    tvl: "TVL:$504862.25",
    apr: "APR  :  13.4%",
  },
  {
    image1: base_t,
    name: "Base-USDT",
    tvl: "TVL  :  $948.52",
    apr: "APR  :  2.14%",
  },
  {
    image1: base_c,
    name: "Base-USDC",
    tvl: "TVL  :  $635.25",
    apr: "APR  :  3.78%",
  },
];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Liquidity() {
  const theme = useTheme();

  return (
    <Container
      id="Liquidity"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Liquidity
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          See what our customers love about our products. Discover how we excel
          in efficiency, durability, and satisfaction. Join us for quality,
          innovation, and reliable support.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {userLiquidity.map((Liquidity, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index} sx={{ display: "flex" }}>
            <Card
              variant="outlined"
              sx={{
                display: "flex",
                textAlign: "center",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  alignItems: "center",
                }}
              >
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={Liquidity.image1}
                ></img>
              </Box>
              <CardHeader title={Liquidity.name} />
              <Grid container spacing={2}>
                <Grid size={6}>
                  <Item>{Liquidity.tvl}</Item>
                </Grid>
                <Grid size={6}>
                  <Item>{Liquidity.apr}</Item>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
