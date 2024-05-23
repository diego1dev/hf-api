// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialWithKeysRequired<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
export type PickWithKeysOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
