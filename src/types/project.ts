
export interface IProject {
    _id: string,
    name?: string;
    logo: string;
    symbol: string
    amountToRaise: number;
    totalTokenSupply: number;
    minimumBuy: number;
    maximumBuy: number;
    vesting?: number;
    totalRaised: number;
    receiverAddress?: string;
    currentTokenPrice: number;
    listingTokenPrice: number;
    overview: string;
    partners: { name: string, logo: string }[];
    socialMedia: { platform: string, link: string }[];
    publicKey?: string;
    privateKey?: string;
    status?: 'NOT LAUNCHED' | 'PRIVATE' | 'LIVE' | 'DISTRIBUTING' | 'PENDING';
    startDate?: Date;
    endDate?: Date;
    chain?: 'BSC' | 'ETH';
    type: 'ICO' | 'IDO' | 'SEED';
    transactions?: string;
    tokenAddress?: string;
    numberOfBuyer: number;
    numberOfSeller: number;
    fundRaisedInUSDT: number;
    fundRaisedInUSDC: number;
}

