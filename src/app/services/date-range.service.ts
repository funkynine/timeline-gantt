import { Injectable } from '@angular/core';
import moment, { MomentInput } from 'moment-mini';
import { BehaviorSubject, interval } from 'rxjs';
import { debounce, distinctUntilChanged } from 'rxjs/operators';
import { getDateMonth, getMonthDays } from '../utils/date-range.utils';

export enum DateRangeTypes {
  Week,
  Month,
  Quarter,
  Year,
}

export type DateRangeType = DateRangeTypes.Week | DateRangeTypes.Month | DateRangeTypes.Quarter | DateRangeTypes.Year;
export type HeaderItem = {
  name?: string,
  dayOfWeekShort?: string;
  dayOfWeek?: string;
  dayCount?: number;
};

export interface ITimelineData {
  dateRangeType?: DateRangeType;
  userSelectedDate?: MomentInput;
  upperHeaderItems?: Array<HeaderItem>;
  headerItems?: Array<HeaderItem>;
  bodyItems?: Array<number>;
}

@Injectable({
  providedIn: 'root'
})
export class DateRangeService {
  private timelineData = new BehaviorSubject<ITimelineData>({
    dateRangeType: DateRangeTypes.Week,
    userSelectedDate: moment(new Date()),
    upperHeaderItems: [],
    headerItems: [],
    bodyItems: [1],
  });
  timelineData$ = this.timelineData.asObservable();

  constructor() {
    this.timelineData$
      .pipe(
        debounce(() => interval(5)),
        distinctUntilChanged(this.handleCheckPrevDateRange),
      )
      .subscribe(data => this.handleChangeDateRangeType(data));
  }

  emitTimelineData(data: ITimelineData): void {
    this.timelineData.next({...this.timelineData.getValue(), ...data});
  }

  handleChangeDateRangeType(data: ITimelineData): void {
    switch (data.dateRangeType) {
      case DateRangeTypes.Week:
        break;
      case DateRangeTypes.Month:
        const monthDays = getMonthDays(data.userSelectedDate);

        this.emitTimelineData({
          headerItems: monthDays,
          upperHeaderItems: [],
          bodyItems: this.generateBodyItems(monthDays.length),
        });
        break;
      case DateRangeTypes.Quarter:
        break;
      case DateRangeTypes.Year:
        const bodyCount = getDateMonth(data.userSelectedDate).length * getMonthDays(data.userSelectedDate).length;

        this.emitTimelineData({
          upperHeaderItems: getDateMonth(data.userSelectedDate),
          headerItems: getMonthDays(data.userSelectedDate),
          bodyItems:  this.generateBodyItems(bodyCount),
        });
        break;
      default:
        break;
    }
  }

  generateBodyItems(length: number): Array<number> {
    return new Array(length).fill(1);
  }

  handleCheckPrevDateRange(prev: ITimelineData, curr: ITimelineData) {
    return prev.dateRangeType === curr.dateRangeType;
  }
}
