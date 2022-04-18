// import { Address, BigInt, BigDecimal } from './numbers'

import {
    Address,
    TypedMap,
    Entity,
    Value,
    ValueKind,
    store,
    Bytes,
    BigInt,
    BigDecimal,

  } from "@graphprotocol/graph-ts";


export class EIP4824ProposalStatus extends Entity {
    constructor(proposalId: string, type: string) {
        super();
        this.set("id",Value.fromString(proposalId))
        this.set("type", Value.fromString(type));
    }

    save(): void {
      let proposalId = this.get("id");
      assert(proposalId != null, "Cannot save EIP4824ProposalStatus entity without a proposalId");
      if (proposalId) {
        assert(
          proposalId.kind == ValueKind.STRING,
          "Cannot save EIP4824ProposalStatus entity with non-string proposalId. " +
            'Considering using .toHex() to convert the "proposalId to a string.'
        );
        store.set("EIP4824ProposalStatus", proposalId.toString(), this);
      }
    }

    static load(proposalId: string): EIP4824ProposalStatus | null {
      return changetype<EIP4824ProposalStatus | null>(store.get("EIP4824ProposalStatus", proposalId));
    }

    get id(): string {
      let value = this.get("id");
      return value!.toString();
    }

    get type(): string {
      let value = this.get("type");
      return value!.toString();
    }
  
    set type(value: string) {
      this.set("type", Value.fromString(value));
    }
    
    get canceled(): boolean {
      let value = this.get("canceled");
      return value!.toBoolean();
    }
  
    set canceled(value: boolean) {
      this.set("canceled", Value.fromBoolean(value));
    }
  
    get queued(): boolean {
      let value = this.get("queued");
      return value!.toBoolean();
    }
  
    set queued(value: boolean) {
      this.set("queued", Value.fromBoolean(value));
    }
  
    get executed(): boolean {
      let value = this.get("executed");
      return value!.toBoolean();
    }
  
    set executed(value: boolean) {
      this.set("executed", Value.fromBoolean(value));
    }
}

export class EIP4824DAO extends Entity {
  constructor(id: string, type: string) {
      super();
      this.set("id", Value.fromString(id)); 
      this.set("type", Value.fromString(type));
  } 
  
  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save EIP4824DAO entity without an address");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save EIP4824DAO entity with non-string address. " +
          'Considering using .toHex() to convert the "address to a string.'
      );
      store.set("EIP4824DAO", id.toString(), this);
    }
  }

  static load(id: string): EIP4824DAO | null {
    return changetype<EIP4824DAO | null>(store.get("EIP4824DAO", id.toString()));
  }

  get address(): string {
    let value = this.get("address");
    return value!.toString();
  }

  set address(value: string) {
    this.set("address", Value.fromString(value));
  }

  get chainId(): string {
    let value = this.get("chainId");
    return value!.toString();
  }

  set chainId(value: string) {
    this.set("chainId", Value.fromString(value));
  }

  get network(): string {
    let value = this.get("network");
    return value!.toString();
  }

  set network(value: string) {
    this.set("network", Value.fromString(value));
  }


  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
      this.set("name", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    return value!.toString();
  }

  set description(value: string) {
      this.set("description", Value.fromString(value));
  }

  get membersURI(): string {
      let value = this.get("membersURI");
      return value!.toString();
  }
  
  set membersURI(value: string) {
      this.set("membersURI", Value.fromString(value));
  }

  get proposalsURI(): string {
    let value = this.get("proposalsURI");
    return value!.toString();
  }

  set proposalsURI(value: string) {
      this.set("proposalsURI", Value.fromString(value));
  }

  get activityLogURI(): string {
    let value = this.get("activityLogURI");
    return value!.toString();
  }

  set activityLogURI(value: string) {
      this.set("activityLogURI", Value.fromString(value));
  }

  get governanceURI(): string {
    let value = this.get("governanceURI");
    return value!.toString();
  }

  set governanceURI(value: string) {
      this.set("governanceURI", Value.fromString(value));
  }
}

export class EIP4824Member extends Entity {
    constructor(address: string) {
        super();
        this.set("id", Value.fromString(address));
        this.set("address", Value.fromString(address));
    }  

    save(): void {
      let id = this.get("id");
      assert(id != null, "Cannot save EIP4824Member without a proposalId");
      if (id) {
        assert(
          id.kind == ValueKind.STRING,
          "Cannot save EIP4824Member entity with non-string proposalId. " +
            'Considering using .toHex() to convert the "proposalId to a string.'
        );
        store.set("EIP4824Member", id.toString(), this);
      }
    }
  
    static load(id: string): EIP4824Member | null {
      return changetype<EIP4824Member | null>(store.get("EIP4824Member", id));
    }
  
    get id(): string {
      let value = this.get("id");
      return value!.toString();
    }

    get type(): string {
      let value = this.get("type");
      return value!.toString();
    }
  
    set type(value: string) {
      this.set("type", Value.fromString(value));
    }

    get role(): string {
      let value = this.get("role");
      return value!.toString();
    }
  
    set role(value: string) {
      this.set("role", Value.fromString(value));
    }

    get proposalId(): string {
      let value = this.get("proposalId");
      return value!.toString();
    }
  
    set proposalId(value: string) {
        this.set("proposalId", Value.fromString(value));
    }
}

// export class EIP4824Proposer extends EIP4824Member {
//   constructor(address: string, type: string, proposalId: string) {
//       super(address, type);
//       this.set("id", Value.fromString(proposalId));
//   }  

//   save(): void {
//     let proposalId = this.get("id");
//     assert(proposalId != null, "Cannot save EIP4824Proposer without a proposalId");
//     if (proposalId) {
//       assert(
//         proposalId.kind == ValueKind.STRING,
//         "Cannot save EIP4824Proposer entity with non-string proposalId. " +
//           'Considering using .toHex() to convert the "proposalId to a string.'
//       );
//       store.set("EIP4824Proposer", proposalId.toString(), this);
//     }
//   }

//   static load(proposalId: string): EIP4824Proposer | null {
//     return changetype<EIP4824Proposer | null>(store.get("EIP4824Proposer", proposalId));
//   }

//   get id(): string {
//     let value = this.get("id");
//     return value!.toString();
//   }
// }


export class EIP4824Activity extends Entity {
    constructor(voteId: string) {
        super();
        this.set("id", Value.fromString(voteId));
    } 
    
    save(): void {
      let proposalId = this.get("id");
      assert(proposalId != null, "Cannot save EIP4824Activity a entity without a proposalId");
      if (proposalId) {
        assert(
          proposalId.kind == ValueKind.STRING,
          "Cannot save EIP4824Activity entity with non-string proposalId. " +
            'Considering using .toHex() to convert the "proposalId to a string.'
        );
        store.set("EIP4824Activity", proposalId.toString(), this);
      }
    }

    static load(voteId: string): EIP4824Activity | null {
      return changetype<EIP4824Activity | null>(store.get("EIP4824Activity", voteId));
    }

    get id(): string {
      let value = this.get("id");
      return value!.toString();
    }

    get interactionType(): string {
      let value = this.get("interactionType");
      return value!.toString();
    }
  
    set interactionType(value: string) {
        this.set("interactionType", Value.fromString(value));
    }

    get voter(): string {
      let value = this.get("voter");
      return value!.toString();
    }
  
    set voter(value: string) {
        this.set("voter", Value.fromString(value));
    }

    get proposal(): string {
      let value = this.get("proposal");
      return value!.toString();
    }
  
    set proposal(value: string) {
        this.set("proposal", Value.fromString(value));
    }

    get timestamp(): BigInt {
      let value = this.get("timestamp");
      return value!.toBigInt();
    }

    set timestamp(value: BigInt) {
        this.set("timestamp", Value.fromBigInt(value));
    }

    get transaction(): string {
      let value = this.get("transaction");
      return value!.toString();
    }
  
    set transaction(value: string) {
        this.set("transaction", Value.fromString(value));
    }

    get support(): string {
      let value = this.get("support");
      return value!.toString();
    }
  
    set support(value: string) {
        this.set("support", Value.fromString(value));
    }

    get weight(): string {
      let value = this.get("weight");
      return value!.toString();
    }
  
    set weight(value: string) {
        this.set("weight", Value.fromString(value));
    }

}

export class EIP4824Support extends Entity {
  constructor(voteId: string) {
      super();
      this.set("id", Value.fromString(voteId));
  } 

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save EIP4824Support entity without an id");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save EIP4824Support entity with non-string id. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("EIP4824Support", id.toString(), this);
    }
  }

  static load(voteId: string): EIP4824Support | null {
    return changetype<EIP4824Support | null>(store.get("EIP4824Support", voteId));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get value(): i32 {
    let value = this.get("value");
    return value!.toI32();
  }

  set value(value: i32) {
      this.set("value", Value.fromI32(value));
  }
}

export class EIP4824Weight extends Entity {
  constructor(voteId: string) {
      super();
      this.set("id", Value.fromString(voteId));
  } 

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save EIP4824Weight entity without an id");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save EIP4824Weight entity with non-string id. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("EIP4824Weight", id.toString(), this);
    }
  }

  static load(voteId: string): EIP4824Weight | null {
    return changetype<EIP4824Weight | null>(store.get("EIP4824Weight", voteId));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get value(): i32 {
    let value = this.get("value");
    return value!.toI32();
  }

  set value(value: i32) {
      this.set("value", Value.fromI32(value));
  }
}

export class EIP4824Proposal extends Entity {
    constructor(id: string) {
        super();
        this.set("type", Value.fromString("proposal"));
        this.set("id", Value.fromString(id));
    }

    save(): void {
      let id = this.get("id");
      assert(id != null, "Cannot save EIP4824Proposal a entity without an id");
      if (id) {
        assert(
          id.kind == ValueKind.STRING,
          "Cannot save EIP4824Proposal entity with non-string id. " +
            'Considering using .toHex() to convert the "id" to a string.'
        );
        store.set("EIP4824Proposal", id.toString(), this);
      }
    }

    static load(proposalId: string): EIP4824Proposal | null {
      return changetype<EIP4824Proposal | null>(store.get("EIP4824Proposal", proposalId));
    }



    get name(): string {
      let value = this.get("name");
      return value!.toString();
    }
  
    set name(value: string) {
        this.set("name", Value.fromString(value));
    }

    get dao(): string {
      let value = this.get("dao");
      return value!.toString();
    }
  
    set dao(value: string) {
        this.set("dao", Value.fromString(value));
    }

    get proposer(): string {
      let value = this.get("proposer");
      return value!.toString();
    }
  
    set proposer(value: string) {
        this.set("proposer", Value.fromString(value));
    }

    get status(): string {
      let value = this.get("status");
      return value!.toString();
    }
  
    set status(value: string) {
        this.set("status", Value.fromString(value));
    }

    get contentURI(): string {
        let value = this.get("contentURI");
        return value!.toString();
      }
    
    set contentURI(value: string) {
        this.set("contentURI", Value.fromString(value));
    }

    get contentText(): string {
        let value = this.get("contentText");
        return value!.toString();
      }
  
    set contentText(value: string) {
        this.set("contentText", Value.fromString(value));
    }

    get startBlock(): BigInt {
      let value = this.get("startBlock");
      return value!.toBigInt();
    }

    set startBlock(value: BigInt) {
      this.set("startBlock", Value.fromBigInt(value));
    }

    get endBlock(): BigInt {
      let value = this.get("endBlock");
      return value!.toBigInt();
    }

    set endBlock(value: BigInt) {
      this.set("endBlock", Value.fromBigInt(value));
    }
}

