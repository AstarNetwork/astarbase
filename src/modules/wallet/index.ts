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
  // MetaMask = 'metamask',
  Clover = 'clover',
  Math = 'mathwallet',
  Talisman = 'talisman',
  SubWallet = 'subwallet-js',
}

export const WalletModalOption = {
  SelectWallet: 'SelectWallet',
  SelectSubstrateAccount: 'SelectSubstrateAccount',
  NoExtension: 'NoExtension',
  PolkadotJs: SupportWallet.PolkadotJs,
  Clover: SupportWallet.Clover,
  // MetaMask: SupportWallet.MetaMask,
  Math: SupportWallet.Math,
  Talisman: SupportWallet.Talisman,
  SubWallet: SupportWallet.SubWallet,
};

export const SubstrateWallets = [
  SupportWallet.PolkadotJs,
  SupportWallet.Clover,
  SupportWallet.Math,
  SupportWallet.Talisman,
  SupportWallet.SubWallet,
];

export interface Wallet {
  img: any;
  name: string;
  source: SupportWallet;
  walletUrl: string;
  guideUrl: string;
  isSupportBrowserExtension: boolean;
  isSupportMobileApp: boolean;
}

export const supportWalletObj = {
  [SupportWallet.PolkadotJs]: {
    img: require('/src/assets/img/logo-polkadot-js.png'),
    name: 'Polkadot.js',
    source: SupportWallet.PolkadotJs,
    walletUrl: 'https://polkadot.js.org/extension/',
    guideUrl: 'https://www.youtube.com/watch?v=r-fAy7Ta_vY',
    isSupportBrowserExtension: true,
    isSupportMobileApp: false,
  },
  // [SupportWallet.MetaMask]: {
  //   img: require('/src/assets/img/metamask.png'),
  //   name: 'MetaMask',
  //   source: SupportWallet.MetaMask,
  //   walletUrl: 'https://metamask.io/',
  //   guideUrl: 'https://metamask.io/',
  //   isSupportBrowserExtension: true,
  //   isSupportMobileApp: true,
  // },
  [SupportWallet.Clover]: {
    img: require('/src/assets/img/logo-clover.png'),
    name: 'Clover',
    source: SupportWallet.Clover,
    walletUrl: 'https://clover.finance/',
    guideUrl: 'https://docs.clover.finance/quick-start/about-clover',
    isSupportBrowserExtension: true,
    isSupportMobileApp: false,
  },
  [SupportWallet.Talisman]: {
    img: require('/src/assets/img/logo-talisman.svg'),
    name: 'Talisman',
    source: SupportWallet.Talisman,
    walletUrl: 'https://app.talisman.xyz/',
    guideUrl: 'https://app.talisman.xyz/',
    isSupportBrowserExtension: true,
    isSupportMobileApp: false,
  },
  [SupportWallet.Math]: {
    img: require('/src/assets/img/logo-mathwallet.png'),
    name: 'Math Wallet',
    source: SupportWallet.Math,
    walletUrl: 'https://mathwallet.org/en-us/',
    guideUrl: 'https://blog.mathwallet.org/?p=540',
    isSupportBrowserExtension: true,
    isSupportMobileApp: true,
  },
  // [SupportWallet.Nova]: {
  //   img: require('/src/assets/img/logo-nova.png'),
  //   name: 'Nova Wallet',
  //   source: SupportWallet.Nova,
  //   walletUrl: 'https://novawallet.io/',
  //   guideUrl: 'https://novawallet.io/',
  //   isSupportBrowserExtension: false,
  //   isSupportMobileApp: true,
  // },
  [SupportWallet.SubWallet]: {
    img: require('/src/assets/img/logo-subwallet.svg'),
    name: 'SubWallet',
    source: SupportWallet.SubWallet,
    walletUrl: 'https://subwallet.app/',
    guideUrl: 'https://docs.subwallet.app/user-guide/how-to-install-subwallet',
    isSupportBrowserExtension: true,
    isSupportMobileApp: false,
  },
};

// export const supportEvmWalletObj = {
//   [SupportWallet.MetaMask]: {
//     img: require('/src/assets/img/metamask.png'),
//     name: 'MetaMask',
//     source: SupportWallet.MetaMask,
//     walletUrl: 'https://metamask.io/',
//     guideUrl: 'https://metamask.io/',
//     isSupportBrowserExtension: true,
//     isSupportMobileApp: true,
//   },
// };

// export const supportEvmWallets = objToArray(supportEvmWalletObj) as Wallet[];
export const supportWallets = objToArray(supportWalletObj) as Wallet[];
