import { Contract, Signer } from 'ethers';
import abis from '@config/abis';
import { addresses } from '@config/constants';
import { ChainIDs, Contracts } from '@config/types';

export const getAddress = (name: Contracts, chain: ChainIDs) => {
	if (name === 'token') throw 'Contract not supported';
	const address = addresses[name][chain];
	if (!address) throw `Contract ${name} not found`;
	return address;
};

export const getABI = (name: Contracts) => {
	const abi = abis[name];
	if (!abi) throw `Contract ${name} not found`;
	return abi;
};

export const getContract = (
	name: Contracts,
	chain: ChainIDs,
	signer?: Signer,
	address?: string
) => {
	if (name === 'token') {
		if (!address) throw 'Contract not supported';
		return new Contract(address, getABI(name), signer);
	}
	return new Contract(getAddress(name, chain), getABI(name), signer);
};
