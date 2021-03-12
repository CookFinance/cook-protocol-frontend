import { TransactionReceipt } from "@ethersproject/abstract-provider/lib/index";
import { FUND_MODULES } from "config/constants";
import { BigNumber, Contract, Wallet, ethers } from "ethers";
import { Maybe } from "types";
import { getLogger } from "utils/logger";

const logger = getLogger("Services::Erc20");

const factoryAbi = [
  "function create(address[] memory _components,int256[] memory _units,address[] memory _modules,address _manager,string memory _name,string memory _symbol) external returns (address)",
  "function controller() external view returns (string)",
];

class FactoryService {
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
        factoryAbi,
        provider
      ).connect(signer);
    } else {
      this.contract = new ethers.Contract(tokenAddress, factoryAbi, provider);
    }
  }

  get address(): string {
    return this.contract.address;
  }

  /**
   * create fund
   */
  createFund = async (
    components: string[],
    units: BigNumber[],
    manager: string,
    name: string,
    symbol: string
  ): Promise<TransactionReceipt> => {
    const transactionObject = await this.contract.create(
      components,
      units,
      FUND_MODULES,
      manager,
      name,
      symbol,
      {
        value: "0x0",
      }
    );
    logger.log(`create transaccion hash: ${transactionObject.hash}`);
    return this.provider.waitForTransaction(transactionObject.hash);
  };

  getController = async (): Promise<string> => {
    return this.contract.controller();
  };
}

export { FactoryService };
