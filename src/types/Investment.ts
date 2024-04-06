export type Investment = {
    _id: string;
    investorAddress: string;
    investedAmount: number;
    boughtAmount: number;
    projectID: string;
    saleStatus: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    askAmount: number;
};