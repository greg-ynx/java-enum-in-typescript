// Const Enum

export const DayConstEnum = {
    MONDAY: {label: 'Monday', isWeekend: false},
    TUESDAY: {label: 'Tuesday', isWeekend: false},
    WEDNESDAY: {label: 'Wednesday', isWeekend: false},
    THURSDAY: {label: 'Thursday', isWeekend: false},
    FRIDAY: {label: 'Friday', isWeekend: false},
    SATURDAY: {label: 'Saturday', isWeekend: true},
    SUNDAY: {label: 'Sunday', isWeekend: true}
} as const;

type DayConstEnum = typeof DayConstEnum[keyof typeof DayConstEnum];

export namespace DayConstEnumUtils {
    export function name(day: DayConstEnum): string {
        return Object.keys(DayConstEnum)[DayConstEnumUtils.ordinal(day)];
    }

    export function ordinal(day: DayConstEnum): number {
        return Object.values(DayConstEnum).indexOf(day);
    }

    export function toString(day: DayConstEnum): string {
        return DayConstEnumUtils.name(day);
    }

    export function equals(day: DayConstEnum, other: unknown): boolean {
        return day === other;
    }

    export function compareTo(a: DayConstEnum, b: DayConstEnum): number {
        return DayConstEnumUtils.ordinal(a) - DayConstEnumUtils.ordinal(b);
    }

    export function valueOf(name: string): DayConstEnum {
        const result = DayConstEnum[name as keyof typeof DayConstEnum];
        if (null !== result) {
            return result;
        }
        if (null === name) {
            throw new TypeError('Name is null');
        }
        throw new Error(`No enum constant DayConstEnum.${name}`);
    }

    export function values(): DayConstEnum[] {
        return Object.values(DayConstEnum);
    }
}
