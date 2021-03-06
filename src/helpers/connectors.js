import { InjectedConnector } from '@web3-react/injected-connector';
import { TorusConnector } from '@web3-react/torus-connector';

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 56, 137, 250, 43114] });

export const torus = new TorusConnector({ chainId: 1, initOptions: {
  showTorusButton: false,
} });