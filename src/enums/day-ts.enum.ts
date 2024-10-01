// Basic TypeScript Enum

export enum DayTSEnum {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY'
}

export interface DayTSInterface {
    label: string;
    isWeekend: boolean;
}

const dayTSRecord: Record<DayTSEnum, DayTSInterface> = {
    [DayTSEnum.MONDAY]: {label: 'Monday', isWeekend: false},
    [DayTSEnum.TUESDAY]: {label: 'Tuesday', isWeekend: false},
    [DayTSEnum.WEDNESDAY]: {label: 'Wednesday', isWeekend: false},
    [DayTSEnum.THURSDAY]: {label: 'Thursday', isWeekend: false},
    [DayTSEnum.FRIDAY]: {label: 'Friday', isWeekend: false},
    [DayTSEnum.SATURDAY]: {label: 'Saturday', isWeekend: true},
    [DayTSEnum.SUNDAY]: {label: 'Sunday', isWeekend: true}
};

export namespace DayTSEnumUtils {
    export function label(day: DayTSEnum): string {
        return dayTSRecord[day].label;
    }

    export function isWeekend(day: DayTSEnum): boolean {
        return dayTSRecord[day].isWeekend;
    }

    export function name(day: DayTSEnum): string {
        return day;
    }

    export function ordinal(day: DayTSEnum): number {
        return Object.keys(DayTSEnum).indexOf(day);
    }

    export function toString(day: DayTSEnum): string {
        return DayTSEnumUtils.name(day);
    }

    export function equals(day: DayTSEnum, other: unknown): boolean {
        return day === other;
    }

    export function compareTo(a: DayTSEnum, b: DayTSEnum): number {
        return DayTSEnumUtils.ordinal(a) - DayTSEnumUtils.ordinal(b);
    }

    export function valueOf(name: string): DayTSEnum {
        const result = DayTSEnum[name as keyof typeof DayTSEnum];
        if (null !== result) {
            return result;
        }
        if (null === name) {
            throw new TypeError('Name is null');
        }
        throw new Error(`No enum constant DayTSEnum.${name}`);
    }

    export function values(): DayTSEnum[] {
        return Object.values(DayTSEnum);
    }
}
