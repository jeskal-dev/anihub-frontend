export const getEntries = <K, V>(obj: Record<keyof K,V>) => {
	return Object.entries(obj) as [keyof K, V][];
};
