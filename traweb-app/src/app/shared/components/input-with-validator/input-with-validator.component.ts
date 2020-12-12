import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidationStep } from './ValidationStep';

@Component({
  selector: 'app-input-with-validator',
  templateUrl: './input-with-validator.component.html',
  styleUrls: ['./input-with-validator.component.css'],
})
export class InputWithValidatorComponent implements OnInit {
  @Input() property: string;
  @Output() propertyChange = new EventEmitter<string>();
  @Input() type = 'text';
  @Input() id: string;
  @Input() header: string;
  @Input() validationSteps: ValidationStep[];

  isValid: boolean;
  comment: string;

  constructor() {}

  ngOnInit(): void {}

  validator(property: string): void {
    this.property = property;
    this.propertyChange.emit(property);
    this.comment = '';
    this.isValid = true;
    for (const validationStep of this.validationSteps) {
      if (validationStep.condition(property)) {
        this.comment += validationStep.comment + ' ';
        this.isValid = false;
      }
    }
  }
}
