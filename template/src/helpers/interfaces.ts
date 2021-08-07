export type Modify<T, R> = Omit<T, keyof R> & R;
export type KeyOf<T extends object> = Extract<keyof T, string>;
