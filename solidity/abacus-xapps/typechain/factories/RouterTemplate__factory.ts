/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  RouterTemplate,
  RouterTemplateInterface,
} from "../RouterTemplate";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_xAppConnectionManager",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
        indexed: false,
        internalType: "uint256",
        name: "number",
        type: "uint256",
      },
    ],
    name: "TypeAReceived",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_destinationDomain",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "_number",
        type: "uint256",
      },
    ],
    name: "dispatchTypeA",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_router",
        type: "bytes32",
      },
    ],
    name: "enrollRemoteRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_origin",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_sender",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "handle",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "remotes",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        name: "_xAppConnectionManager",
        type: "address",
      },
    ],
    name: "setXAppConnectionManager",
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
    inputs: [],
    name: "xAppConnectionManager",
    outputs: [
      {
        internalType: "contract XAppConnectionManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200197838038062001978833981810160405260208110156200003757600080fd5b505162000044816200004b565b50620003ac565b600054610100900460ff1680620000675750620000676200011b565b8062000076575060005460ff16155b620000b35760405162461bcd60e51b815260040180806020018281038252602e8152602001806200194a602e913960400191505060405180910390fd5b600054610100900460ff16158015620000df576000805460ff1961ff0019909116610100171660011790555b606580546001600160a01b0319166001600160a01b0384161790556200010462000139565b801562000117576000805461ff00191690555b5050565b60006200013330620001f760201b620009f31760201c565b15905090565b600054610100900460ff1680620001555750620001556200011b565b8062000164575060005460ff16155b620001a15760405162461bcd60e51b815260040180806020018281038252602e8152602001806200194a602e913960400191505060405180910390fd5b600054610100900460ff16158015620001cd576000805460ff1961ff0019909116610100171660011790555b620001d7620001fd565b620001e1620002a5565b8015620001f4576000805461ff00191690555b50565b3b151590565b600054610100900460ff1680620002195750620002196200011b565b8062000228575060005460ff16155b620002655760405162461bcd60e51b815260040180806020018281038252602e8152602001806200194a602e913960400191505060405180910390fd5b600054610100900460ff16158015620001e1576000805460ff1961ff0019909116610100171660011790558015620001f4576000805461ff001916905550565b600054610100900460ff1680620002c15750620002c16200011b565b80620002d0575060005460ff16155b6200030d5760405162461bcd60e51b815260040180806020018281038252602e8152602001806200194a602e913960400191505060405180910390fd5b600054610100900460ff1615801562000339576000805460ff1961ff0019909116610100171660011790555b600062000345620003a8565b603380546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508015620001f4576000805461ff001916905550565b3390565b61158e80620003bc6000396000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c8063715018a6116100765780638da5cb5b1161005b5780638da5cb5b1461022c578063b49c53a714610234578063f2fde38b1461025d576100a3565b8063715018a6146101ef57806383bbb806146101f7576100a3565b80631984a330146100a85780633339df96146100d357806341bdc8b51461010457806356d5d47514610137575b600080fd5b6100d1600480360360408110156100be57600080fd5b5063ffffffff8135169060200135610290565b005b6100db61039a565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6100d16004803603602081101561011a57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166103b6565b6100d16004803603606081101561014d57600080fd5b63ffffffff8235169160208101359181019060608101604082013564010000000081111561017a57600080fd5b82018360208201111561018c57600080fd5b803590602001918460018302840111640100000000831117156101ae57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506104a5945050505050565b6100d161064b565b61021a6004803603602081101561020d57600080fd5b503563ffffffff16610762565b60408051918252519081900360200190f35b6100db610774565b6100d16004803603604081101561024a57600080fd5b5063ffffffff8135169060200135610790565b6100d16004803603602081101561027357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610851565b600061029b836109fd565b905060006102a883610a7f565b90506102b2610ac4565b73ffffffffffffffffffffffffffffffffffffffff1663fa31de018584846040518463ffffffff1660e01b8152600401808463ffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561032e578181015183820152602001610316565b50505050905090810190601f16801561035b5780820380516001836020036101000a031916815260200191505b50945050505050600060405180830381600087803b15801561037c57600080fd5b505af1158015610390573d6000803e3d6000fd5b5050505050505050565b60655473ffffffffffffffffffffffffffffffffffffffff1681565b6103be610b60565b73ffffffffffffffffffffffffffffffffffffffff166103dc610774565b73ffffffffffffffffffffffffffffffffffffffff161461045e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b606580547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6104ae33610b64565b61051957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f217265706c696361000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b82826105258282610c0d565b61059057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f2172656d6f746520726f75746572000000000000000000000000000000000000604482015290519081900360640190fd5b600061059c8482610c2c565b90506105c97fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008216610c50565b156105dc576105d781610c6f565b610643565b604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f2176616c696420616374696f6e00000000000000000000000000000000000000604482015290519081900360640190fd5b505050505050565b610653610b60565b73ffffffffffffffffffffffffffffffffffffffff16610671610774565b73ffffffffffffffffffffffffffffffffffffffff16146106f357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b60335460405160009173ffffffffffffffffffffffffffffffffffffffff16907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b60976020526000908152604090205481565b60335473ffffffffffffffffffffffffffffffffffffffff1690565b610798610b60565b73ffffffffffffffffffffffffffffffffffffffff166107b6610774565b73ffffffffffffffffffffffffffffffffffffffff161461083857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b63ffffffff909116600090815260976020526040902055565b610859610b60565b73ffffffffffffffffffffffffffffffffffffffff16610877610774565b73ffffffffffffffffffffffffffffffffffffffff16146108f957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8116610965576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806114756026913960400191505060405180910390fd5b60335460405173ffffffffffffffffffffffffffffffffffffffff8084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b803b15155b919050565b63ffffffff8116600090815260976020526040902054806109f857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f2172656d6f746500000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b604080517f0100000000000000000000000000000000000000000000000000000000000000602082015260218082019390935281518082039093018352604101905290565b606554604080517f9fa92f9d000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff1691639fa92f9d916004808301926020929190829003018186803b158015610b2f57600080fd5b505afa158015610b43573d6000803e3d6000fd5b505050506040513d6020811015610b5957600080fd5b5051905090565b3390565b606554604080517f5190bc5300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff848116600483015291516000939290921691635190bc5391602480820192602092909190829003018186803b158015610bdb57600080fd5b505afa158015610bef573d6000803e3d6000fd5b505050506040513d6020811015610c0557600080fd5b505192915050565b63ffffffff821660009081526097602052604090205481145b92915050565b815160009060208401610c4764ffffffffff85168284610cd7565b95945050505050565b60006001610c5d83610d38565b6001811115610c6857fe5b1492915050565b6000610c9c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008316610d73565b6040805182815290519192507f2b51a16951b17b51a53e06c3041d704232f26354acf317a5b7bfeab23f4ca629919081900360200190a15050565b600080610ce48484610e02565b9050604051811115610cf4575060005b80610d22577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000915050610d31565b610d2d858585610e74565b9150505b9392505050565b6000610d657fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008316610e87565b60ff166001811115610c2657fe5b6000610d7e82610c50565b610dd3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e81526020018061149b602e913960400191505060405180910390fd5b610c267fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000831660006020610e8d565b81810182811015610c2657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4f766572666c6f7720647572696e67206164646974696f6e2e00000000000000604482015290519081900360640190fd5b606092831b9190911790911b1760181b90565b60d81c90565b600060ff8216610e9f57506000610d31565b610ea884611038565b6bffffffffffffffffffffffff16610ec38460ff8516610e02565b1115610fa257610f04610ed58561104c565b6bffffffffffffffffffffffff16610eec86611038565b6bffffffffffffffffffffffff16858560ff16611060565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610f67578181015183820152602001610f4f565b50505050905090810190601f168015610f945780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b60208260ff161115610fff576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603a8152602001806114ea603a913960400191505060405180910390fd5b60088202600061100e8661104c565b6bffffffffffffffffffffffff1690506000611029836111bb565b91909501511695945050505050565b60181c6bffffffffffffffffffffffff1690565b60781c6bffffffffffffffffffffffff1690565b6060600061106d86611204565b915050600061107b86611204565b915050600061108986611204565b915050600061109786611204565b915050838383836040516020018080611524603591397fffffffffffff000000000000000000000000000000000000000000000000000060d087811b821660358401527f2077697468206c656e6774682030780000000000000000000000000000000000603b84015286901b16604a82015260500160216114c982397fffffffffffff000000000000000000000000000000000000000000000000000060d094851b811660218301527f2077697468206c656e677468203078000000000000000000000000000000000060278301529290931b9091166036830152507f2e00000000000000000000000000000000000000000000000000000000000000603c82015260408051601d818403018152603d90920190529b9a5050505050505050505050565b7f80000000000000000000000000000000000000000000000000000000000000007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9091011d90565b600080601f5b600f8160ff16111561126c5760ff600882021684901c611229816112d8565b61ffff16841793508160ff1660101461124457601084901b93505b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0161120a565b50600f5b60ff8160ff1610156112d25760ff600882021684901c61128f816112d8565b61ffff16831792508160ff166000146112aa57601083901b92505b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01611270565b50915091565b60006112ea60048360ff16901c611308565b60ff161760081b62ffff00166112ff82611308565b60ff1617919050565b600060f08083179060ff821614156113245760309150506109f8565b8060ff1660f1141561133a5760319150506109f8565b8060ff1660f214156113505760329150506109f8565b8060ff1660f314156113665760339150506109f8565b8060ff1660f4141561137c5760349150506109f8565b8060ff1660f514156113925760359150506109f8565b8060ff1660f614156113a85760369150506109f8565b8060ff1660f714156113be5760379150506109f8565b8060ff1660f814156113d45760389150506109f8565b8060ff1660f914156113ea5760399150506109f8565b8060ff1660fa14156114005760619150506109f8565b8060ff1660fb14156114165760629150506109f8565b8060ff1660fc141561142c5760639150506109f8565b8060ff1660fd14156114425760649150506109f8565b8060ff1660fe14156114585760659150506109f8565b8060ff1660ff141561146e5760669150506109f8565b5091905056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734d65737361676554656d706c6174652f6e756d6265723a2076696577206d757374206265206f66207479706520412e20417474656d7074656420746f20696e646578206174206f666673657420307854797065644d656d566965772f696e646578202d20417474656d7074656420746f20696e646578206d6f7265207468616e20333220627974657354797065644d656d566965772f696e646578202d204f76657272616e2074686520766965772e20536c696365206973206174203078a2646970667358221220130f21d662ba9adc524d211b889f6798ca60fb6ae72819ee1e1e1ebfb556226564736f6c63430007060033496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564";

export class RouterTemplate__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _xAppConnectionManager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<RouterTemplate> {
    return super.deploy(
      _xAppConnectionManager,
      overrides || {}
    ) as Promise<RouterTemplate>;
  }
  getDeployTransaction(
    _xAppConnectionManager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_xAppConnectionManager, overrides || {});
  }
  attach(address: string): RouterTemplate {
    return super.attach(address) as RouterTemplate;
  }
  connect(signer: Signer): RouterTemplate__factory {
    return super.connect(signer) as RouterTemplate__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RouterTemplateInterface {
    return new utils.Interface(_abi) as RouterTemplateInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RouterTemplate {
    return new Contract(address, _abi, signerOrProvider) as RouterTemplate;
  }
}
