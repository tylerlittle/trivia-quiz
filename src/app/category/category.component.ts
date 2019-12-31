import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() name: string;
  @Input() selectedCategoryName = '';
  @Output() selectedCategoryEE = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleClick() {
    this.selectedCategoryEE.emit(this.name);
  }

}
