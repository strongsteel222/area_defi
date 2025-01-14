import * as React from "react";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/system";
import { shortenAddress1 } from "../Utils/shortenAddress";

import { CryptoTrans } from "../TransFunc/CryptoTrans";

import sol_c from "./images/sol_c.png";
import sol_t from "./images/sol_t.png";
import eth_c from "./images/eth_c.png";
import eth_t from "./images/eth_t.png";
import base_c from "./images/base_c.png";
import base_t from "./images/base_t.png";

const LendButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 12,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    "Eth-USDT",
    "0x1ABa62224905fb4D39E1BfC3DC7e4FAbE91e3b6f",
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "12 Days ago",
    "$4.0"
  ),
  createData(
    "Sol-USDT",
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    "5 Days ago",
    "$4.3"
  ),
  createData(
    "Base-USDT",
    "0x4E9091aDcDEDf4401f8BBeA040B354A599d2F48f",
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "1 Month ago",
    "$6.0"
  ),
  createData(
    "Eth-USDC",
    "0x2B263267b102D62a00c85f7698E8Bd650b4B9342",
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "2 Days ago",
    "$4.3"
  ),
  createData(
    "Eth-USDT",
    "0xb7b8A8ee44468B47b7755EBA4Dda990975FBfa3B",
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "15 Sec ago",
    "$3.9"
  ),
];
export default function Borrows() {
  const theme = useTheme();

  const { eachBalance, phantomTransaction } = useContext(CryptoTrans);

  return (
    <Container
      id="Borrows"
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
          Borrow/Rent
        </Typography>
        <Typography variant="body1" sx={{ color: "grey.400" }}>
          Explore why our product stands out: adaptability, durability,
          user-friendly design, and innovation. Enjoy reliable customer support
          and precision in every detail.
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell>Token</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="center">Input</TableCell>
              <TableCell align="center">Borrow</TableCell>
              <TableCell align="center">Lend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" align="right">
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={eth_t}
                ></img>
              </TableCell>
              <TableCell>Etherum-USDT</TableCell>
              <TableCell align="right">${eachBalance[2]}</TableCell>
              <TableCell align="center">
                <FormControl sx={{ m: 1, width: "15ch" }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">$</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "",
                    }}
                  />
                </FormControl>
              </TableCell>
              <TableCell align="center">
                <ColorButton variant="contained" style={{ height: "30px" }}>
                  Borrow
                </ColorButton>
              </TableCell>
              <TableCell align="center">
                <LendButton
                  variant="contained"
                  disableRipple
                  style={{ height: "30px" }}
                >
                  Lend
                </LendButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" align="right">
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={eth_c}
                ></img>
              </TableCell>
              <TableCell>Etherum-USDC</TableCell>
              <TableCell align="right">${eachBalance[3]}</TableCell>
              <TableCell align="center">
                <FormControl sx={{ m: 1, width: "15ch" }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">$</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "",
                    }}
                  />
                </FormControl>
              </TableCell>
              <TableCell align="center">
                <ColorButton variant="contained" style={{ height: "30px" }}>
                  Borrow
                </ColorButton>
              </TableCell>
              <TableCell align="center">
                <LendButton
                  variant="contained"
                  disableRipple
                  style={{ height: "30px" }}
                >
                  Lend
                </LendButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" align="right">
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={sol_t}
                ></img>
              </TableCell>
              <TableCell>Sol-USDT</TableCell>
              <TableCell align="right">${eachBalance[0]}</TableCell>
              <TableCell align="center">
                <FormControl sx={{ m: 1, width: "15ch" }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">$</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "",
                    }}
                  />
                </FormControl>
              </TableCell>
              <TableCell align="center">
                <ColorButton variant="contained" style={{ height: "30px" }}>
                  Borrow
                </ColorButton>
              </TableCell>
              <TableCell align="center">
                <LendButton
                  variant="contained"
                  disableRipple
                  style={{ height: "30px" }}
                >
                  Lend
                </LendButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" align="right">
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={sol_c}
                ></img>
              </TableCell>
              <TableCell>Sol-USDC</TableCell>
              <TableCell align="right">${eachBalance[1]}</TableCell>
              <TableCell align="center">
                <FormControl sx={{ m: 1, width: "15ch" }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">$</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "",
                    }}
                  />
                </FormControl>
              </TableCell>
              <TableCell align="center">
                <ColorButton variant="contained" style={{ height: "30px" }}>
                  Borrow
                </ColorButton>
              </TableCell>
              <TableCell align="center">
                <LendButton
                  variant="contained"
                  disableRipple
                  style={{ height: "30px" }}
                >
                  Lend
                </LendButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" align="right">
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={base_t}
                ></img>
              </TableCell>
              <TableCell>Base-USDT</TableCell>
              <TableCell align="right">$0</TableCell>
              <TableCell align="center">
                <FormControl sx={{ m: 1, width: "15ch" }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">$</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "",
                    }}
                  />
                </FormControl>
              </TableCell>
              <TableCell align="center">
                <ColorButton variant="contained" style={{ height: "30px" }}>
                  Borrow
                </ColorButton>
              </TableCell>
              <TableCell align="center">
                <LendButton
                  variant="contained"
                  disableRipple
                  style={{ height: "30px" }}
                >
                  Lend
                </LendButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" align="right">
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={base_c}
                ></img>
              </TableCell>
              <TableCell>Base-USDC</TableCell>
              <TableCell align="right">$0</TableCell>
              <TableCell align="center">
                <FormControl sx={{ m: 1, width: "15ch" }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">$</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "",
                    }}
                  />
                </FormControl>
              </TableCell>
              <TableCell align="center">
                <ColorButton variant="contained" style={{ height: "30px" }}>
                  Borrow
                </ColorButton>
              </TableCell>
              <TableCell align="center">
                <LendButton
                  variant="contained"
                  disableRipple
                  style={{ height: "30px" }}
                >
                  Lend
                </LendButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        component="h2"
        variant="h4"
        gutterBottom
        sx={{ color: "text.primary" }}
      >
        Token Transfer History
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Signature</StyledTableCell>
              <StyledTableCell align="center">From</StyledTableCell>
              <StyledTableCell align="center">To</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="center">Fee</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(phantomTransaction) &&
            phantomTransaction.length > 0 ? (
              phantomTransaction.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {shortenAddress1(item.transaction.signatures[0])}
                  </StyledTableCell>
                  <StyledTableCell>
                    {shortenAddress1(
                      item.transaction.message.accountKeys[0].toString()
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    {shortenAddress1(
                      item.transaction.message.accountKeys[1].toString()
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {new Date(item.blockTime * 1000).toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.meta.fee / 10 ** 6}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.meta.postedBalances}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <p>No transactions available</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
