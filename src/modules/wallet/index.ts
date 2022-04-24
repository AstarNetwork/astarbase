import { objToArray } from 'src/modules/common';

export {
  getInjectedExtensions,
  getSelectedAccount,
  getInjector,
  isMobileDevice,
  getEvmProvider,
} from './utils';

export enum SupportWallet {
  PolkadotJs = 'polkadot-js',
  Clover = 'clover',
  Math = 'mathwallet',
  Talisman = 'talisman',
  SubWallet = 'subwallet-js',
  NovaWallet = 'novawallet',
}

export const WalletModalOption = {
  SelectWallet: 'SelectWallet',
  SelectSubstrateAccount: 'SelectSubstrateAccount',
  NoExtension: 'NoExtension',
  PolkadotJs: SupportWallet.PolkadotJs,
  Clover: SupportWallet.Clover,
  Math: SupportWallet.Math,
  Talisman: SupportWallet.Talisman,
  SubWallet: SupportWallet.SubWallet,
  NovaWallet: SupportWallet.NovaWallet,
};

export const SubstrateWallets = [
  SupportWallet.PolkadotJs,
  SupportWallet.Clover,
  SupportWallet.Math,
  SupportWallet.Talisman,
  SupportWallet.SubWallet,
  SupportWallet.NovaWallet,
];

export interface Wallet {
  img: any;
  name: string;
  source: SupportWallet;
  walletUrl: string;
  guideUrl: string;
}

export const supportWalletObj = {
  [SupportWallet.PolkadotJs]: {
    img: require('/src/assets/img/logo-polkadot-js.png'),
    name: 'Polkadot.js',
    source: SupportWallet.PolkadotJs,
    walletUrl: 'https://polkadot.js.org/extension/',
    guideUrl: 'https://www.youtube.com/watch?v=r-fAy7Ta_vY',
  },
  [SupportWallet.Clover]: {
    img: require('/src/assets/img/logo-clover.png'),
    name: 'Clover',
    source: SupportWallet.Clover,
    walletUrl: 'https://clover.finance/',
    guideUrl: 'https://docs.clover.finance/quick-start/about-clover',
  },
  [SupportWallet.Talisman]: {
    img: require('/src/assets/img/logo-talisman.svg'),
    name: 'Talisman',
    source: SupportWallet.Talisman,
    walletUrl: 'https://app.talisman.xyz/',
    guideUrl: 'https://app.talisman.xyz/',
  },
  [SupportWallet.Math]: {
    img: require('/src/assets/img/logo-mathwallet.png'),
    name: 'Math Wallet',
    source: SupportWallet.Math,
    walletUrl: 'https://mathwallet.org/en-us/',
    guideUrl: 'https://blog.mathwallet.org/?p=540',
  },
  [SupportWallet.SubWallet]: {
    img: require('/src/assets/img/logo-subwallet.svg'),
    name: 'SubWallet',
    source: SupportWallet.SubWallet,
    walletUrl: 'https://subwallet.app/',
    guideUrl: 'https://docs.subwallet.app/user-guide/how-to-install-subwallet',
  },
  [SupportWallet.NovaWallet]: {
    img: require('/src/assets/img/logo-novawallet.png'),
    name: 'Nova Wallet',
    source: SupportWallet.NovaWallet,
    walletUrl: 'https://novawallet.io/',
    guideUrl: 'https://novawallet.io/',
  },
};

export const supportWallets = objToArray(supportWalletObj) as Wallet[];
