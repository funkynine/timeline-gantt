import moment, { MomentInput } from 'moment-mini';
import { HeaderItem } from '../services/date-range.service';

export interface DayOfWeek {
  dayOfWeekShort?: string;
  dayOfWeek: string;
  dayCount?: number;
}

export const getMonthDays = (date: MomentInput): Array<HeaderItem> => {
  const firstDay = moment(date).startOf('month').isoWeekday();
  const daysInMonth = moment(date).daysInMonth();
  let daysOfWeek: Array<DayOfWeek> = [];
  let count = firstDay;

  for (let i = 1; i <= daysInMonth; i++) {
    switch (count) {
      case 1:
        daysOfWeek.push({ dayOfWeek: 'Monday', dayCount: i });
        break;
      case 2:
        daysOfWeek.push({ dayOfWeek: 'Tuesday', dayCount: i });
        break;
      case 3:
        daysOfWeek.push({ dayOfWeek: 'Wednesday', dayCount: i });
        break;
      case 4:
        daysOfWeek.push({ dayOfWeek: 'Thursday', dayCount: i });
        break;
      case 5:
        daysOfWeek.push({ dayOfWeek: 'Friday', dayCount: i });
        break;
      case 6:
        daysOfWeek.push({ dayOfWeek: 'Saturday', dayCount: i });
        break;
      case 7:
        daysOfWeek.push({ dayOfWeek: 'Sunday', dayCount: i });
        break;
      default:
        break;
    }

    count++;

    if (count > 7) {
      count = 1;
    }
  }

  // Add week short name
  daysOfWeek = daysOfWeek.map(item => {
    item.dayOfWeekShort = item.dayOfWeek.slice(0, 3);
    return item;
  });

  return daysOfWeek;
};

export const getWeeksThreeYears = (selectedDate: MomentInput) => {
  // TODO: wait answer about 4 or 5 week
  const date = moment(selectedDate);
  const threeYears = new Array(3).fill(1);
  const months = new Array(12).fill(1);
  const result = [];

  date.set('year', date.get('year') - 1);

  threeYears.forEach(() => {
    months.forEach((_, monthNumber) => {
      const month = date.month(monthNumber);
      const first = month.day() === 0 ? 6 : month.day() - 1;
      const day = 7 - first;
      const last = month.daysInMonth();
      const count = (last - day) / 7;

      for (let i = 0; i < count; i++) {
        result.push({ name: `${month.format('MMMM YYYY')} Week ${i + 1}` });
      }
    });

    date.set('year', date.get('year') + 1);
  });

  return result;
};

export const getMonthsSixYears = (selectedDate: MomentInput) => {
  const date = moment(selectedDate);
  const sixYears = new Array(6).fill(1);
  const months = new Array(12).fill(1);
  const result = [];

  date.set('year', date.get('year') - 2);

  sixYears.forEach(() => {
    months.forEach((_, month) => {
      result.push({ name: date.month(month).format('MMMM YYYY') });
    });

    date.set('year', date.get('year') + 1);
  });

  return result;
};

export const getDateMonth = (selectedDate: MomentInput): Array<HeaderItem> => {
  const date = moment(selectedDate);
  const sixYears = new Array(1).fill(1);
  const months = new Array(12).fill(1);
  const result = [];

  sixYears.forEach(() => {
    months.forEach((_, month) => {
      result.push({ name: date.month(month).format('MMMM YYYY') });
    });

    date.set('year', date.get('year') + 1);
  });

  return result;
};


export const getQuarterSixYears = (selectedDate: MomentInput) => {
  const date = moment(selectedDate);
  const sixYears = new Array(6).fill(1);
  const months = [1, 4, 7, 10];
  const result = [];

  date.set('year', date.get('year') - 2);

  sixYears.forEach(() => {
    months.forEach(month => {
      result.push({ name: 'Q' + date.month(month).format('Q YYYY') });
    });

    date.set('year', date.get('year') + 1);
  });

  return result;
};

export const getSixYears = (selectedDate: MomentInput) => {
  const date = moment(selectedDate);
  const sixYears = new Array(6).fill(1);
  const result = [];

  date.set('year', date.get('year') - 2);

  sixYears.forEach(() => {
    result.push({ name: date.year() });
    date.set('year', date.get('year') + 1);
  });

  return result;
};
