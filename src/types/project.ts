
export interface IProject {
    _id: string,
    name?: string;
    amountToRaise: number;
    totalTokenSupply: number;
    minimumBuy?: number;
    maximumBuy?: number;
    vesting?: number;
    totalRaised: number;
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

