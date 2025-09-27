import { Button } from "@mantine/core"
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'

export const ConnectWalletButton = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      // Use the first available connector (usually injected)
      const connector = connectors[0];
      if (connector) {
        connect({ connector });
      }
    }
  }

  const renderConnectText = () => {
    if (isConnected) {
      const start = address?.slice(0,6);
      const end = address?.slice(address.length-4, address.length);
      return `${start}...${end}`;
    } else {
      return "Connect Wallet";
    }
  }
  
  return (
    <Button onClick={handleClick}>
      { renderConnectText() }
    </Button>
  )
}