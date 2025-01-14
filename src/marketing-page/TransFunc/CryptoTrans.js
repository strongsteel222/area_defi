import React, { useEffect, useState, createContext } from "react";
import Web3 from "web3";
import {
  USDT_ABI,
  ERC20_ABI,
  SOL_ADDRESS,
  ETH_ADDRESS,
  USDT_ADDRESS,
  USDC_ADDRESS,
  USDT_ADDRESS_SOL,
  USDC_ADDRESS_SOL,
} from "../Utils/constants";

import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  AccountLayout,
} from "@solana/spl-token";
import { Buffer } from "buffer";

// Make Buffer available globally
window.Buffer = Buffer;

export const CryptoTrans = createContext();

// Provider
export const CryptoProvider = ({ children }) => {
  const [ethCurrentAccount, setEthCurrentAccount] = useState("");
  const [web3, setWeb3] = useState(null);
  const [solCurrentAccount, setSolCurrentAccount] = useState(null);
  const [phantonConnect, setPhantonConnect] = useState(null);
  const [phantomTransaction, setphantomTransaction] = useState([]);

  const [eachBalance, setEachBalance] = useState([
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  ]);
  /////////////////////////////////////////////////////////// connect Ether Wallet ///////////////////////////////////////////////////
  const ethConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3Instance.eth.getAccounts();
        setEthCurrentAccount(accounts[0]);
        setWeb3(web3Instance.eth);
        console.log("Connected account:", accounts[0]);
        callEachBalanceEth(web3Instance, accounts[0], USDT_ADDRESS);
      } catch (error) {
        alert("Failed to connect to Ethereum net");
      }
    } else {
      alert("Please install Phantom!");
    }
  };
  ///////////////////////////////////////////////////////////  call balance of Ethereum account //////////////////////////////////////////////////////////
  const callEachBalanceEth = async (connect, address, defalutAddress) => {
    getEachBalanceEth(connect, address, defalutAddress).then((balance) => {
      setEachBalance((prevBalances) => {
        const updatedBalances = [...prevBalances]; // Spread the previous values
        updatedBalances[2] = balance; // Update the second element
        return updatedBalances; // Return the new array
      });
    });

    getEachBalanceEth(connect, address, defalutAddress).then((balance) => {
      setEachBalance((prevBalances) => {
        const updatedBalances = [...prevBalances]; // Spread the previous values
        updatedBalances[3] = balance; // Update the second element
        return updatedBalances; // Return the new array
      });
    });
  };
  /////////////////////////////////////////////////////////////////////////// get balance of solana account ////////////////////////////////
  const getEachBalanceEth = async (connection, address, defalutAddress) => {
    const usdtContract = new connection.eth.Contract(ERC20_ABI, defalutAddress);
    const usdtBalanceWei = await usdtContract.methods.balanceOf(address).call();
    if (usdtBalanceWei == "0") return 0;
    const formattedUsdtBalance = connection.utils.fromWei(
      usdtBalanceWei,
      "mwei"
    ); // USDT has 6 decimals
    return formattedUsdtBalance;
  };
  /////////////////////////////////////////////////////////// transfer cryptocurrency ////////////////////////////////////////////////////////////////////////
  const sendTransaction = async (amount, defaultAddress) => {
    if (!web3) {
      alert("Please connect to MetaMask first!");
      return;
    }

    const contract = new web3.eth.Contract(USDT_ABI, defaultAddress);
    const amountInUnits = web3.utils.toWei(amount, "mwei"); // USDT has 6 decimal places

    const tx = await contract.methods
      .transfer(ETH_ADDRESS, amountInUnits)
      .send({ from: ethCurrentAccount });
    alert("Transfer successful!");
  };

  ////////////////////////////////////////////////////////// connect Solana wallet ///////////////////////////////////////////////////////////////
  const SolConnectWallet = async () => {
    if (!window.solana || !window.solana.isPhantom) {
      alert("Please install Phantom Wallet!");
      return;
    }
    try {
      const resp = await window.solana.connect();

      const connection = new Connection(
        "https://tame-chaotic-snowflake.solana-mainnet.quiknode.pro/595d9913268adc19027c819df6d678fc95597996/",
        "confirmed"
      );
      //const connection = new Connection("https://api.mainnet-beta.solana.com","confirmed");
      setPhantonConnect(connection);
      setSolCurrentAccount(resp.publicKey);
      callEachBalance(connection, resp.publicKey);
      getSolTransaction(connection, resp.publicKey);
    } catch (error) {
      alert(error);
    }
  };

  /////////////////////////////////////////////////////////////////////////// call balance of solana account ///////////////////////////////
  const callEachBalance = async (connect, address) => {
    getEachBalance(connect, address, USDT_ADDRESS_SOL).then((balance) => {
      setEachBalance((prevBalances) => {
        const updatedBalances = [...prevBalances]; // Spread the previous values
        updatedBalances[0] = balance; // Update the second element
        return updatedBalances; // Return the new array
      });
    });

    getEachBalance(connect, address, USDC_ADDRESS_SOL).then((balance) => {
      setEachBalance((prevBalances) => {
        const updatedBalances = [...prevBalances]; // Spread the previous values
        updatedBalances[1] = balance; // Update the second element
        return updatedBalances; // Return the new array
      });
    });
  };

  /////////////////////////////////////////////////////////////////////////// get balance of solana account ////////////////////////////////
  const getEachBalance = async (connection, walletPubKey, address) => {
    try {
      const associatedTokenAccountAddress = await getAssociatedTokenAddress(
        new PublicKey(address),
        walletPubKey
      );

      const accountInfo = await connection.getAccountInfo(
        associatedTokenAccountAddress
      );

      if (accountInfo === null) return 0;
      // Decode the account information
      const accountData = AccountLayout.decode(accountInfo.data);

      // The balance stored in the account data
      const amount = Number(accountData.amount) / 10 ** 6; // This is a BigInt representing the balance
      if (amount == "") return 0;
      else return amount;
    } catch (err) {
      console.error(`Failed to fetch USDT balance: ${err.message}`);
    }
  };
  /////////////////////////////////////////////////////////////////////////////// transfer solana token //////////////////////////////////////////////////
  const sendSolTransaction = async (coinType, amount, defaultAddress) => {
    // Calculate amount with the appropriate decimal
    const mintAddress = new PublicKey(defaultAddress);
    const senderAddress = solCurrentAccount;
    const receiveAddress = new PublicKey(SOL_ADDRESS);
    const amountInLamports = Number(amount) * 10 ** 6;

    const senderTokenAccount = await getAssociatedTokenAddress(
      mintAddress,
      senderAddress
    );
    // Get or create recipient's token account
    const recipientTokenAccount = await getAssociatedTokenAddress(
      mintAddress,
      receiveAddress
    );
    const accountInfo = await phantonConnect.getAccountInfo(senderTokenAccount);
    if (accountInfo === null) {
      alert("Source token account does not exist");
      return 0;
    }
    const accountInfo1 = await phantonConnect.getAccountInfo(
      recipientTokenAccount
    );
    if (accountInfo1 === null) {
      alert("receive token account does not exist");
      return 0;
    }
    debugger;
    // Fetch the recent blockhash
    const { blockhash } = await phantonConnect.getLatestBlockhash();

    // Create transaction instruction for the transfer
    const transaction = new Transaction().add(
      createTransferInstruction(
        senderTokenAccount,
        recipientTokenAccount,
        senderAddress, // Sender's public key
        amountInLamports // Amount to transfer
      )
    );
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = senderAddress; // Set the fee payer

    try {
      const signature = await window.solana.signAndSendTransaction(transaction);
      alert("Transfer successful! Signature");
      await phantonConnect.confirmTransaction(signature, "confirmed");
    } catch (error) {
      alert("Transfer failed : " + error);
    }
  };
  ////////////////////////////////////////////////////////////////getSolTransaction//////////////////////////////////////////
  const getSolTransaction = async (connection, address) => {
    const signatures = await connection.getSignaturesForAddress(
      address,
      { limit: 10 } // Limit can be adjusted
    );
    // Fetch detailed transaction info for each signature
    const transactions = await Promise.all(
      signatures.map(async ({ signature }) => {
        const txDetails = await connection.getTransaction(signature);
        return txDetails;
      })
    );
    const validTransactions = transactions.filter((tx) => tx !== null);
    setphantomTransaction(validTransactions);
  };

  useEffect(() => {
    ethConnectWallet();
    SolConnectWallet();
  }, []);

  return (
    <CryptoTrans.Provider
      value={{
        ethConnectWallet,
        SolConnectWallet,
        eachBalance,
        ethCurrentAccount,
        solCurrentAccount,
        sendTransaction,
        sendSolTransaction,
        phantomTransaction,
      }}
    >
      {children}
    </CryptoTrans.Provider>
  );
};
