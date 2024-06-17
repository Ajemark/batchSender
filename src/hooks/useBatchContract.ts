import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";

import { CHAIN } from "@tonconnect/protocol";
// import { BatchSender, Data } from "../wrappers/BatchSender";
import { Address, OpenedContract, toNano } from "ton-core";
import {
  BatchSender,
  SendJetton,
  SendTon,
} from "../contracts/BatchSender/tact_BatchSender";

export function useBatchSenderContract() {
  const { client } = useTonClient();
  const { sender, network } = useTonConnect();

  const batchSenderContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = BatchSender.fromAddress(
      Address.parse(
        network === CHAIN.MAINNET
          ? "EQDH5csTrWj6l7k86FuPaoeXwzGjFPu67wOoKPHrqd4vOX59"
          : "kQBJ771xdp_fe8ZsO1bARi3LRATLY_HbUA399LSUs_5aH6w6"
      )
    );
    // : "EQCnvlf4yVIuQtIrv278kiAhRRalEXJVMHZ20iiVLd42Zad5"
    return client.open(contract) as OpenedContract<BatchSender>;
  }, [client]);

  return {
    caAddress: batchSenderContract?.address.toString(),
    myJettonAddress: (address: string) =>
      batchSenderContract?.getMyJettonWalletAddress(Address.parse(address)),
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
