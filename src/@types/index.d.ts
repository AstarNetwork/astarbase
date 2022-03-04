import { EthereumProvider } from 'src/config/web3';

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
