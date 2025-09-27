import '@/styles/globals.css'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';

// Create a client for React Query
const queryClient = new QueryClient()

// Configure wagmi with Sepolia testnet (Goerli is deprecated)
const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    metaMask(),
    safe(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your-project-id',
    }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
})

export default function App({ Component, pageProps }: AppProps) {
  // We'll be using Wagmi sending our transaction and Mantine for CSS 
  // and notifications
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <Notifications />
          <Component {...pageProps} />
        </MantineProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
