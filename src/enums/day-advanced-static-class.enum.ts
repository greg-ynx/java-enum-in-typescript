// Advanced Static Class Enum

import {Enum} from '../base/enum.base.ts';

export class DayAdvancedStaticClassEnum extends Enum<DayAdvancedStaticClassEnum> {

    static readonly MONDAY = new DayAdvancedStaticClassEnum('Monday', false);
    static readonly TUESDAY = new DayAdvancedStaticClassEnum('Tuesday', false);
    static readonly WEDNESDAY = new DayAdvancedStaticClassEnum('Wednesday', false);
    static readonly THURSDAY = new DayAdvancedStaticClassEnum('Thursday', false);
    static readonly FRIDAY = new DayAdvancedStaticClassEnum('Friday', false);
    static readonly SATURDAY = new DayAdvancedStaticClassEnum('Saturday', true);
    static readonly SUNDAY = new DayAdvancedStaticClassEnum('Sunday', true);

    private constructor(readonly label: string, readonly isWeekend: boolean) {
        super();
    }

    static valueOf(value: string): DayAdvancedStaticClassEnum {
        return super.valueOf<DayAdvancedStaticClassEnum>(value);
    }

    static values(): DayAdvancedStaticClassEnum[] {
        return super.values<DayAdvancedStaticClassEnum>();
    }
}
