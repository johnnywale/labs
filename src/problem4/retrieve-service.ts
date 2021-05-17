import {ethers} from "ethers";
import {Event} from "@ethersproject/contracts/src.ts/index";

export class ContractInfo {
    public static readonly BSS_PROVIDER_URL: string = "https://bsc-dataseed.binance.org/"

    constructor(
        public readonly contactAddress: string,
        public readonly abi: string,
    ) {
    }
}

export class RetrieveAllHoldersClient {
    private readonly provider: ethers.providers.JsonRpcProvider
    private readonly contract: ethers.Contract
    private readonly processedAddress: Set<string>

    constructor(
        public readonly contractInfo: ContractInfo
    ) {
        this.provider = new ethers.providers.JsonRpcProvider(ContractInfo.BSS_PROVIDER_URL);
        this.contract = new ethers.Contract(contractInfo.contactAddress, contractInfo.abi, this.provider)
        this.processedAddress = new Set<string>();
    }

    /**
     *  get max block number , then iterate all block to get all transfer event , to get holders address and then call balanceOf method from contract to get balance.
     */
    async retrieve(): Promise<void> {
        const max = await this.provider.getBlockNumber();
        const batchSize = 1000;
        console.log(`current block ${max} , max block size ${batchSize} `)
        /**
         * retrieve start from current block , make it faster to see the result
         */
        for (let value = max; value > 0; value -= batchSize) {
            try {
                await this.retrieveBlock(value - batchSize, value)
            } catch (e) {
                /**
                 * skip for now , I added some retry logic issue not pass
                 */
                console.error(e);
            }
        }

    }

    async getFromLatestBlocks() {
        const max = await this.provider.getBlockNumber();
        await this.retrieveBlock(max - 2000, max);
    }

    async retrieveByEvent(event: Event) {
        if (event.args) {
            const addressFrm = event.args[0]
            /**
             *  only print once
             */
            if (!this.processedAddress.has(addressFrm)) {
                const balanceFrom = await this.contract.balanceOf(addressFrm);
                console.log(`${addressFrm}   ${balanceFrom}`)
                this.processedAddress.add(addressFrm)
            }
            const addressTo = event.args[1]
            if (!this.processedAddress.has(addressTo)) {
                const balanceTo = await this.contract.balanceOf(addressTo);
                console.log(`${addressTo}   ${balanceTo}`)
                this.processedAddress.add(addressTo)
            }
        }
    }


    async retrieveBlock(from: number, to: number) {
        console.log(`from ${from} to  ${to} `);
        if (from < 0) {
            from = 0;
        }
        let eventFilter = this.contract.filters.Transfer()
        return this.contract.queryFilter(eventFilter, from, to).then(async value => {
            if (value.length > 0) {
                for (const event of value) {
                    await this.retrieveByEvent(event);
                }
            } else {
                //   console.log("not result");
            }
        })
    }
}

