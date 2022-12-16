import { GameType, IBet } from '@config/types';
import BetTile from '../BetTile';
import ProposalTile from '../ProposalTile';

interface IProps {
	bets?: IBet[];
	proposals?: IBet[];
	newBet?: IBet;
	gameType?: GameType;
}

export const BetsList: React.FC<IProps> = ({
	bets,
	proposals,
	newBet,
	gameType = GameType.DICE,
}) => {
	const showRoll = gameType === GameType.DICE;
	return (
		<section>
			<table className='w-full text-left waiting_for_opponents_table border-separate'>
				<thead className='sticky top-0 left-0 w-full bg-dark-hard z-50'>
					<tr className='text-dark-very-soft font-normal'>
						{/* <th className='pl-4 pb-1'>STATUS</th> */}
						<th className='pb-1 pl-7'>PLAYERS</th>
						<th className='pb-1'>BETS</th>
						<th className='pb-1'>VALUE</th>
						{showRoll ? (
							<>
								<th className='pb-1'>ROLLED</th>
								<th className='pb-1 pr-7'>TOTAL</th>
							</>
						) : (
							<th></th>
						)}
					</tr>
					<tr className='h-1.5'></tr>
				</thead>
				<tbody>
					{bets?.map((bet) => (
						<BetTile key={bet.id} bet={bet} showRoll={showRoll} />
					))}
					{proposals?.map((proposal) => (
						<ProposalTile key={proposal.id} proposal={proposal} />
					))}
					{newBet && (
						<BetTile bet={newBet} showEmpty={true} showRoll={showRoll} />
					)}
				</tbody>
			</table>
		</section>
	);
};

export default BetsList;
