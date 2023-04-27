export class Userdto {
  id;
  firstname;
  lastname;
  age;

  constructor(user) {
    this.id = id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.age = user.age;
  }

  getTotalName() {
    return `${this.firstname} ${this.lastname}`;
  }
}
