import {
    tokenABI
} from "@/utils/ABI";
import { getAddressByNetwork } from "./helper";
import {
    useReadContract
} from "wagmi";

export const useContractData = (chainName: string, addressName: string[][], userAddress: string) => {
    const contractAddress = getAddressByNetwork(chainName, addressName);
    console.log(contractAddress)


    console.log(contractAddress);
    const { data: tokenBalance } = useReadContract({
        abi: tokenABI.abi,
        // @ts-expect-error: Object is possibly 'null'.
        address: contractAddress,
        functionName: "balanceOf",
        // @ts-expect-error: Object is possibly 'null'.
        args: [userAddress],
    });
    console.log(tokenBalance, "tokenBalance");

    const { data: symbol } = useReadContract({
        abi: tokenABI.abi,
        // @ts-expect-error: Object is possibly 'null'.
        address: contractAddress,
        functionName: "symbol",
    });
    console.log(symbol, "symbol");

    const { data: decimals } = useReadContract({
        abi: tokenABI.abi,
        // @ts-expect-error: Object is possibly 'null'.
        address: contractAddress,
        functionName: "decimals",
    });
    console.log(decimals, "decimals");

    return { tokenBalance, symbol, decimals };
};