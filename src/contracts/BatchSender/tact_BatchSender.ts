import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from "ton-core";

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: "Context";
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: "SendParameters";
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: "Deploy";
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: "DeployOk";
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: "FactoryDeploy";
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type SetFee = {
  $$type: "SetFee";
  fee: bigint;
};

export function storeSetFee(src: SetFee) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3221913005, 32);
    b_0.storeInt(src.fee, 257);
  };
}

export function loadSetFee(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3221913005) {
    throw Error("Invalid prefix");
  }
  let _fee = sc_0.loadIntBig(257);
  return { $$type: "SetFee" as const, fee: _fee };
}

function loadTupleSetFee(source: TupleReader) {
  let _fee = source.readBigNumber();
  return { $$type: "SetFee" as const, fee: _fee };
}

function storeTupleSetFee(source: SetFee) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.fee);
  return builder.build();
}

function dictValueParserSetFee(): DictionaryValue<SetFee> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSetFee(src)).endCell());
    },
    parse: (src) => {
      return loadSetFee(src.loadRef().beginParse());
    },
  };
}

export type SendTon = {
  $$type: "SendTon";
  address: Dictionary<bigint, Address>;
  amount: Dictionary<bigint, bigint>;
  comment: Dictionary<bigint, Cell>;
  length: bigint;
};

export function storeSendTon(src: SendTon) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(69530395, 32);
    b_0.storeDict(
      src.address,
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.Address()
    );
    b_0.storeDict(
      src.amount,
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.BigInt(257)
    );
    b_0.storeDict(
      src.comment,
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.Cell()
    );
    b_0.storeInt(src.length, 257);
  };
}

export function loadSendTon(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 69530395) {
    throw Error("Invalid prefix");
  }
  let _address = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Address(),
    sc_0
  );
  let _amount = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.BigInt(257),
    sc_0
  );
  let _comment = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    sc_0
  );
  let _length = sc_0.loadIntBig(257);
  return {
    $$type: "SendTon" as const,
    address: _address,
    amount: _amount,
    comment: _comment,
    length: _length,
  };
}

function loadTupleSendTon(source: TupleReader) {
  let _address = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Address(),
    source.readCellOpt()
  );
  let _amount = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.BigInt(257),
    source.readCellOpt()
  );
  let _comment = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    source.readCellOpt()
  );
  let _length = source.readBigNumber();
  return {
    $$type: "SendTon" as const,
    address: _address,
    amount: _amount,
    comment: _comment,
    length: _length,
  };
}

function storeTupleSendTon(source: SendTon) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.address.size > 0
      ? beginCell()
          .storeDictDirect(
            source.address,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Address()
          )
          .endCell()
      : null
  );
  builder.writeCell(
    source.amount.size > 0
      ? beginCell()
          .storeDictDirect(
            source.amount,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.BigInt(257)
          )
          .endCell()
      : null
  );
  builder.writeCell(
    source.comment.size > 0
      ? beginCell()
          .storeDictDirect(
            source.comment,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Cell()
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.length);
  return builder.build();
}

function dictValueParserSendTon(): DictionaryValue<SendTon> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSendTon(src)).endCell());
    },
    parse: (src) => {
      return loadSendTon(src.loadRef().beginParse());
    },
  };
}

export type SendJetton = {
  $$type: "SendJetton";
  contractAddress: Address;
  body: Dictionary<bigint, Cell>;
  length: bigint;
  amount: bigint;
};

export function storeSendJetton(src: SendJetton) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1329154610, 32);
    b_0.storeAddress(src.contractAddress);
    b_0.storeDict(
      src.body,
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.Cell()
    );
    b_0.storeInt(src.length, 257);
    b_0.storeInt(src.amount, 257);
  };
}

export function loadSendJetton(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1329154610) {
    throw Error("Invalid prefix");
  }
  let _contractAddress = sc_0.loadAddress();
  let _body = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    sc_0
  );
  let _length = sc_0.loadIntBig(257);
  let _amount = sc_0.loadIntBig(257);
  return {
    $$type: "SendJetton" as const,
    contractAddress: _contractAddress,
    body: _body,
    length: _length,
    amount: _amount,
  };
}

function loadTupleSendJetton(source: TupleReader) {
  let _contractAddress = source.readAddress();
  let _body = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    source.readCellOpt()
  );
  let _length = source.readBigNumber();
  let _amount = source.readBigNumber();
  return {
    $$type: "SendJetton" as const,
    contractAddress: _contractAddress,
    body: _body,
    length: _length,
    amount: _amount,
  };
}

function storeTupleSendJetton(source: SendJetton) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.contractAddress);
  builder.writeCell(
    source.body.size > 0
      ? beginCell()
          .storeDictDirect(
            source.body,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Cell()
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.length);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserSendJetton(): DictionaryValue<SendJetton> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSendJetton(src)).endCell());
    },
    parse: (src) => {
      return loadSendJetton(src.loadRef().beginParse());
    },
  };
}

export type ChangeContractOwner = {
  $$type: "ChangeContractOwner";
  newOwner: Address;
};

export function storeChangeContractOwner(src: ChangeContractOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(278038460, 32);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeContractOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 278038460) {
    throw Error("Invalid prefix");
  }
  let _newOwner = sc_0.loadAddress();
  return { $$type: "ChangeContractOwner" as const, newOwner: _newOwner };
}

function loadTupleChangeContractOwner(source: TupleReader) {
  let _newOwner = source.readAddress();
  return { $$type: "ChangeContractOwner" as const, newOwner: _newOwner };
}

function storeTupleChangeContractOwner(source: ChangeContractOwner) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeContractOwner(): DictionaryValue<ChangeContractOwner> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeChangeContractOwner(src)).endCell()
      );
    },
    parse: (src) => {
      return loadChangeContractOwner(src.loadRef().beginParse());
    },
  };
}

type BatchSender_init_args = {
  $$type: "BatchSender_init_args";
};

function initBatchSender_init_args(src: BatchSender_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
  };
}

async function BatchSender_init() {
  const __code = Cell.fromBase64(
    "te6ccgECHAEABSAAART/APSkE/S88sgLAQIBYgIDAtrQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8Aye1UGQQCAVgQEQTw7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEAQk8xu6jqAw0x8BghAEJPMbuvLggfQE9AT0BIEBAdcAVTBsFNs8f+AgghDACn2tuo4XMNMfAYIQwAp9rbry4IGBAQHXAAExMX/gIIIQTzlKMrrjAiCCEBCSh7y64wIgBQYHCAOcU0CogQEBVFQAcQFBM/QMb6GUAdcAMJJbbeIgbpJfBuCBNx74QW8kE18DAiBu8tCAJKhSMKASvvL0cn+IKVUwFEMwbW3bPJMgwgCK6F8ECw4JAYIw0x8BghBPOUoyuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ASBAQHXAIEBAdcAVTBsFNs8fwoAYDDTHwGCEBCSh7y68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEyfwJyghCUapi2uo6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+DAAJEw4w1wDA0BmiOBAQEiWfQMb6GSMG3fIG7y0ICBAQFUVABSQEEz9AxvoZQB1wAwkltt4iBu8tCAI4EBASRZ9A1voZIwbd8gbvLQgHJ/WBRDMG1t2zylDgOgU0GoggDRmfhBbyQTXwNSJKATvhLy9HJ/iChVMBRDMG1t2zyTIMIAjqQhgQEBIln0DW+hkjBt3yBu8tCAggiYloByfyYEFEMwbW3bPKXoXwMLDg4AMAAAAABGZWUgZnJvbSBUb24gU3ByYXllcgE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwOAaj5AYLwvrKTWoIImxVNMvmcQ3eqlgqhFTZswsYCdV42uX9QXOy6jqyBPJX4QlIwxwXy9PhCf/gnbxD4QW8kE18DoYIImJaAoYBCECNtbW3bPH/bMeAOAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AA8AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASASEwIBIBUWAhG22Btnm2eNhDAZFAC5t3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQAAj4J28QAgEgFxgCEbQi+2ebZ42EMBkaABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVdSRVM1R3dzTU5vQVlwSkZSMmJRUlM0TXBOUWJFcGNxTHJvUFVjZThFYnJjggAYbtRNDUAfhj0gABjij6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWWwS4DD4KNcLCoMJuvLgids8GwACIAAO+EKCCvrwgA=="
  );
  const __system = Cell.fromBase64(
    "te6cckECHgEABSoAAQHAAQEFoAFZAgEU/wD0pBP0vPLICwMCAWIEEQLa0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wts88uCCyPhDAcx/AcoAWVkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMntVBsFBPDtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQBCTzG7qOoDDTHwGCEAQk8xu68uCB9AT0BPQEgQEB1wBVMGwU2zx/4CCCEMAKfa26jhcw0x8BghDACn2tuvLggYEBAdcAATExf+AgghBPOUoyuuMCIIIQEJKHvLrjAiAGCAsMA5xTQKiBAQFUVABxAUEz9AxvoZQB1wAwkltt4iBukl8G4IE3HvhBbyQTXwMCIG7y0IAkqFIwoBK+8vRyf4gpVTAUQzBtbds8kyDCAIroXwQKDwcBmiOBAQEiWfQMb6GSMG3fIG7y0ICBAQFUVABSQEEz9AxvoZQB1wAwkltt4iBu8tCAI4EBASRZ9A1voZIwbd8gbvLQgHJ/WBRDMG1t2zylDwGCMNMfAYIQTzlKMrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQEgQEB1wCBAQHXAFUwbBTbPH8JA6BTQaiCANGZ+EFvJBNfA1IkoBO+EvL0cn+IKFUwFEMwbW3bPJMgwgCOpCGBAQEiWfQNb6GSMG3fIG7y0ICCCJiWgHJ/JgQUQzBtbds8pehfAwoPDwAwAAAAAEZlZSBmcm9tIFRvbiBTcHJheWVyAGAw0x8BghAQkoe8uvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxMn8CcoIQlGqYtrqOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gwACRMOMNcA0OATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPA8BqPkBgvC+spNaggibFU0y+ZxDd6qWCqEVNmzCxgJ1Xja5f1Bc7LqOrIE8lfhCUjDHBfL0+EJ/+CdvEPhBbyQTXwOhggiYloChgEIQI21tbds8f9sx4A8ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAEACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBWBIWAgEgExUCEbbYG2ebZ42EMBsUAAj4J28QALm3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOA3qTvfKost446np7wKs4ZNBOE7Lpy1Zp2W5nQdLNsozdFJACASAXGgIBIBgZABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVdSRVM1R3dzTU5vQVlwSkZSMmJRUlM0TXBOUWJFcGNxTHJvUFVjZThFYnJjggAhG0Ivtnm2eNhDAbHQGG7UTQ1AH4Y9IAAY4o+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEuAw+CjXCwqDCbry4InbPBwADvhCggr68IAAAiBuW5Wh"
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initBatchSender_init_args({ $$type: "BatchSender_init_args" })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const BatchSender_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack undeflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  14110: { message: `400` },
  15509: { message: `Only deployer is allowed to withdraw` },
  53657: { message: `401` },
};

const BatchSender_types: ABIType[] = [
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: false } },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounced",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "code", type: { kind: "simple", type: "cell", optional: true } },
      { name: "data", type: { kind: "simple", type: "cell", optional: true } },
    ],
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "SetFee",
    header: 3221913005,
    fields: [
      {
        name: "fee",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "SendTon",
    header: 69530395,
    fields: [
      { name: "address", type: { kind: "dict", key: "int", value: "address" } },
      { name: "amount", type: { kind: "dict", key: "int", value: "int" } },
      {
        name: "comment",
        type: { kind: "dict", key: "int", value: "cell", valueFormat: "ref" },
      },
      {
        name: "length",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "SendJetton",
    header: 1329154610,
    fields: [
      {
        name: "contractAddress",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "body",
        type: { kind: "dict", key: "int", value: "cell", valueFormat: "ref" },
      },
      {
        name: "length",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "ChangeContractOwner",
    header: 278038460,
    fields: [
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
];

const BatchSender_getters: ABIGetter[] = [
  {
    name: "balance",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "fee",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
];

const BatchSender_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "typed", type: "SendTon" } },
  { receiver: "internal", message: { kind: "typed", type: "SetFee" } },
  { receiver: "internal", message: { kind: "typed", type: "SendJetton" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "ChangeContractOwner" },
  },
  { receiver: "internal", message: { kind: "text", text: "withdraw safe" } },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
];

export class BatchSender implements Contract {
  static async init() {
    return await BatchSender_init();
  }

  static async fromInit() {
    const init = await BatchSender_init();
    const address = contractAddress(0, init);
    return new BatchSender(address, init);
  }

  static fromAddress(address: Address) {
    return new BatchSender(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: BatchSender_types,
    getters: BatchSender_getters,
    receivers: BatchSender_receivers,
    errors: BatchSender_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | SendTon
      | SetFee
      | SendJetton
      | ChangeContractOwner
      | "withdraw safe"
      | Deploy
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "SendTon"
    ) {
      body = beginCell().store(storeSendTon(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "SetFee"
    ) {
      body = beginCell().store(storeSetFee(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "SendJetton"
    ) {
      body = beginCell().store(storeSendJetton(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "ChangeContractOwner"
    ) {
      body = beginCell().store(storeChangeContractOwner(message)).endCell();
    }
    if (message === "withdraw safe") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Deploy"
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getBalance(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("balance", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getFee(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("fee", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }
}
