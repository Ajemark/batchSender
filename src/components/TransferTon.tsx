import { useEffect, useMemo, useState } from "react";
import {
  Address,
  Cell,
  Dictionary,
  TupleBuilder,
  beginCell,
  toNano,
} from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";
import { useTonAddress } from "@tonconnect/ui-react";
import { useBatchSenderContract } from "../hooks/useBatchContract";
import { useTonClient } from "../hooks/useTonClient";
import { storeJettonTransferMessage } from "../contracts/jetton/jetton-wallet";
import { TransferJetton } from "./TransferJetton";

export function TransferTon() {
  const senderAddress = useTonAddress();
  const [jettonContractAddress, setJettonContractAddress] = useState("");
  const [jettonWalletAddress, setJettonWalletAddress] = useState("");
  const [caJettonWalletAddress, setCAJettonWalletAddress]: any = useState();

  const tonClient = useTonClient();

  const { connected } = useTonConnect();

  const { sendBatchTon, sendBatchJetton, caAddress, myJettonAddress } =
    useBatchSenderContract();

  const [tonAmount, setTonAmount] = useState(0);
  const [comment, setComment] = useState("");
  const [tonRecipient, setTonRecipient]: any = useState();
  const [formError, setformError] = useState(false);

  const updateInfo = async () => {
    if (!(await myJettonAddress(senderAddress))) return;

    let address: Address;
    try {
      address = Address.parse(jettonContractAddress);
    } catch (e) {
      return;
    }

    setCAJettonWalletAddress(
      (await myJettonAddress(senderAddress)!).toString()
    );

    let sender: Address;
    try {
      sender = await myJettonAddress(senderAddress)!;
    } catch (e) {
      return;
    }

    const builder = new TupleBuilder();
    builder.writeAddress(sender);

    const info = await tonClient?.client?.callGetMethod(
      address,
      "get_wallet_address",
      builder.build()
    );
    const jettonWalletAddress = info?.stack.readAddress();

    if (jettonWalletAddress)
      setJettonWalletAddress(
        jettonWalletAddress.toString({ bounceable: true, urlSafe: true })
      );
    // console.log("jetton wallet address", jettonWalletAddress);
  };

  useEffect(() => {
    updateInfo();
  }, [
    jettonContractAddress,
    tonClient,
    myJettonAddress(senderAddress),
    senderAddress,
  ]);

  const commentBody = beginCell()
    .storeUint(0, 32)
    .storeStringTail(comment)
    .endCell();

  const address = Dictionary.empty(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Address()
  );
  const commentDict = Dictionary.empty(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell()
  );
  const amount = Dictionary.empty(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.BigInt(257)
  );

  const [type, setType] = useState("Ton");

  const sendTon = async function name() {
    setformError(false);
    if (tonAmount == 0 || tonRecipient == "") {
      setformError(true);
      return;
    }
    tonRecipient &&
      tonRecipient.split("\n").map((d: any, i: number) => {
        address.set(BigInt(i + 1), Address.parse(d));
        commentDict.set(BigInt(i + 1), commentBody);
        amount.set(BigInt(i + 1), toNano(tonAmount.toString()));
      });

    sendBatchTon({
      address,
      amount,
      value:
        BigInt(tonRecipient && tonRecipient.split("\n").length) *
        toNano((tonAmount + 0.055).toString()),
      commentDict,
      length: BigInt(tonRecipient && tonRecipient.split("\n").length),
    });
  };

  const sendJetton = async function name() {
    setformError(false);
    if (tonAmount < 1 || tonRecipient == "") {
      setformError(true);
      return;
    }
    if (jettonContractAddress == "") {
      setformError(true);
      return;
    }

    const body = Dictionary.empty(
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.Cell()
    );

    tonRecipient &&
      tonRecipient.split("\n").map((d: any, i: number) => {
        let message: Cell | null = null;
        try {
          message = beginCell()
            .store(
              storeJettonTransferMessage({
                queryId: 0n,
                amount: toNano(tonAmount.toString()),
                destination: Address.parse(d),
                responseDestination: Address.parse(senderAddress),
                customPayload: null,
                forwardAmount: 0n,
                forwardPayload: null,
              })
            )
            .endCell();
          if (message) body.set(BigInt(i + 1), message);
        } catch (e) {
          console.log(e);
        }
      });

    sendBatchJetton({
      value:
        BigInt(tonRecipient && tonRecipient.split("\n").length) * toNano(0.11),
      amount:
        BigInt(tonRecipient && tonRecipient.split("\n").length) * toNano(0.01),
      body,
      length: BigInt(tonRecipient && tonRecipient.split("\n").length),
      jettonWalletAddress,
    });
  };

  return (
    <div>
      <FlexBoxCol className="space-y-3  ">
        <h3 className="text-2xl font-[600] my-4 text-center">
          Transfer {type}
        </h3>

        <div className="flex md:flex-row flex-col  ">
          <p className="flex-1">What To Send?</p>
          <select
            className="border-[3px] p-2 md:w-[500px] w-full rounded-md"
            onChange={(e) => setType(e.target.value)}
            name="type"
          >
            <option value="Ton">Transfer Ton</option>
            <option value="Jetton">Transfer Jetton</option>
          </select>
        </div>
        {type == "Jetton" && (
          <div>
            <div className="flex flex-col md:flex-row">
              <label className="flex-1">Jetton CA </label>
              <input
                className="w-full md:w-[500px] rounded-md border-[3px] outline-none ring-0 p-2"
                type="text"
                placeholder="Enter Jetton Contract Address"
                value={jettonContractAddress}
                onChange={(e) => setJettonContractAddress(e.target.value)}
              />
            </div>

            <TransferJetton
              caJettonWalletAddress={caJettonWalletAddress}
              jettonContractAddress={jettonContractAddress}
              jettonWalletAddress={jettonWalletAddress}
            />
          </div>
        )}
        <div className="flex flex-col md:flex-row">
          <label className="flex-1">Amount to send</label>
          <input
            className="w-full md:w-[500px] rounded-md border-[3px] outline-none ring-0 p-2"
            type="number"
            placeholder="Enter ton amount"
            value={tonAmount}
            onChange={(e) => setTonAmount(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <label className="flex-1 ">Comment </label>
          <input
            className="w-full md:w-[500px] rounded-md border-[3px] outline-none ring-0 p-2"
            type="text"
            placeholder="Enter comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <label className="flex-1">
            Recipient Addresses (seperated by ENTER key)
          </label>
          <textarea
            className="border-[3px] md:w-[500px] p-2   w-full rounded-md"
            rows={10}
            placeholder="Paste ddresses here"
            value={tonRecipient}
            onChange={(e) => {
              e.preventDefault();
              setTonRecipient(e.target.value);
            }}
          />
        </div>
        <Button
          disabled={!connected}
          style={{ marginTop: 18 }}
          onClick={() => {
            if (type == "Ton") sendTon();
            if (type == "Jetton") sendJetton();
          }}
        >
          SPRAY
        </Button>
      </FlexBoxCol>
      {formError && (
        <p style={{ color: "red", textAlign: "center" }}>
          Please Enter all fields
        </p>
      )}
    </div>
  );
}
