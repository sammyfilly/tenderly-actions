/**
 * Function must implement ActionFn. Event payload depends on a configured trigger.
 */
export type ActionFn = (ctx: Context, event: Event) => Promise<any>;

/**
 * Event provided to function depends on a configured trigger.
 */
export interface Event { }

/**
 * For trigger type "periodic"
 */
export interface PeriodicEvent extends Event {
    /**
     * Time when this periodic event is created.
     */
    time: Date;
}

/**
 * For trigger type "webhook"
 */
export interface WebhookEvent extends Event {
    /**
     * Time when webhook required is received.
     */
    time: Date;

    /**
     * JSON-body of POST request.
     */
    payload: any;
}

/**
 * For actions triggered by extensions.
 */
export type ExtensionEvent = any[]

/**
 * For trigger type "block
 */
export interface BlockEvent extends Event {
    /**
     * Chain identifier.
     */
    network: string;

    blockHash: string;
    blockNumber: number;
    blockDifficulty: string;
    totalDifficulty: string;
}

export interface TransactionEvent extends Event {
    /**
     * Chain identifier.
     */
    network: string;

    blockHash: string;
    blockNumber: number;

    /**
     * Transaction hash.
     */
    hash: string;

    /**
     * @deprecated Use hash instead.
     */
    transactionHash: string;

    from: string;
    to?: string;

    logs: Log[];

    /**
     * Hex encoded.
     */
    input: string;
    value: string;
    nonce: string;
    gas: string;
    gasUsed: string
    cumulativeGasUsed: string;
    gasPrice: string;
    gasTipCap: string;
    gasFeeCap: string;

    /**
     * If event was created from alert.
     */
    alertId?: string
}

/**
 * Alert type is deprecated. This is for back-compat.
 */
export interface AlertEvent extends TransactionEvent { }

export interface Log {
    /**
     * Hex-encoded address.
     */
    address: string;
    /**
     * Hex-encoded topics.
     */
    topics: string[];
    /**
     * Hex-encoded data.
     */
    data: string;
}

export interface Context {
    /**
     * Project's key-value store.
     */
    readonly storage: Storage;

    /**
     * Project's secrets.
     */
    readonly secrets: Secrets;

    /**
     * Project's gateways.
     */
    readonly gateways: Gateways;

    /**
     * Execution metadata.
     */
    readonly metadata: Metadata;
}

export interface Secrets {
    /**
     * Gets secret with key or throws if secret does not exist.
     */
    get(key: string): Promise<string>;
}

export interface Storage {
    /**
     * Gets storage entry.
     */
    getStr(key: string): Promise<string>;
    getNumber(key: string): Promise<number>
    getBigInt(key: string): Promise<bigint>;
    getJson(key: string): Promise<any>;

    /**
     * Writes storage entry.
     */
    putStr(key: string, value: string): Promise<void>;
    putNumber(key: string, value: number): Promise<void>;
    putBigInt(key: string, value: bigint): Promise<void>;
    putJson(key: string, value: any): Promise<void>;

    /**
     * Deletes storage entry.
     */
    delete(key: string): Promise<void>;
}

export interface Gateways {
    /**
     * Creates gateway provider (name param is reserved for future use)
     */
    getGateway(network?: GatewayNetwork, name?: string): string;
}

export interface Metadata {
    /**
     * Gets network of the current execution.
     * If current execution doesn't happen in a context of a network, returns undefined.
     */
    getNetwork(): Network | undefined;
}

/**
 * Networks supported by Web3 Actions
 */
export enum Network {
    MAINNET = "mainnet",
    KOVAN = "kovan",
    ROPSTEN = "ropsten",
    RINKEBY = "rinkeby",
    GOERLI = "goerli",
    SEPOLIA = "sepolia",
    RSK = "rsk",
    RSK_TESTNET = "rsk-testnet",
    BSC = "bsc",
    BSC_TESTNET = "bsc-testnet",
    POA = "poa",
    GNOSIS_CHAIN = "gnosis-chain",
    POLYGON = "polygon",
    MUMBAI = "mumbai",
    OPTIMISTIC = "optimistic",
    OPTIMISTIC_KOVAN = "optimistic-kovan",
    OPTIMISTIC_GOERLI = "optimistic-goerli",
    ARBITRUM = "arbitrum",
    ARBITRUM_GOERLI = "arbitrum-goerli",
    AVA = "ava",
    FUJI = "fuji",
    FANTOM = "fantom",
    FANTOM_TESTNET = "fantom-testnet",
    CRONOS = "cronos",
    CRONOS_TESTNET = "cronos-testnet",
    BOBA_GOERLI = "boba-goerli",
    BOBA_ETHEREUM = "boba-ethereum",
    BOBA_MOONBEAM = "boba-moonbeam",
    BOBA_BINANCE = "boba-binance",
    BOBA_AVALANCHE = "boba-avalanche",
    BOBA_AVALANCHE_FUJI = "boba-avalanche-fuji",
    BOBA_BINANCE_RIALTO = "boba-binance-rialto",
    BOBA_MOONBASE = "boba-moonbase"
}

/**
 * Networks supported by Web3 Gateways
 */
export type GatewayNetwork = Extract<Network,
    Network.BOBA_ETHEREUM |
    Network.MAINNET |
    Network.GOERLI |
    Network.SEPOLIA |
    Network.POLYGON |
    Network.MUMBAI>
