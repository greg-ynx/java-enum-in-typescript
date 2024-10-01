// Static Class Enum

export class DayStaticClassEnum {

    static readonly MONDAY = new DayStaticClassEnum('Monday', false);
    static readonly TUESDAY = new DayStaticClassEnum('Tuesday', false);
    static readonly WEDNESDAY = new DayStaticClassEnum('Wednesday', false);
    static readonly THURSDAY = new DayStaticClassEnum('Thursday', false);
    static readonly FRIDAY = new DayStaticClassEnum('Friday', false);
    static readonly SATURDAY = new DayStaticClassEnum('Saturday', true);
    static readonly SUNDAY = new DayStaticClassEnum('Sunday', true);

    private constructor(readonly label: string, readonly isWeekend: boolean) {
    }

    get name(): string {
        return Object.keys(DayStaticClassEnum)[this.ordinal];
    }

    get ordinal(): number {
        return Object.values(DayStaticClassEnum).indexOf(this);
    }

    toString(): string {
        return this.name;
    }

    equals(other: unknown): boolean {
        return this === other;
    }

    compareTo(other: DayStaticClassEnum): number {
        return this.ordinal - other.ordinal;
    }

    static valueOf(name: string): DayStaticClassEnum {
        const result = DayStaticClassEnum[name as keyof typeof DayStaticClassEnum] as DayStaticClassEnum;
        if (null !== result) {
            return result;
        }
        if (null === name) {
            throw new TypeError('Name is null');
        }
        throw new Error(`No enum constant DayStaticClassEnum.${name}`);
    }

    static values(): DayStaticClassEnum[] {
        return Object.values(DayStaticClassEnum);
    }
}
