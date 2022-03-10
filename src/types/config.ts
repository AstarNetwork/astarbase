export type Config = {
  mintContractAddress: string;
  astarBaseContractAddress: string;
  network: {
    name: string;
    symbol: string;
    id: number;
    decimals: number;
    rpcUrl: string;
    blockExplorerUrl: string;
  };
};
