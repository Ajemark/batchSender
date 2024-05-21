import { useState } from "react";
import styled from "styled-components";
import { Address, Dictionary, Slice, beginCell, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useBatchSenderContract } from "../hooks/useBatchContract";

export function TransferTon() {
  // const { sender, connected } = useTonConnect();

  // const [tonConnectUI, setOptions] = useTonConnectUI();

  // const [tonAmount, setTonAmount] = useState(0);
  // const [comment, setComment] = useState("");
  // const [tonRecipient, setTonRecipient] = useState("");
  // const [formError, setformError] = useState(false);

  const { sender, connected } = useTonConnect();
  const { sendBatch } = useBatchSenderContract();

  const [tonConnectUI, setOptions] = useTonConnectUI();

  const [tonAmount, setTonAmount] = useState(0);
  const [comment, setComment] = useState("");
  const [tonRecipient, setTonRecipient]: any = useState();
  const [formError, setformError] = useState(false);

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

  // const processTx = async function name() {
  //   setformError(false);
  //   if (tonAmount == 0 || tonRecipient == "") {
  //     setformError(true);
  //     return;
  //   }
  //   const body = beginCell()
  //     .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
  //     .storeStringTail("Hello, TON!") // write our text comment
  //     .endCell();

  //   let data: any = [];
  //   tonRecipient.split("\n").map((d) => {
  //     data.push({
  //       address: d,
  //       amount: toNano(tonAmount.toString()).toString(),
  //       payload: body.toBoc().toString("base64"),
  //     });
  //   });

  //   // console.log(data);

  //   const transaction = {
  //     validUntil: Date.now() + 5 * 60 * 1000,
  //     messages: data,
  //   };
  //   const res = await tonConnectUI.sendTransaction(transaction);
  //   // console.log(res);
  // };

  // console.log(tonRecipient);

  return (
    <Card>
      <FlexBoxCol>
        <h3>Transfer TON</h3>
        <FlexBoxRow>
          <label>Amount </label>
          <Input
            style={{ marginRight: 8 }}
            type="number"
            placeholder="Enter ton amount"
            value={tonAmount}
            onChange={(e) => setTonAmount(Number(e.target.value))}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <label>Amount </label>
          <Input
            style={{ marginRight: 8 }}
            type="text"
            placeholder="Enter comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <label>To </label>
          <textarea
            rows={10}
            placeholder="Paste ddresses here"
            style={{ marginRight: 8, width: "100%" }}
            value={tonRecipient}
            onChange={(e) => {
              e.preventDefault();
              setTonRecipient(e.target.value);
            }}
          />
        </FlexBoxRow>
        <Button
          disabled={!connected}
          style={{ marginTop: 18 }}
          onClick={() => {
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

            sendBatch({
              address,
              amount,
              value:
                BigInt(tonRecipient && tonRecipient.split("\n").length) *
                  toNano(tonAmount.toString()) +
                toNano("0.05"),
              commentDict,
              length: BigInt(tonRecipient && tonRecipient.split("\n").length),
            });
          }}
        >
          Transfer
        </Button>
      </FlexBoxCol>
      {formError && (
        <p style={{ color: "red", textAlign: "center" }}>
          Please Enter all fields
        </p>
      )}
    </Card>
  );
}
