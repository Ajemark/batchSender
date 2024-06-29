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
    DictionaryValue
} from 'ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

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
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
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
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

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
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
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
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
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
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
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
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
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
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
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
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

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
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
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
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    new_owner: Address;
}

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
    if (sc_0.loadUint(32) !== 1578759217) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner };
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
        }
    }
}

export type MintNft = {
    $$type: 'MintNft';
    body: Cell;
    amount: bigint;
    collection_address: Address;
    refCode: bigint;
}

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
    if (sc_0.loadUint(32) !== 1696451610) { throw Error('Invalid prefix'); }
    let _body = sc_0.loadRef();
    let _amount = sc_0.loadIntBig(257);
    let _collection_address = sc_0.loadAddress();
    let _refCode = sc_0.loadIntBig(257);
    return { $$type: 'MintNft' as const, body: _body, amount: _amount, collection_address: _collection_address, refCode: _refCode };
}

function loadTupleMintNft(source: TupleReader) {
    let _body = source.readCell();
    let _amount = source.readBigNumber();
    let _collection_address = source.readAddress();
    let _refCode = source.readBigNumber();
    return { $$type: 'MintNft' as const, body: _body, amount: _amount, collection_address: _collection_address, refCode: _refCode };
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
        }
    }
}

export type ChangeContractOwner = {
    $$type: 'ChangeContractOwner';
    newOwner: Address;
}

export function storeChangeContractOwner(src: ChangeContractOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(278038460, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeContractOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 278038460) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeContractOwner' as const, newOwner: _newOwner };
}

function loadTupleChangeContractOwner(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeContractOwner' as const, newOwner: _newOwner };
}

function storeTupleChangeContractOwner(source: ChangeContractOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeContractOwner(): DictionaryValue<ChangeContractOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeContractOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeContractOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeCollectionOwner = {
    $$type: 'ChangeCollectionOwner';
    collection_address: Address;
    body: Cell;
}

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
    if (sc_0.loadUint(32) !== 1158906450) { throw Error('Invalid prefix'); }
    let _collection_address = sc_0.loadAddress();
    let _body = sc_0.loadRef();
    return { $$type: 'ChangeCollectionOwner' as const, collection_address: _collection_address, body: _body };
}

function loadTupleChangeCollectionOwner(source: TupleReader) {
    let _collection_address = source.readAddress();
    let _body = source.readCell();
    return { $$type: 'ChangeCollectionOwner' as const, collection_address: _collection_address, body: _body };
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
            buidler.storeRef(beginCell().store(storeChangeCollectionOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeCollectionOwner(src.loadRef().beginParse());
        }
    }
}

export type TransferNFT = {
    $$type: 'TransferNFT';
    contractAddress: Address;
    itemIndex: bigint;
}

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
    if (sc_0.loadUint(32) !== 429635489) { throw Error('Invalid prefix'); }
    let _contractAddress = sc_0.loadAddress();
    let _itemIndex = sc_0.loadIntBig(257);
    return { $$type: 'TransferNFT' as const, contractAddress: _contractAddress, itemIndex: _itemIndex };
}

function loadTupleTransferNFT(source: TupleReader) {
    let _contractAddress = source.readAddress();
    let _itemIndex = source.readBigNumber();
    return { $$type: 'TransferNFT' as const, contractAddress: _contractAddress, itemIndex: _itemIndex };
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
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    next_item_index: bigint;
    collection_content: Cell;
    owner_address: Address;
}

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
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function loadTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _owner_address = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
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
        }
    }
}

export type ItemData = {
    $$type: 'ItemData';
    owner: Address;
    collection_address: Address;
    item_index: bigint;
    individual_content: Cell;
}

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
    return { $$type: 'ItemData' as const, owner: _owner, collection_address: _collection_address, item_index: _item_index, individual_content: _individual_content };
}

function loadTupleItemData(source: TupleReader) {
    let _owner = source.readAddress();
    let _collection_address = source.readAddress();
    let _item_index = source.readBigNumber();
    let _individual_content = source.readCell();
    return { $$type: 'ItemData' as const, owner: _owner, collection_address: _collection_address, item_index: _item_index, individual_content: _individual_content };
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
        }
    }
}

export type InternalSendJetton = {
    $$type: 'InternalSendJetton';
    contractAddress: Address;
    body: Cell;
}

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
    if (sc_0.loadUint(32) !== 1250200632) { throw Error('Invalid prefix'); }
    let _contractAddress = sc_0.loadAddress();
    let _body = sc_0.loadRef();
    return { $$type: 'InternalSendJetton' as const, contractAddress: _contractAddress, body: _body };
}

function loadTupleInternalSendJetton(source: TupleReader) {
    let _contractAddress = source.readAddress();
    let _body = source.readCell();
    return { $$type: 'InternalSendJetton' as const, contractAddress: _contractAddress, body: _body };
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
            buidler.storeRef(beginCell().store(storeInternalSendJetton(src)).endCell());
        },
        parse: (src) => {
            return loadInternalSendJetton(src.loadRef().beginParse());
        }
    }
}

export type SetFee = {
    $$type: 'SetFee';
    fee: bigint;
}

export function storeSetFee(src: SetFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3221913005, 32);
        b_0.storeInt(src.fee, 257);
    };
}

export function loadSetFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3221913005) { throw Error('Invalid prefix'); }
    let _fee = sc_0.loadIntBig(257);
    return { $$type: 'SetFee' as const, fee: _fee };
}

function loadTupleSetFee(source: TupleReader) {
    let _fee = source.readBigNumber();
    return { $$type: 'SetFee' as const, fee: _fee };
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
        }
    }
}

export type SendJetton = {
    $$type: 'SendJetton';
    contractAddress: Address;
    body: Dictionary<bigint, Cell>;
    length: bigint;
    amount: bigint;
}

export function storeSendJetton(src: SendJetton) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1329154610, 32);
        b_0.storeAddress(src.contractAddress);
        b_0.storeDict(src.body, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell());
        b_0.storeInt(src.length, 257);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadSendJetton(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1329154610) { throw Error('Invalid prefix'); }
    let _contractAddress = sc_0.loadAddress();
    let _body = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), sc_0);
    let _length = sc_0.loadIntBig(257);
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'SendJetton' as const, contractAddress: _contractAddress, body: _body, length: _length, amount: _amount };
}

function loadTupleSendJetton(source: TupleReader) {
    let _contractAddress = source.readAddress();
    let _body = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    let _length = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'SendJetton' as const, contractAddress: _contractAddress, body: _body, length: _length, amount: _amount };
}

function storeTupleSendJetton(source: SendJetton) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.contractAddress);
    builder.writeCell(source.body.size > 0 ? beginCell().storeDictDirect(source.body, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell()).endCell() : null);
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
        }
    }
}

export type SendTon = {
    $$type: 'SendTon';
    address: Dictionary<bigint, Address>;
    amount: Dictionary<bigint, bigint>;
    comment: Dictionary<bigint, Cell>;
    length: bigint;
}

export function storeSendTon(src: SendTon) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(69530395, 32);
        b_0.storeDict(src.address, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_0.storeDict(src.amount, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
        b_0.storeDict(src.comment, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell());
        b_0.storeInt(src.length, 257);
    };
}

export function loadSendTon(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 69530395) { throw Error('Invalid prefix'); }
    let _address = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    let _amount = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    let _comment = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), sc_0);
    let _length = sc_0.loadIntBig(257);
    return { $$type: 'SendTon' as const, address: _address, amount: _amount, comment: _comment, length: _length };
}

function loadTupleSendTon(source: TupleReader) {
    let _address = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _amount = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _comment = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'SendTon' as const, address: _address, amount: _amount, comment: _comment, length: _length };
}

function storeTupleSendTon(source: SendTon) {
    let builder = new TupleBuilder();
    builder.writeCell(source.address.size > 0 ? beginCell().storeDictDirect(source.address, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.amount.size > 0 ? beginCell().storeDictDirect(source.amount, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.comment.size > 0 ? beginCell().storeDictDirect(source.comment, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell()).endCell() : null);
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
        }
    }
}

 type BatchJettonSender_init_args = {
    $$type: 'BatchJettonSender_init_args';
    owner: Address;
}

function initBatchJettonSender_init_args(src: BatchJettonSender_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function BatchJettonSender_init(owner: Address) {
    const __code = Cell.fromBase64('te6ccgECFwEABBIAART/APSkE/S88sgLAQIBYgIDA3jQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4IIRBAUCAVgNDgTY7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEEqEjDi6jrUw0x8BghBKhIw4uvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1FlsEts8f+AgghAQkoe8uuMCIIIQlGqYtrrjAsAABgcICQCWyPhDAcx/AcoAWVkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wye1UATiCAJ9d+EJSUMcF8vSCCvrwgHJYfwEUQzBtbds8CwBgMNMfAYIQEJKHvLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMTF/AVAw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/CgG0jtT5AYLwvrKTWoIImxVNMvmcQ3eqlgqhFTZswsYCdV42uX9QXOy6jqyBbRH4QlIgxwXy9H/4J28Q+EFvJBNfA6GCCJiWgKEiWYBCECNtbW3bPH/bMeCRMOJwCwE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwLAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAwAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASAPEAIBSBUWAhG22Btnm2eNhDAREgC5t3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQAfbtRNDUAfhj0gABjkL6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLg+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdETAAj4J28QAQTbPBQABvhCAQARsK+7UTQ0gABgAHWybuNDVpcGZzOi8vUW1TNVc5THVyd0FZb1dIU1lKTTIydWJYZ2RmalFjTWY4dEdjeE55bXlwQ0hjNoIA==');
    const __system = Cell.fromBase64('te6cckECGQEABBwAAQHAAQEFoXejAgEU/wD0pBP0vPLICwMCAWIEDgN40AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wts88uCCEQUNBNjtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQSoSMOLqOtTDTHwGCEEqEjDi68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUWWwS2zx/4CCCEBCSh7y64wIgghCUapi2uuMCwAAGBwgKATiCAJ9d+EJSUMcF8vSCCvrwgHJYfwEUQzBtbds8CwBgMNMfAYIQEJKHvLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMTF/AVAw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/CQE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwLAbSO1PkBgvC+spNaggibFU0y+ZxDd6qWCqEVNmzCxgJ1Xja5f1Bc7LqOrIFtEfhCUiDHBfL0f/gnbxD4QW8kE18DoYIImJaAoSJZgEIQI21tbds8f9sx4JEw4nALAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAwAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAlsj4QwHMfwHKAFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsntVAIBWA8WAgEgEBUCEbbYG2ebZ42EMBEUAfbtRNDUAfhj0gABjkL6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLg+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdESAQTbPBMABvhCAQAI+CdvEAC5t3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQAgFIFxgAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtUzVXOUx1cndBWW9XSFNZSk0yMnViWGdkZmpRY01mOHRHY3hOeW15cENIYzaCDJlv0c');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initBatchJettonSender_init_args({ $$type: 'BatchJettonSender_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const BatchJettonSender_errors: { [key: number]: { message: string } } = {
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
    21653: { message: `Only admin can call this function` },
    27921: { message: `Only owner is allowed to withdraw` },
    40797: { message: `Only parent is allowed to call this function` },
    52504: { message: `Only admin is allowed to withdraw` },
    53657: { message: `401` },
}

const BatchJettonSender_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Transfer","header":1578759217,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MintNft","header":1696451610,"fields":[{"name":"body","type":{"kind":"simple","type":"cell","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"refCode","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ChangeContractOwner","header":278038460,"fields":[{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeCollectionOwner","header":1158906450,"fields":[{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"body","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TransferNFT","header":429635489,"fields":[{"name":"contractAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"itemIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"next_item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ItemData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"InternalSendJetton","header":1250200632,"fields":[{"name":"contractAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"body","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"SetFee","header":3221913005,"fields":[{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SendJetton","header":1329154610,"fields":[{"name":"contractAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"body","type":{"kind":"dict","key":"int","value":"cell","valueFormat":"ref"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SendTon","header":69530395,"fields":[{"name":"address","type":{"kind":"dict","key":"int","value":"address"}},{"name":"amount","type":{"kind":"dict","key":"int","value":"int"}},{"name":"comment","type":{"kind":"dict","key":"int","value":"cell","valueFormat":"ref"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const BatchJettonSender_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const BatchJettonSender_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"InternalSendJetton"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeContractOwner"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw safe"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class BatchJettonSender implements Contract {
    
    static async init(owner: Address) {
        return await BatchJettonSender_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await BatchJettonSender_init(owner);
        const address = contractAddress(0, init);
        return new BatchJettonSender(address, init);
    }
    
    static fromAddress(address: Address) {
        return new BatchJettonSender(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  BatchJettonSender_types,
        getters: BatchJettonSender_getters,
        receivers: BatchJettonSender_receivers,
        errors: BatchJettonSender_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: InternalSendJetton | ChangeContractOwner | 'withdraw safe' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalSendJetton') {
            body = beginCell().store(storeInternalSendJetton(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeContractOwner') {
            body = beginCell().store(storeChangeContractOwner(message)).endCell();
        }
        if (message === 'withdraw safe') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}
