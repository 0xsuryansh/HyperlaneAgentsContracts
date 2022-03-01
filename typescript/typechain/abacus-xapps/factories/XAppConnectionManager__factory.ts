/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  XAppConnectionManager,
  XAppConnectionManagerInterface,
} from "../XAppConnectionManager";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "home",
        type: "address",
      },
    ],
    name: "NewHome",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "domain",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "replica",
        type: "address",
      },
    ],
    name: "ReplicaEnrolled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "domain",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "replica",
        type: "address",
      },
    ],
    name: "ReplicaUnenrolled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "domainToReplica",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_replica",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
    ],
    name: "enrollReplica",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "home",
    outputs: [
      {
        internalType: "contract Home",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_replica",
        type: "address",
      },
    ],
    name: "isReplica",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "localDomain",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "replicaToDomain",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_home",
        type: "address",
      },
    ],
    name: "setHome",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_replica",
        type: "address",
      },
    ],
    name: "unenrollReplica",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600061001b61006a565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006e565b3390565b610b0a8061007d6000396000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c80638d3638f4116100815780639fa92f9d1161005b5780639fa92f9d14610249578063b9cff16214610251578063f2fde38b14610274576100c9565b80638d3638f4146101d15780638da5cb5b146101d9578063954175c41461020a576100c9565b80635f8b1dba116100b25780635f8b1dba1461014a5780636ef0f37f14610196578063715018a6146101c9576100c9565b80634f4620a3146100ce5780635190bc5314610103575b600080fd5b610101600480360360208110156100e457600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166102a7565b005b6101366004803603602081101561011957600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661035b565b604080519115158252519081900360200190f35b61017d6004803603602081101561016057600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661038b565b6040805163ffffffff9092168252519081900360200190f35b610101600480360360208110156101ac57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166103a3565b6101016104ba565b61017d6105d1565b6101e161066d565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6101016004803603604081101561022057600080fd5b50803573ffffffffffffffffffffffffffffffffffffffff16906020013563ffffffff16610689565b6101e16107fd565b6101e16004803603602081101561026757600080fd5b503563ffffffff16610819565b6101016004803603602081101561028a57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610841565b6102af6109e2565b73ffffffffffffffffffffffffffffffffffffffff166102cd61066d565b73ffffffffffffffffffffffffffffffffffffffff161461034f57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b610358816109e6565b50565b73ffffffffffffffffffffffffffffffffffffffff1660009081526002602052604090205463ffffffff16151590565b60026020526000908152604090205463ffffffff1681565b6103ab6109e2565b73ffffffffffffffffffffffffffffffffffffffff166103c961066d565b73ffffffffffffffffffffffffffffffffffffffff161461044b57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040517fa6c230e5615262e310dcb42eaf014e813e5d8580abf5b00d2186ca8e9833de2190600090a250565b6104c26109e2565b73ffffffffffffffffffffffffffffffffffffffff166104e061066d565b73ffffffffffffffffffffffffffffffffffffffff161461056257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b600154604080517f8d3638f4000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff1691638d3638f4916004808301926020929190829003018186803b15801561063c57600080fd5b505afa158015610650573d6000803e3d6000fd5b505050506040513d602081101561066657600080fd5b5051905090565b60005473ffffffffffffffffffffffffffffffffffffffff1690565b6106916109e2565b73ffffffffffffffffffffffffffffffffffffffff166106af61066d565b73ffffffffffffffffffffffffffffffffffffffff161461073157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b61073a826109e6565b73ffffffffffffffffffffffffffffffffffffffff8216600081815260026020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000001663ffffffff8716908117909155808452600383529281902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000168517905580519384525191927f8440df9bf8a8542634a9eb196da1735b786ed9aa2fc12b080ac34c5fa81a9234929081900390910190a25050565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60036020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b6108496109e2565b73ffffffffffffffffffffffffffffffffffffffff1661086761066d565b73ffffffffffffffffffffffffffffffffffffffff16146108e957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8116610955576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180610aaf6026913960400191505060405180910390fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b3390565b73ffffffffffffffffffffffffffffffffffffffff81166000818152600260208181526040808420805463ffffffff168086526003845282862080547fffffffffffffffffffffffff00000000000000000000000000000000000000001690559486905292825282547fffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000001690925581519384529051919283927fce1533133fb359ace801d3176bbad25ace030d714aed35e38a6293c8a60b115b929181900390910190a2505056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373a264697066735822122030125efac8e982f1ff870f61d08a18f08e505e287ba696334b279da2a95cafc364736f6c63430007060033";

export class XAppConnectionManager__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<XAppConnectionManager> {
    return super.deploy(overrides || {}) as Promise<XAppConnectionManager>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): XAppConnectionManager {
    return super.attach(address) as XAppConnectionManager;
  }
  connect(signer: Signer): XAppConnectionManager__factory {
    return super.connect(signer) as XAppConnectionManager__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): XAppConnectionManagerInterface {
    return new utils.Interface(_abi) as XAppConnectionManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): XAppConnectionManager {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as XAppConnectionManager;
  }
}
