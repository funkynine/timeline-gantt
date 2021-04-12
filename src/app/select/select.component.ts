import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent{
  @Input() items: Array<{name: string}>;
  @Input() defaultItem = 0;
  @Input() typeRange: 'month' | 'week' | 'year';
  @Output() emitValue = new EventEmitter<string>();

  changeValue({value}): void {
    this.emitValue.emit(value);
  }
}
