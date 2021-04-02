import { Component, OnInit } from '@angular/core';

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
          end: 4,
        },
        {
          name: 'Meet with Center',
          start: 5,
          end: 9,
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
          start: 2,
          end: 5,
        },
        {
          name: 'Meet with Lower',
          start: 1,
          end: 7,
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
          start: 9,
          end: 13,
        },
        {
          name: 'Meet with Lower',
          start: 1,
          end: 7,
        }
      ],
      subTopics: [
        {
          title: 'second',
        }
      ]
    },
  ];

  timelineElements = new Array(30).fill({name: 'Mon', digit: 1 });

  ngOnInit() {
    this.getCountElementsTimelineStyles();
  }

  getPositionAndColor(start: number, end: number, background: string) {
    return {
      'grid-column': `${start}/${end}`,
      background,
    };
  }

  getCountElementsTimelineStyles() {
    this.root.style.setProperty('--timelineElements', `${this.timelineElements.length}`);
  }
}
