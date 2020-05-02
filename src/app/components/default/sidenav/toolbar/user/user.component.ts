import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PeopleService } from 'src/app/services/people.service';
import { People } from 'src/app/models/people';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;
  people: People;

  constructor(
    private authenticationService: AuthenticationService,
    private peopleService: PeopleService) { }

  ngOnInit() {
    this.GetDataUser();
  }

  GetDataUser() {
    this.user = this.authenticationService.currentUserValue;

    this.peopleService.getById(this.user.idPeople).subscribe(result => {
      this.people = result;
    });
  }

}
