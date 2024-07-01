import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";

import { CHAIN } from "@tonconnect/protocol";
// import { BatchSender, Data } from "../wrappers/BatchSender";
import { Address, OpenedContract, toNano } from "ton-core";
import {
  BatchSender,
  ChangeContractOwner,
  SendJetton,
  SendTon,
  SetFee,
} from "../contracts/BatchSender/tact_BatchSender";

export function useBatchSenderContract() {
  const { client } = useTonClient();
  const { sender, network } = useTonConnect();

  const batchSenderContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = BatchSender.fromAddress(
      Address.parse(
        network === CHAIN.MAINNET
          ? "EQA3EirY_KADnGgxBJJ4HiLIkBdpo9KenrS7fTJ9NBP_4NwU"
          : "kQBJ771xdp_fe8ZsO1bARi3LRATLY_HbUA399LSUs_5aH6w6"
      )
    );
    // mainnet 2? "EQAbmhcu7ywk5Qg96MxINm3HBT2JzxU3kXBGD9sExPtkgspy"
    // mainnet ? "EQDH5csTrWj6l7k86FuPaoeXwzGjFPu67wOoKPHrqd4vOX59"
    // : "EQCnvlf4yVIuQtIrv278kiAhRRalEXJVMHZ20iiVLd42Zad5"
    return client.open(contract) as OpenedContract<BatchSender>;
  }, [client]);

  return {
    caAddress: batchSenderContract?.address.toString(),
    myJettonAddress: (address: string) => {
      if (!address) return null;
      return batchSenderContract?.getMyJettonWalletAddress(
        Address.parse(address)
      );
    },
    admin: async () => await batchSenderContract?.getAdmin(),
    fee: async () => await batchSenderContract?.getFee(),
    sendBatchTon: (data: any) => {
      const message: SendTon = {
        $$type: "SendTon",
        address: data.address,
        comment: data.commentDict,
        amount: data.amount,
        length: data.length,
      };

      batchSenderContract?.send(sender, { value: data.value }, message);
    },
    sendChangeAdmin: (data: any) => {
      const message: ChangeContractOwner = {
        $$type: "ChangeContractOwner",
        newOwner: Address.parse(data),
      };
      batchSenderContract?.send(sender, { value: toNano(0.05) }, message);
    },
    sendChangeFee: (data: any) => {
      const message: SetFee = {
        $$type: "SetFee",
        fee: BigInt(data),
      };
      batchSenderContract?.send(sender, { value: toNano(0.05) }, message);
    },
    sendBatchJetton: (data: any) => {
      console.log(data.value);
      const message: SendJetton = {
        $$type: "SendJetton",
        contractAddress: Address.parse(data.jettonWalletAddress),
        body: data.body,
        amount: data.amount,
        length: data.length,
      };

      batchSenderContract?.send(sender, { value: data.value }, message);
    },
  };
}
