export const formatAccountAddress = (account?: string) => {
	return `${account?.substring(0, 6)}...${account?.substr(
		account?.length - 4
	)}`;
};
export const formatUserAddress = (account?: string) => {
	return `${account?.substring(0, 3)}...${account?.substr(
		account?.length - 3
	)}`;
};
