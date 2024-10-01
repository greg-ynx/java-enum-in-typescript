// Enum Base Class

export abstract class Enum<E extends Enum<E>> {

    get name(): string {
        return Object.keys(this.constructor)[this.ordinal];
    }

    get ordinal(): number {
        return Object.values(this.constructor).indexOf(this);
    }

    toString(): string {
        return this.name;
    }

    equals(other: unknown): boolean {
        return this === other;
    }

    compareTo(other: E): number {
        return this.ordinal - other.ordinal;
    }

    static valueOf<T extends Enum<T>>(this: T, name: string): T | any {
        const result = this[name as keyof typeof this] as T;
        if (null !== result) {
            return result;
        }
        if (null === name) {
            throw new TypeError('Name is null');
        }
        throw new Error(`No enum constant ${this.constructor.name}.${name}`);
    }

    static values<T extends Enum<T>>(): T[] | any[] {
        return Object.values(this);
    }
}
