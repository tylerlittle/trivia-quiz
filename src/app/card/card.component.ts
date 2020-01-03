import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() name: string;
  @Input() selectedCardName = '';
  @Output() selectedCardEE = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  // public methods
  handleClick(): void {
    this.selectedCardEE.emit(this.name);
  }
}
