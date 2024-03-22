
export interface IProject {
    name?: string;
    targetAmount?: number;
    tokenSupply?: number;
    minimumBuy?: number;
    maximumBuy?: number;
    vesting?: number;
    amountRaised?: number;
    totalRaised?: number;
    receiverAddress?: string;
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
}

