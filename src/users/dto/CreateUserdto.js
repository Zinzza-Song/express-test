export class CreateUserdto {
  firstname;
  lastname;
  age;

  constructor(firstname, lastname, age) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
  }

  getNewuser() {
    return {
      id: new Date().getTime(),
      firstname: this.firstname,
      lastname: this.lastname,
      age: this.age,
    };
  }
}
