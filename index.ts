import { Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmRawTransaction, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js"
import dotenv from "dotenv"
dotenv.config()
import { getKeypairFromEnvironment } from "@solana-developers/helpers"

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY")

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed")

console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`
)

const transaction = new Transaction()

const LAMPORTS_TO_SEND = LAMPORTS_PER_SOL * 1

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey: toPubkey,
  lamports: LAMPORTS_TO_SEND,
})

transaction.add(sendSolInstruction)

const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeypair,
]);

console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
);
console.log(`Transaction signature is ${signature}!`);
