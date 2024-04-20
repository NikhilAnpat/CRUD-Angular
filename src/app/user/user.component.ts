 
 import { Component, OnInit } from '@angular/core';
  import { FormBuilder , FormControl , FormArray , FormGroup, Validators} from '@angular/forms'
  import { UserInterface } from '../user-interface'; 
  import { UserServiceService } from '../user-service.service';
  import { emailFormatValidator } from './validators';
  import { map, catchError } from 'rxjs/operators';


  @Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
  })
  export class UserComponent implements OnInit {
    userForm: FormGroup
    userData!: UserInterface
    users:UserInterface[]=[]
    duplicateRegistrationError: boolean = false
    searchQuery: string = ''
    filteredUsers: UserInterface[] = []

    tableForm: FormGroup;

    constructor(private formBuilder: FormBuilder ,private  UserServiceService : UserServiceService){
      this.userForm = this.formBuilder.group({
        userregistration: ['', Validators.required ,], 
        username: ['' , Validators.required],
        useremail: ['' ,[Validators.required , emailFormatValidator()]],
        usermobile: ['' , [Validators.required ,Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/^\d{10}$/)]]
    });

    this.tableForm = this.formBuilder.group({
      userregistration: ['', Validators.required ,], 
      username: ['' , Validators.required],
      useremail: ['' ,[Validators.required , emailFormatValidator()]],
      usermobile: ['' , [Validators.required ,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[0-9]*')]]
    })

    this.UserServiceService.getAllUsers().subscribe((data) => {
      this.users = data;
    })

    
    }


    onSubmit() {
      if (this.userForm.valid) {
        console.log(this.userForm.value);
      } else {
        this.userForm.markAllAsTouched();
      }
    }

    ngOnInit() {
      console.log('Show data component');
      // this.UserServiceService.getAllUsers().subscribe((users) => {
      //   console.log('Data fetched successfully:', users);
      //   this.users = users;
      //   this.filteredUsers = users;
      //   console.log(this.userForm.valid)

      // });
    }

    // addUser() {
    //   console.log("Add User Component")
    //   const userData: UserInterface = this.userForm.value
    //   console.log("Data", userData)
    //   this.UserServiceService.addUser(userData)
    //   this.userForm.reset()  
    // }

    addUser() {
      console.log("Add User Component");
      const userData: UserInterface = this.userForm.value;
      console.log("Data", userData);
    
      this.UserServiceService.addUser(userData).subscribe(
        () => {
          console.log('User added successfully');
          this.userForm.reset();
          this.duplicateRegistrationError = false; 
        },
        error => {
          console.error('Error adding user:', error);
          this.duplicateRegistrationError = true; 
        }
      );
    }


    deleteUser(id: string) {
      console.log('Delete User Component')
      this.UserServiceService.deleteUser(id)
    }

    toggleEdit(user: UserInterface) {
      user.isEditing = !user.isEditing;
      if (user.isEditing) {
        this.tableForm.patchValue({
          userregistration: user.userregistration,
          username: user.username,
          useremail: user.useremail,
          usermobile: user.usermobile
        });
      } else {
        this.tableForm.reset(); // Reset the form when cancelling edit
      }
    }
    

    //UserServiceService
    
    updateData(user: UserInterface) {
      const updatedData: Partial<UserInterface> = {
        username: this.tableForm.get('username')?.value,
        useremail: this.tableForm.get('useremail')?.value,
        usermobile: this.tableForm.get('usermobile')?.value
      };
    
      this.UserServiceService.updateUserData(user.id, updatedData).subscribe(
        () => {
          console.log('User data updated successfully');
          this.toggleEdit(user); // Exit edit mode after successful update
        },
        error => {
          console.error('Error updating user data:', error);
          // Handle error if needed
        }
      );
    }
    
    
    
    
    
    

    // updateData(user: UserInterface) {
    //   console.log('Update data component')
    //   if (user.id) {
    //     const userDataWithoutEditingProp: Partial<UserInterface> = {
    //       userregistration: user.userregistration,
    //       username: user.username,
    //       useremail: user.useremail,
    //       usermobile: user.usermobile,
    //     };
    //     this.UserServiceService.updateUserData(
    //       user.id,
    //       userDataWithoutEditingProp
    //     )
    //   } else {
    //     console.error('User ID is undefined, cannot update data.');
    //   }
    // }
       
    search() {
      const query = this.searchQuery.trim().toLowerCase(); 
      if (query === '') {
        this.filteredUsers = [];
      } else {
        this.filteredUsers = this.users.filter(user =>
          user.userregistration.toLowerCase().includes(query) || 
          user.username.toLowerCase().includes(query) 
        )
      }
    }
  }
