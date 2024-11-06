
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnakBarService } from '../../Services/mat-snak-bar.service';
import { UserService } from '../../Services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Portal } from '@angular/cdk/portal';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatSnackBarModule,
    FormsModule,
  ],
  templateUrl: './user-form.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  registerForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<UserFormComponent>,
    private _snackBar: MatSnakBarService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.registerForm = this._fb.group({

      department: new FormControl ('', Validators.required),
      name: '',
      mobile: '',
      email: '',
      doj: '',
      gender: '',
      salary: '',
      usercode: '',
      status: '',

    });
  }
  ngOnInit() {
    this.registerForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.registerForm.valid) {
      // console.log('Form Values:', this.registerForm.value);
      if (this.data) {
        this._userService.updateUser(this.data.id, this.registerForm.value).subscribe(res => {
          this._snackBar.openSnackBar('User Updated Successfully!', 'Done');
          this._dialogRef.close(true);

        })
      }
      else {
        console.log(this.registerForm.value)
        this._userService.addUser(this.registerForm.value).subscribe(res => {
          this._snackBar.openSnackBar('User Added Successfully!', 'Done');
          this._dialogRef.close(true);

        })
      }

    }
  }

}