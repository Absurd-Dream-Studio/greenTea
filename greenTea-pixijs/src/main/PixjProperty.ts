export class PixiProperty<T> {
    private _value: T;
    private changed: boolean = true;

    constructor(value: T) {
        this._value = value;
    }

    get(): T {
        return this._value;
    }

    set(value: T) {
        const sameObj = Object.is(this._value, value);

        if (!this.changed) {
            this.changed = !sameObj;
        }
        this._value = value;
    }

    isChanged(): boolean {
        return this.changed;
    }

    setChanged(changed: boolean) {
        this.changed = changed;
    }
}