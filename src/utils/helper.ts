export function getAddressByNetwork(
    network: string,
    addressType: string[][]
): string | undefined {
    const entry = addressType.find(([key]) => key === network);
    return entry?.[1];
}