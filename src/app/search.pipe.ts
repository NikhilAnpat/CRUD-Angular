import { Pipe, PipeTransform } from '@angular/core';
import { UserInterface } from './user-interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(users: UserInterface[], searchText: string): UserInterface[] {
    if (!users || !searchText) {
      return users;
    }

    searchText = searchText.toLowerCase();

    return users.filter(user =>
      user.userregistration.toLowerCase().includes(searchText) ||
      user.username.toLowerCase().includes(searchText)
    );
  }
}
