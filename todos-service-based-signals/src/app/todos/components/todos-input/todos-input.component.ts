import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todos-input',
  templateUrl: './todos-input.component.html',
  styleUrls: ['./todos-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosInputComponent {
  added = output<string>();

  formControl = new FormControl('', { validators: [Validators.required] });

  submit() {
    this.added.emit(this.formControl.value!);
    this.formControl.reset();
  }
}
