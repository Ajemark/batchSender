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

export type Transfer = {
  $$type: "Transfer";
  query_id: bigint;
  new_owner: Address;
};

export function storeTransfer(src: Transfer) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1578759217, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.new_owner);
  };
}

export function loadTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1578759217) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _new_owner = sc_0.loadAddress();
  return {
    $$type: "Transfer" as const,
    query_id: _query_id,
    new_owner: _new_owner,
  };
}

function loadTupleTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _new_owner = source.readAddress();
  return {
    $$type: "Transfer" as const,
    query_id: _query_id,
    new_owner: _new_owner,
  };
}

function storeTupleTransfer(source: Transfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.new_owner);
  return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTransfer(src)).endCell());
    },
    parse: (src) => {
      return loadTransfer(src.loadRef().beginParse());
    },
  };
}

export type MintNft = {
  $$type: "MintNft";
  body: Cell;
  amount: bigint;
  collection_address: Address;
  refCode: bigint;
};

export function storeMintNft(src: MintNft) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1696451610, 32);
    b_0.storeRef(src.body);
    b_0.storeInt(src.amount, 257);
    b_0.storeAddress(src.collection_address);
    b_0.storeInt(src.refCode, 257);
  };
}

export function loadMintNft(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1696451610) {
    throw Error("Invalid prefix");
  }
  let _body = sc_0.loadRef();
  let _amount = sc_0.loadIntBig(257);
  let _collection_address = sc_0.loadAddress();
  let _refCode = sc_0.loadIntBig(257);
  return {
    $$type: "MintNft" as const,
    body: _body,
    amount: _amount,
    collection_address: _collection_address,
    refCode: _refCode,
  };
}

function loadTupleMintNft(source: TupleReader) {
  let _body = source.readCell();
  let _amount = source.readBigNumber();
  let _collection_address = source.readAddress();
  let _refCode = source.readBigNumber();
  return {
    $$type: "MintNft" as const,
    body: _body,
    amount: _amount,
    collection_address: _collection_address,
    refCode: _refCode,
  };
}

function storeTupleMintNft(source: MintNft) {
  let builder = new TupleBuilder();
  builder.writeCell(source.body);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.collection_address);
  builder.writeNumber(source.refCode);
  return builder.build();
}

function dictValueParserMintNft(): DictionaryValue<MintNft> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeMintNft(src)).endCell());
    },
    parse: (src) => {
      return loadMintNft(src.loadRef().beginParse());
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

export type ChangeCollectionOwner = {
  $$type: "ChangeCollectionOwner";
  collection_address: Address;
  body: Cell;
};

export function storeChangeCollectionOwner(src: ChangeCollectionOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1158906450, 32);
    b_0.storeAddress(src.collection_address);
    b_0.storeRef(src.body);
  };
}

export function loadChangeCollectionOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1158906450) {
    throw Error("Invalid prefix");
  }
  let _collection_address = sc_0.loadAddress();
  let _body = sc_0.loadRef();
  return {
    $$type: "ChangeCollectionOwner" as const,
    collection_address: _collection_address,
    body: _body,
  };
}

function loadTupleChangeCollectionOwner(source: TupleReader) {
  let _collection_address = source.readAddress();
  let _body = source.readCell();
  return {
    $$type: "ChangeCollectionOwner" as const,
    collection_address: _collection_address,
    body: _body,
  };
}

function storeTupleChangeCollectionOwner(source: ChangeCollectionOwner) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.collection_address);
  builder.writeCell(source.body);
  return builder.build();
}

function dictValueParserChangeCollectionOwner(): DictionaryValue<ChangeCollectionOwner> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeChangeCollectionOwner(src)).endCell()
      );
    },
    parse: (src) => {
      return loadChangeCollectionOwner(src.loadRef().beginParse());
    },
  };
}

export type TransferNFT = {
  $$type: "TransferNFT";
  contractAddress: Address;
  itemIndex: bigint;
};

export function storeTransferNFT(src: TransferNFT) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(429635489, 32);
    b_0.storeAddress(src.contractAddress);
    b_0.storeInt(src.itemIndex, 257);
  };
}

export function loadTransferNFT(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 429635489) {
    throw Error("Invalid prefix");
  }
  let _contractAddress = sc_0.loadAddress();
  let _itemIndex = sc_0.loadIntBig(257);
  return {
    $$type: "TransferNFT" as const,
    contractAddress: _contractAddress,
    itemIndex: _itemIndex,
  };
}

function loadTupleTransferNFT(source: TupleReader) {
  let _contractAddress = source.readAddress();
  let _itemIndex = source.readBigNumber();
  return {
    $$type: "TransferNFT" as const,
    contractAddress: _contractAddress,
    itemIndex: _itemIndex,
  };
}

function storeTupleTransferNFT(source: TransferNFT) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.contractAddress);
  builder.writeNumber(source.itemIndex);
  return builder.build();
}

function dictValueParserTransferNFT(): DictionaryValue<TransferNFT> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTransferNFT(src)).endCell());
    },
    parse: (src) => {
      return loadTransferNFT(src.loadRef().beginParse());
    },
  };
}

export type CollectionData = {
  $$type: "CollectionData";
  next_item_index: bigint;
  collection_content: Cell;
  owner_address: Address;
};

export function storeCollectionData(src: CollectionData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.next_item_index, 257);
    b_0.storeRef(src.collection_content);
    b_0.storeAddress(src.owner_address);
  };
}

export function loadCollectionData(slice: Slice) {
  let sc_0 = slice;
  let _next_item_index = sc_0.loadIntBig(257);
  let _collection_content = sc_0.loadRef();
  let _owner_address = sc_0.loadAddress();
  return {
    $$type: "CollectionData" as const,
    next_item_index: _next_item_index,
    collection_content: _collection_content,
    owner_address: _owner_address,
  };
}

function loadTupleCollectionData(source: TupleReader) {
  let _next_item_index = source.readBigNumber();
  let _collection_content = source.readCell();
  let _owner_address = source.readAddress();
  return {
    $$type: "CollectionData" as const,
    next_item_index: _next_item_index,
    collection_content: _collection_content,
    owner_address: _owner_address,
  };
}

function storeTupleCollectionData(source: CollectionData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.next_item_index);
  builder.writeCell(source.collection_content);
  builder.writeAddress(source.owner_address);
  return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeCollectionData(src)).endCell());
    },
    parse: (src) => {
      return loadCollectionData(src.loadRef().beginParse());
    },
  };
}

export type ItemData = {
  $$type: "ItemData";
  owner: Address;
  collection_address: Address;
  item_index: bigint;
  individual_content: Cell;
};

export function storeItemData(src: ItemData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.owner);
    b_0.storeAddress(src.collection_address);
    b_0.storeInt(src.item_index, 257);
    b_0.storeRef(src.individual_content);
  };
}

export function loadItemData(slice: Slice) {
  let sc_0 = slice;
  let _owner = sc_0.loadAddress();
  let _collection_address = sc_0.loadAddress();
  let _item_index = sc_0.loadIntBig(257);
  let _individual_content = sc_0.loadRef();
  return {
    $$type: "ItemData" as const,
    owner: _owner,
    collection_address: _collection_address,
    item_index: _item_index,
    individual_content: _individual_content,
  };
}

function loadTupleItemData(source: TupleReader) {
  let _owner = source.readAddress();
  let _collection_address = source.readAddress();
  let _item_index = source.readBigNumber();
  let _individual_content = source.readCell();
  return {
    $$type: "ItemData" as const,
    owner: _owner,
    collection_address: _collection_address,
    item_index: _item_index,
    individual_content: _individual_content,
  };
}

function storeTupleItemData(source: ItemData) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.owner);
  builder.writeAddress(source.collection_address);
  builder.writeNumber(source.item_index);
  builder.writeCell(source.individual_content);
  return builder.build();
}

function dictValueParserItemData(): DictionaryValue<ItemData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeItemData(src)).endCell());
    },
    parse: (src) => {
      return loadItemData(src.loadRef().beginParse());
    },
  };
}

export type InternalSendJetton = {
  $$type: "InternalSendJetton";
  contractAddress: Address;
  body: Cell;
};

export function storeInternalSendJetton(src: InternalSendJetton) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1250200632, 32);
    b_0.storeAddress(src.contractAddress);
    b_0.storeRef(src.body);
  };
}

export function loadInternalSendJetton(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1250200632) {
    throw Error("Invalid prefix");
  }
  let _contractAddress = sc_0.loadAddress();
  let _body = sc_0.loadRef();
  return {
    $$type: "InternalSendJetton" as const,
    contractAddress: _contractAddress,
    body: _body,
  };
}

function loadTupleInternalSendJetton(source: TupleReader) {
  let _contractAddress = source.readAddress();
  let _body = source.readCell();
  return {
    $$type: "InternalSendJetton" as const,
    contractAddress: _contractAddress,
    body: _body,
  };
}

function storeTupleInternalSendJetton(source: InternalSendJetton) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.contractAddress);
  builder.writeCell(source.body);
  return builder.build();
}

function dictValueParserInternalSendJetton(): DictionaryValue<InternalSendJetton> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeInternalSendJetton(src)).endCell()
      );
    },
    parse: (src) => {
      return loadInternalSendJetton(src.loadRef().beginParse());
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
    "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"
  );
  const __system = Cell.fromBase64(
    "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"
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
  27921: { message: `Only owner is allowed to withdraw` },
  40797: { message: `Only parent is allowed to call this function` },
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
    name: "Transfer",
    header: 1578759217,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "new_owner",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "MintNft",
    header: 1696451610,
    fields: [
      { name: "body", type: { kind: "simple", type: "cell", optional: false } },
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "collection_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "refCode",
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
  {
    name: "ChangeCollectionOwner",
    header: 1158906450,
    fields: [
      {
        name: "collection_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "TransferNFT",
    header: 429635489,
    fields: [
      {
        name: "contractAddress",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "itemIndex",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "CollectionData",
    header: null,
    fields: [
      {
        name: "next_item_index",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "collection_content",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "owner_address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ItemData",
    header: null,
    fields: [
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "collection_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "item_index",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "individual_content",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "InternalSendJetton",
    header: 1250200632,
    fields: [
      {
        name: "contractAddress",
        type: { kind: "simple", type: "address", optional: false },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: false } },
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
  {
    name: "myJettonWalletAddress",
    arguments: [
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
    returnType: { kind: "simple", type: "address", optional: false },
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

  async getMyJettonWalletAddress(provider: ContractProvider, address: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(address);
    let source = (await provider.get("myJettonWalletAddress", builder.build()))
      .stack;
    let result = source.readAddress();
    return result;
  }
}
