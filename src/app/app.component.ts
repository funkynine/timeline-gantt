import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateRangeService, DateRangeTypes } from './services/date-range.service';
import { getMonthsSixYears, getMonthDays, getDateMonth } from './utils/date-range.utils';

enum TimelineCssVariables {
  upperHeader = '--upperHeaderElements',
  headerElements = '--headerElements',
  bodyElements = '--bodyElements',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  root = document.documentElement;
  topics = [
    {
      id: 1,
      title: 'Topic 1',
      color: 'red',
      events: [
        {
          name: 'Meet with Up',
          start: 1,
          end: 20,
        },
        {
          name: 'Meet with Center',
          start: 20,
          end: 40,
        }
      ],
      subTopics: [
        {
          title: 'first',
        }
      ]
    },
    {
      id: 2,
      title: 'Topic 2',
      color: 'green',
      events: [
        {
          name: 'Meet with Down',
          start: 30,
          end: 300,
        },
        {
          name: 'Meet with Lower',
          start: 160,
          end: 320,
        }
      ],
      subTopics: [
        {
          title: 'second',
        }
      ]
    },
    {
      id: 3,
      title: 'Topic 3',
      color: 'black',
      events: [
        {
          name: 'Meet with Down',
          start: 10,
          end: 70,
        },
        {
          name: 'Meet with Lower',
          start: 140,
          end: 220,
        }
      ],
      subTopics: [
        {
          title: 'second',
        }
      ]
    },
  ];

  dateRangeType = new FormControl(1);
  timelineData$ = this.dateRangeService.timelineData$;

  dataSelect = [{name: 'March 2021', id: 0}, {name: 'March 2021 Week 2', id: 1}, {name: 'Q3 2021', id: 2}];

  constructor(
    private dateRangeService: DateRangeService,
  ) {}

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.dataSelect = getMonthsSixYears();
    this.subscriber();
  }

  subscriber(): void {
    this.dateRangeType
      .valueChanges
      .subscribe((dateRangeType: number) => this.dateRangeService.emitTimelineData({dateRangeType}));

    this.timelineData$
      .subscribe(timelineData => {
        console.log('timelineData 4: ', timelineData);
        this.dateRangeType.setValue(timelineData.dateRangeType, {emitEvent: false});

        if (timelineData.headerItems.length && timelineData.dateRangeType === DateRangeTypes.Month) {
          this.setStyleVariables(TimelineCssVariables.headerElements, timelineData.headerItems.length);
          this.setStyleVariables(TimelineCssVariables.bodyElements, timelineData.bodyItems.length);
          this.setStyleVariables(TimelineCssVariables.upperHeader, 0);
        }

        if (timelineData.upperHeaderItems.length && timelineData.dateRangeType === DateRangeTypes.Year) {
          this.setStyleVariables(TimelineCssVariables.upperHeader, timelineData.upperHeaderItems.length);
          this.setStyleVariables(TimelineCssVariables.headerElements, timelineData.headerItems.length);
          this.setStyleVariables(TimelineCssVariables.bodyElements, timelineData.bodyItems.length);
        }
      });
  }

  getPositionAndColor(start: number, end: number, background: string) {
    return {
      'grid-column': `${start}/${end}`,
      background,
    };
  }

  setUserSelectedDate(date: string): void {
    this.dateRangeService.emitTimelineData({userSelectedDate: date});
  }

  setStyleVariables(name: string, value: number): void {
    this.root.style.setProperty(name, `${value}`);
  }

  isUseWrapper(): boolean {
    return this.dateRangeType.value !== DateRangeTypes.Month;
  }
}
