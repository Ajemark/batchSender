# TACT Compilation Report
Contract: BatchSender
BOC Size: 1707 bytes

# Types
Total Types: 17

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## Transfer
TLB: `transfer#5e19f431 query_id:uint64 new_owner:address = Transfer`
Signature: `Transfer{query_id:uint64,new_owner:address}`

## MintNft
TLB: `mint_nft#651dcc1a body:^cell amount:int257 collection_address:address refCode:int257 = MintNft`
Signature: `MintNft{body:^cell,amount:int257,collection_address:address,refCode:int257}`

## ChangeContractOwner
TLB: `change_contract_owner#109287bc newOwner:address = ChangeContractOwner`
Signature: `ChangeContractOwner{newOwner:address}`

## ChangeCollectionOwner
TLB: `change_collection_owner#45138252 collection_address:address body:^cell = ChangeCollectionOwner`
Signature: `ChangeCollectionOwner{collection_address:address,body:^cell}`

## TransferNFT
TLB: `transfer_nft#199bb7a1 contractAddress:address itemIndex:int257 = TransferNFT`
Signature: `TransferNFT{contractAddress:address,itemIndex:int257}`

## CollectionData
TLB: `_ next_item_index:int257 collection_content:^cell owner_address:address = CollectionData`
Signature: `CollectionData{next_item_index:int257,collection_content:^cell,owner_address:address}`

## ItemData
TLB: `_ owner:address collection_address:address item_index:int257 individual_content:^cell = ItemData`
Signature: `ItemData{owner:address,collection_address:address,item_index:int257,individual_content:^cell}`

## InternalSendJetton
TLB: `internal_send_jetton#4a848c38 contractAddress:address body:^cell = InternalSendJetton`
Signature: `InternalSendJetton{contractAddress:address,body:^cell}`

## SetFee
TLB: `set_fee#c00a7dad fee:int257 = SetFee`
Signature: `SetFee{fee:int257}`

## SendJetton
TLB: `send_jetton#4f394a32 contractAddress:address body:dict<int, ^cell> length:int257 amount:int257 = SendJetton`
Signature: `SendJetton{contractAddress:address,body:dict<int, ^cell>,length:int257,amount:int257}`

## SendTon
TLB: `send_ton#0424f31b address:dict<int, address> amount:dict<int, int> comment:dict<int, ^cell> length:int257 = SendTon`
Signature: `SendTon{address:dict<int, address>,amount:dict<int, int>,comment:dict<int, ^cell>,length:int257}`

# Get Methods
Total Get Methods: 4

## balance

## fee

## admin

## myJettonWalletAddress
Argument: address

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
14110: 400
21653: Only admin can call this function
27921: Only owner is allowed to withdraw
40797: Only parent is allowed to call this function
52504: Only admin is allowed to withdraw
53657: 401