import { Box, Button, Text } from '@chakra-ui/react';
import { formatEther } from '@ethersproject/units';
import { useEtherBalance, useEthers } from '@usedapp/core';
import Identicon from './Identicon';
import WalletConnectProvider from "@walletconnect/web3-provider";

export default function ConnectButton({ handleOpenModal }: any) {
	const { activateBrowserWallet, account } = useEthers();
	const etherBalance = useEtherBalance(account);
	const provider = new WalletConnectProvider({
          infuraId: "7e792748b1ee47c39ee4593dcf72f518",
        });

        await provider.enable();
	
	function handleConnectWallet() {
		activateBrowserWallet();
	}

	return account ? (
		<Box
			display='flex'
			alignItems='center'
			background='gray.700'
			borderRadius='xl'
			py='0'
		>
			<Box px='3'>
				<Text color='white' fontSize='md'>
					{etherBalance &&
						parseFloat(formatEther(etherBalance)).toFixed(3)}{' '}
					ETH
				</Text>
			</Box>
			<Button
				onClick={handleOpenModal}
				bg='gray.800'
				border='1px solid transparent'
				_hover={{
					border: '1px',
					borderStyle: 'solid',
					borderColor: 'blue.400',
					backgroundColor: 'gray.700',
				}}
				borderRadius='xl'
				m='1px'
				px={3}
				height='38px'
			>
				<Text color='white' fontSize='md' fontWeight='medium' mr='2'>
					{account &&
						`${account.slice(0, 6)}...${account.slice(
							account.length - 4,
							account.length
						)}`}
				</Text>
				<Identicon />
			</Button>
		</Box>
	) : (
		<Button onClick={handleConnectWallet}>Connect with WalletConnect</Button>
	);
}
