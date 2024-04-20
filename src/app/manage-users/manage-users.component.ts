import { Component } from '@angular/core';
import { UserInterface } from '../user-interface';
import { FormArray, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { emailFormatValidator } from '../user/validators';
import { UserServiceService } from '../user-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog'
import { Dailog1Component } from '../dailog1/dailog1.component';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css',],
})
export class ManageUsersComponent {
  addUserForm!: FormGroup;
  userFormGroup!: FormGroup;
  usersData: UserInterface[] = [];
  duplicateRegistrationError: boolean = false;

  

  constructor(
    private dialog : MatDialog,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private UserServiceService: UserServiceService,
  ) {
    this.initializeForms();
  }

  ngOnInit() {
    this.getAllUsers();
  }

  initializeForms(): void {
    this.addUserForm = this.formBuilder.group({
      userregistration: ['', Validators.required],
      username: ['', Validators.required],
      useremail: ['', [Validators.required, emailFormatValidator()]],
      usermobile: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('[0-9]*'),
        ],
      ],
      isEditing: [false],
      id: ['']
    });
    
    this.userFormGroup = this.formBuilder.group({
      users: this.formBuilder.array([]), // Initialize an empty FormArray
    });
  }

  addUser(user: UserInterface): void {
    const existingUserIndex = this.users.controls.findIndex(
      (userGroup) => userGroup.get('id')?.value === user.id
    );
    if (existingUserIndex !== -1) {
      const existingUserFormGroup = this.users.controls[existingUserIndex] as FormGroup;
      existingUserFormGroup.patchValue(user); 
    } else {
      const userFormGroup = this.formBuilder.group({
        userregistration: [user.userregistration, Validators.required],
        username: [user.username, Validators.required],
        useremail: [user.useremail, [Validators.required, emailFormatValidator()]],
        usermobile: [user.usermobile, [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/^\d{10}$/)]],
        isEditing: [false],
        id: [user.id]
      });
  
      // this.users.push(userFormGroup);

      const insertionIndex = this.users.controls.findIndex(
        (userGroup) => userGroup.get('userregistration')?.value.localeCompare(user.userregistration) > 0
      );
      if (insertionIndex !== -1) {
        this.users.insert(insertionIndex, userFormGroup);
      } else {
        this.users.push(userFormGroup);
      }
      console.log('User added:', user);
    }
  }
  // addUser(user: UserInterface): void {
  //   const userFormGroup = this.formBuilder.group({
  //     userregistration: [user.userregistration, Validators.required],
  //     username: [user.username, Validators.required],
  //     useremail: [user.useremail, [Validators.required, emailFormatValidator()]],
  //     usermobile: [user.usermobile,[  Validators.required,  Validators.maxLength(10),  Validators.minLength(10),  Validators.pattern(/^\d{10}$/)]],
  //     isEditing: [false],
  //     id: [user.id]
  //   })    
  //   this.users.push(userFormGroup);
  // }

  getAllUsers(): void {
    this.UserServiceService.getAllUsers().subscribe((data) => {
      this.usersData = data;
      this.usersData.forEach(user => {
        this.addUser(user)
      })
    });
  }

  toggleEdit(userGroup: any, index: number, value: boolean): void {
    userGroup.controls['isEditing'].setValue(value)
  }

  get users() {
    return this.userFormGroup.get('users') as FormArray;
  }

  // ===================

  updateData(user: UserInterface) {
    console.log("Update data compo");
    
    const newData: Partial<UserInterface>= {
      username : user.username,
      useremail : user.useremail,
      usermobile : user.usermobile
    }

    this.toastr.success('User data updated successfully!', 'Success');
    return this.UserServiceService.updateUserData(user.id, newData)

  }

  addUserData() {
    console.log('Add User Component');
    const userData: UserInterface = this.addUserForm.value;
    this.UserServiceService.addUser(userData).subscribe(
      () => {
        console.log('User added successfully');
        this.addUserForm.reset();
        this.duplicateRegistrationError = false;
      },
      (error) => {
        console.error('Error adding user:', error);
        this.duplicateRegistrationError = true;
      }
    );
    this.toastr.success('SuccessFully Added User');
    // this.toastr.show('success', 'SuccessFully Added User!')
  }

  deleteUser(id: string) {
    const index = this.users.controls.findIndex((userGroup) => userGroup.get('id')?.value === id);
    if (index !== -1)
      this.users.removeAt(index)
    this.toastr.success('User deleted successfully!', 'Success');

    this.UserServiceService.deleteUser(id);
  } 
  
  openDailog(id : string){
  // this.dailog.open(Dailog1Component)
  const dialogRef = this.dialog.open(Dailog1Component);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // User clicked "Delete"
      this.deleteUser(id); // Call your delete method here
    }
  });
  } 
}
