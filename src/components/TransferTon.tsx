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
import { FlexBoxCol, Button } from "./styled/styled";
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
  const [newOwner, setNewOwner]: any = useState("");
  const [newFee, setNewFee]: any = useState(0);

  const tonClient = useTonClient();

  const { connected } = useTonConnect();

  const {
    sendBatchTon,
    sendBatchJetton,
    sendChangeAdmin,
    sendChangeFee,
    myJettonAddress,
    admin,
    fee,
  } = useBatchSenderContract();

  const [tonAmount, setTonAmount] = useState(0);
  const [addresses, setAddresses]: any = useState();
  const [comment, setComment] = useState("");
  const [adminAddress, setAdminAddress]: any = useState();
  const [feeAmount, setFeeAmount]: any = useState();
  const [tonRecipient, setTonRecipient]: any = useState();
  const [formError, setformError]: any = useState();

  console.log(feeAmount);
  const updateInfo = async () => {
    setAdminAddress((await admin())?.toRawString());
    setFeeAmount(await fee());

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
    setformError();
    if (tonAmount == 0 || tonRecipient == "") {
      setformError("Enter All Fields");
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
    setformError();
    if (tonAmount < 1 || tonRecipient == "") {
      setformError("Enter All Fields");
      return;
    }
    if (jettonContractAddress == "") {
      setformError("Enter All Fields");
      return;
    }

    const body = Dictionary.empty(
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.Cell()
    );

    const addresesArr: any = [];

    const storeBody = async () => {
      tonRecipient &&
        tonRecipient.split("\n").map((d: any, i: number) => {
          if (
            !amount ||
            !Address.parse(d.trim()) ||
            !commentBody ||
            !jettonWalletAddress ||
            !senderAddress
          ) {
            return "error";
          }

          let message: Cell | null = null;
          try {
            message = beginCell()
              .store(
                storeJettonTransferMessage({
                  queryId: BigInt(i + 1),
                  amount: toNano(tonAmount.toString()),
                  destination: Address.parse(d.trim()),
                  responseDestination: Address.parse(senderAddress),
                  customPayload: null,
                  forwardAmount: toNano("0.005"),
                  forwardPayload: commentBody,
                })
              )
              .endCell();

            if (message) {
              addresesArr.push(d.trim());
              body.set(BigInt(i + 1), message);
            } else {
              return "error";
            }
          } catch (e) {
            console.log(e);
          }
        });
      return addresesArr;
    };

    storeBody().then((res) => {
      if (res == "error") return;
      sendBatchJetton({
        value: BigInt(addresesArr.length) * (toNano(0.085) + feeAmount),
        amount: BigInt(addresesArr.length) * toNano(0.01),
        body,
        length: BigInt(addresesArr.length),
        jettonWalletAddress,
      });
    });
  };

  return (
    <div>
      <FlexBoxCol className="space-y-3  text-black">
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
                className="w-full tex md:w-[500px] rounded-md border-[3px] outline-none ring-0 p-2"
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
            <div className="flex mt-3 flex-col md:flex-row">
              <label className="flex-1">Your Spray Jetton Wallet </label>
              <input
                className="py-2  outline-none ring-0 w-full md:w-[500px] border-[3px]   p-2 rounded-md  font-[600]"
                value={caJettonWalletAddress?.toString()}
              />
            </div>
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
            className="border-[3px] md:w-[500px]  outline-none ring-0 p-2  w-full rounded-md"
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

      {(senderAddress && Address.parse(senderAddress).toRawString()) ==
        adminAddress && (
        <div className="py-10 pb-2">
          <p className="pt-10 pb-5 text-center text-2xl">Admin Section</p>
          <div className="flex w-full   flex-col ">
            <div className="flex">
              <p className="flex-1">New Owner</p>
              <div className="w-full my-2 flex border-[3px] overflow-hidden border-[#2eaddc] rounded-md  md:w-[500px]  ">
                <input
                  className="w-full outline-none ring-0 p-2 flex-1"
                  type="text"
                  placeholder="Enter New Owner"
                  value={newOwner}
                  onChange={(e) => setNewOwner(e.target.value)}
                />
                <button
                  className="bg-[#2eaddc] px-4 py-2"
                  onClick={() => {
                    setformError();
                    if (newOwner == "") {
                      setformError("Enter Owner Address");
                      return;
                    }
                    sendChangeAdmin(newOwner);
                  }}
                >
                  Send
                </button>
              </div>
            </div>

            <div className="flex">
              <p className="flex-1">New Fee</p>

              <div className="w-full flex border-[3px] my-2 overflow-hidden border-[#2eaddc] rounded-md  md:w-[500px]  ">
                <input
                  className="w-full outline-none ring-0 p-2 flex-1"
                  type="number"
                  id="amount"
                  placeholder="Enter New Fee"
                  value={newFee}
                  onChange={(e) => setNewFee(e.target.value)}
                />
                <button
                  className="bg-[#2eaddc] px-4 py-2"
                  onClick={() => {
                    setformError();
                    if (newOwner == "") {
                      setformError("Enter New Fee");
                      return;
                    }
                    sendChangeFee(newFee);
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {formError && (
        <p style={{ color: "red", textAlign: "center" }}>{formError}</p>
      )}
    </div>
  );
}

// UQBwXDv8VL47SkGVkmFboYI6PKtSu-_HwwXVoPRMZuqdP6q5
// UQBsped2sZweDARQASEg8yMRJPJFOhFwXvjstqmWWroGrkt5
// UQBr5s7-I7kpEuBQPXrBCgchfNTpQJrD-hElR3l0Bok-yIZl

// EQAmQGimKRrSHDLllvdUdeDsX1CszGy_SPgNNN8wE2ihIwnP CA
