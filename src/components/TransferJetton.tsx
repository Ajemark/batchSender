import { storeJettonTransferMessage } from "../contracts/jetton/jetton-wallet";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useMemo, useState } from "react";
import { Address, beginCell, Cell, toNano, TupleBuilder } from "ton-core";
import { useTonClient } from "../hooks/useTonClient";
import { Input } from "./styled/styled";
import { getContractData } from "../utils/utils";
// import { useTonClient } from "../store/tonClient";

// kQDVolXfKQjzObzFlnepkvigZbMih993CSr59zATKmaT2uED;

export function TransferJetton({
  jettonContractAddress,
  caJettonWalletAddress,
}: any) {
  const senderAddress = useTonAddress();
  const [jettonWalletAddress, setJettonWalletAddress] = useState("");
  const [senderJettonWalletAddress, setSenderJettonWalletAddress] =
    useState("");
  const [params, setParams]: any = useState();
  const [destinationAddress, setDestinationAddress] = useState(
    caJettonWalletAddress
  );
  const [responseDestinationAddress, setResponseDestinationAddress] =
    useState("");
  const [amount, setAmount] = useState("");
  const [jettonBal, setJettonBal] = useState("");

  const tonClient = useTonClient();
  const [tonConnectUI] = useTonConnectUI();

  const updateInfo = async () => {
    let address: Address;
    try {
      address = Address.parse(jettonContractAddress);
    } catch (e) {
      return;
    }

    let caJetton: Address;
    try {
      caJetton = Address.parse(senderAddress);
    } catch (e) {
      return;
    }

    const caJettonBbuilder = new TupleBuilder();
    caJettonBbuilder.writeAddress(caJetton);

    const caJettonInfo = await tonClient?.client?.callGetMethod(
      address,
      "get_wallet_address",
      caJettonBbuilder.build()
    );

    setSenderJettonWalletAddress(
      caJettonInfo?.stack.readAddress().toString() ?? ""
    );

    let sender: Address;
    try {
      sender = Address.parse(caJettonWalletAddress);
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

    if (jettonWalletAddress) {
      setJettonWalletAddress(
        jettonWalletAddress.toString({ bounceable: true, urlSafe: true })
      );

      const info2 = await tonClient?.client?.callGetMethod(
        jettonWalletAddress,
        "get_wallet_data",
        builder.build()
      );

      // @ts-ignore
      setJettonBal(info2?.stack.items[1].value.toString());
    }
  };

  useEffect(() => {
    updateInfo();
  }, [jettonContractAddress, jettonContractAddress, tonClient, senderAddress]);

  useEffect(() => {
    try {
      Address.parse(responseDestinationAddress);
      return;
    } catch (e) {}

    let sender: Address;
    try {
      sender = Address.parse(senderAddress);
    } catch (e) {
      return;
    }

    setResponseDestinationAddress(
      sender.toString({ bounceable: false, urlSafe: true })
    );
  }, [senderAddress, responseDestinationAddress]);

  const deployParams = useEffect(() => {
    console.log(
      jettonWalletAddress,
      "  gg   ",
      caJettonWalletAddress,
      "   ",
      amount,
      "nn   ",
      senderAddress
    );
    if (
      !jettonWalletAddress ||
      !caJettonWalletAddress ||
      !amount ||
      !senderAddress
    ) {
      return;
    }

    let message: Cell | null = null;
    try {
      message = beginCell()
        .store(
          storeJettonTransferMessage({
            queryId: 0n,
            amount: BigInt(amount),
            destination: Address.parse(caJettonWalletAddress),
            responseDestination: Address.parse(senderAddress),
            customPayload: null,
            forwardAmount: 0n,
            forwardPayload: null,
          })
        )
        .endCell();
    } catch (e) {}

    setParams(message);
  }, [
    senderAddress,
    jettonContractAddress,
    jettonWalletAddress,
    destinationAddress,
    amount,
  ]);

  const topUpBal = () => {
    console.log(deployParams);
    if (params) {
      tonConnectUI.sendTransaction({
        messages: [
          {
            address: senderJettonWalletAddress,
            amount: toNano("0.05").toString(),
            payload: params.toBoc().toString("base64"),
          },
        ],
        validUntil: Math.floor(Date.now() / 1000) + 300,
      });
    }
  };

  // getContractData("kQDVolXfKQjzObzFlnepkvigZbMih993CSr59zATKmaT2uED");
  return (
    <div className="w-full  ">
      <div className="w-full md:w-[500px] ml-auto justify-between flex">
        <p className=" font-[600] py-2">Top Up Bal</p>
        <p className=" font-[600] text-red-600 py-2">
          {senderAddress ? "" : "Kindly connect Wallet"}
        </p>
        <p className=" font-[600] py-2">
          Bal <span>{(Number(jettonBal) / 10 ** 18).toFixed(3)}</span>
        </p>
      </div>

      <div className="flex w-full items-end flex-col ">
        <div className="w-full flex border-[3px] overflow-hidden border-[#2eaddc] rounded-md  md:w-[500px]  ">
          <input
            className="w-full outline-none ring-0 p-2 flex-1"
            type="number"
            id="amount"
            placeholder="Amount to top up"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="bg-[#2eaddc] px-4 py-2"
            onClick={() => {
              topUpBal();
            }}
          >
            Top Up
          </button>
        </div>
      </div>
    </div>
  );
}
