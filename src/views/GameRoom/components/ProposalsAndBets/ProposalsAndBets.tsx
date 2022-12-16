import { GameType, IBet } from '@config/types';
import { useBalanceSelection, useGame, useWallet } from '@hooks';
import BetsList from '../BetsList';

interface IProps {
	gameType?: GameType;
}

export const ProposalsAndBets: React.FC<IProps> = ({
	gameType = GameType.DICE,
}) => {
	const { account } = useWallet();
	const { game, bets, proposals } = useGame();
	const { selectedNFTs, ethSelected, eth } = useBalanceSelection();

	const isAccepted = !!game?.selectedProposal;
	const isCreator = game?.player1 === account;
	const userProposal = proposals.find((p) => p.player === account);
	const newBet: IBet | undefined =
		isAccepted || isCreator
			? undefined
			: userProposal || {
					id: '',
					type: 'nft_eth',
					player: account || '',
					ethAmount: ethSelected ? eth.toString() : '0',
					nftAssets: selectedNFTs,
			  };
	return (
		<>
			<BetsList
				bets={bets}
				proposals={isCreator && !isAccepted ? proposals : undefined}
				newBet={newBet}
				gameType={gameType}
			/>
		</>
	);
};

export default ProposalsAndBets;
