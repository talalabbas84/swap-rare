import { GameStatusType } from '@config/types';

export const STATUS_TO_TITLE: { [key in GameStatusType]: string } = {
	[GameStatusType.CREATED]: 'Waiting for Opponent',
	[GameStatusType.ACTIVE]: 'Ongoing',
	[GameStatusType.FINISHED]: 'Ended',
};
export const STATUS_TO_WAGER: { [key in GameStatusType]: string } = {
	[GameStatusType.CREATED]: 'Buy-in',
	[GameStatusType.ACTIVE]: 'Total',
	[GameStatusType.FINISHED]: 'Won',
};
