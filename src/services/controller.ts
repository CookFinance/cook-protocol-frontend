import { BigNumber, Contract, Wallet, ethers } from "ethers";
import { Maybe } from "types";
import { getLogger } from "utils/logger";

const logger = getLogger("Services::Controller");

const controllerAbi = [
  "function feeRecipient() external view returns (address)",
  "function getFactories() external view returns (address[] memory)",
  "function getModules() external view returns (address[] memory)",
  "function getResources() external view returns (address[] memory)",
  "function getSets() external view returns (address[] memory)",
  "function owner() external view returns (address)",
  "function isSystemContract(address _contractAddress) external view returns (bool)",
  "function getModuleFee(address _moduleAddress,uint256 _feeType) external view returns (uint256)",
  "function addFactory(address _factory) external onlyInitialized onlyOwner",
  "function addFee(address _module, uint256 _feeType, uint256 _newFeePercentage) external onlyInitialized onlyOwner",
  "function addModule(address _module) external onlyInitialized onlyOwner",
  "function addResource(address _resource, uint256 _id) external onlyInitialized onlyOwner",
  "function addSet(address _setToken) external onlyInitialized onlyFactory",
  "function editFee(address _module, uint256 _feeType, uint256 _newFeePercentage) external onlyInitialized onlyOwner",
  "function editFeeRecipient(address _newFeeRecipient) external onlyInitialized onlyOwner",
  "function initialize(address[] memory _factories,address[] memory _modules,address[] memory _resources,uint256[] memory _resourceIds) external onlyOwner",
  "function removeFactory(address _factory) external onlyInitialized onlyOwner",
  "function removeModule(address _module) external onlyInitialized onlyOwner",
  "function removeResource(uint256 _id) external onlyInitialized onlyOwner",
  "function removeSet(address _setToken) external onlyInitialized onlyOwner",
  "function transferOwnership(address newOwner) public virtual onlyOwner",
];

class ControllerService {
  provider: any;
  contract: Contract;

  constructor(
    provider: any,
    signerAddress: Maybe<string>,
    tokenAddress: string
  ) {
    this.provider = provider;
    if (signerAddress) {
      const signer: Wallet = provider.getSigner();
      this.contract = new ethers.Contract(
        tokenAddress,
        controllerAbi,
        provider
      ).connect(signer);
    } else {
      this.contract = new ethers.Contract(
        tokenAddress,
        controllerAbi,
        provider
      );
    }
  }

  get address(): string {
    return this.contract.address;
  }

  /**
   * get Factory addreses
   */
  getFactories = async (index: BigNumber): Promise<string> => {
    return this.contract.factories(index);
  };

  /**
   * get FeeRecipient address
   */
  getFeeRecipient = async (): Promise<string> => {
    return this.contract.feeRecipient();
  };
}

export { ControllerService };
