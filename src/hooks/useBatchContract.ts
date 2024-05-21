import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";

import { CHAIN } from "@tonconnect/protocol";
// import { BatchSender, Data } from "../wrappers/BatchSender";
import { Address, OpenedContract } from "ton-core";
import { BatchSender, Data } from "../contracts/BatchSender/tact_BatchSender";

export function useBatchSenderContract() {
  const { client } = useTonClient();
  const { sender, network } = useTonConnect();

  const batchSenderContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = BatchSender.fromAddress(
      Address.parse(
        network === CHAIN.MAINNET
          ? "EQBPEDbGdwaLv1DKntg9r6SjFIVplSaSJoJ-TVLe_2rqBOmH"
          : "EQB-VO7ve09FULgB9zdyhUHkhN5Im8DaXqs8bBnpLPB9S1rW"
      )
    );
    return client.open(contract) as OpenedContract<BatchSender>;
  }, [client]);

  return {
    address: batchSenderContract?.address.toString(),
    sendBatch: (data: any) => {
      const message: Data = {
        $$type: "Data",
        address: data.address,
        comment: data.commentDict,
        amount: data.amount,
        length: data.length,
      };

      batchSenderContract?.send(sender, { value: data.value }, message);
    },
  };
}
