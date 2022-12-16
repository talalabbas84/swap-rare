export const API_BASEURL = process.env.NEXT_PUBLIC_API_BASEURL || '';
export const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || '';
export const API_ENDPOINT = `${API_BASEURL}/${API_PREFIX}`;
export const CMC_API_KEY = process.env.NEXT_PUBLIC_CMC_API_KEY || '';

export const MINIMUM_ETH_BET = '10000000000000000';
export const REQUIRED_ETH_FOR_BET = '1000000000000000';
