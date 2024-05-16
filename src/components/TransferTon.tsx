import { useState } from "react";
import styled from "styled-components";
import { Address, beginCell, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";
import { useTonConnectUI } from "@tonconnect/ui-react";

export function TransferTon() {
  const { sender, connected } = useTonConnect();

  const [tonConnectUI, setOptions] = useTonConnectUI();

  const [tonAmount, setTonAmount] = useState("");
  const [comment, setComment] = useState("");
  const [tonRecipient, setTonRecipient] = useState("");
  const [formError, setformError] = useState(false);

  const processTx = async function name() {
    setformError(false);
    if (tonAmount == "" || tonRecipient == "") {
      setformError(true);
      return;
    }
    const body = beginCell()
      .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
      .storeStringTail("Hello, TON!") // write our text comment
      .endCell();

    let data: any = [];
    tonRecipient.split("\n").map((d) => {
      data.push({
        address: d,
        amount: toNano(tonAmount).toString(),
        payload: body.toBoc().toString("base64"),
      });
    });

    // console.log(data);

    const transaction = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: data,
    };
    const res = await tonConnectUI.sendTransaction(transaction);
    // console.log(res);
  };

  // console.log(tonRecipient.split("\n"));

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
            onChange={(e) => setTonAmount(e.target.value)}
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
            onChange={(e) => setTonRecipient(e.target.value)}
          />
        </FlexBoxRow>
        <Button
          disabled={!connected}
          style={{ marginTop: 18 }}
          onClick={processTx}
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
