
export interface IEcsEventHandler<T> {
    (event: T): void;
}
