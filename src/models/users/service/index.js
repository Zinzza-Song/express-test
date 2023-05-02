import database from "../../../database";

export class UserService {
  async checkEmail(email) {
    const user = await database.user.findUnique({
      where: {
        email,
      },
    });
    console.log(user);
    if (!user) return false;
    return user;
  }

  async findUserById(id) {
    const user = await database.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw { status: 404, message: "사용자를 찾을 수 없다" };
    return user;
  }

  async findUsers({ skip, take }) {
    const users = await database.user.findMany({
      skip,
      take,
    });
    const cnt = await database.user.count();
    return {
      users,
      cnt,
    };
  }

  async createUser(props) {
    const newUser = await database.user.create({
      data: {
        name: props.name,
        email: props.email,
        age: props.age,
        phoneNumber: props.phoneNumber,
        password: props.password,
      },
    });
    return newUser.id;
  }

  async updateUser(id, props) {
    const isExit = await database.user.findUnique({
      where: {
        id,
      },
    });

    if (!isExit) throw { status: 404, message: "사용자를 찾을 수 없다" };

    await database.user.update({
      where: {
        id: isExit.id,
      },
      data: {
        name: props.name,
        email: props.email,
        age: props.age,
        phoneNumber: props.phoneNumber,
        password: props.password,
      },
    });
  }

  async deleteUser(id) {
    const isExit = await database.user.findUnique({
      where: {
        id,
      },
    });
    if (!isExit) throw { status: 404, message: "사용자를 찾을 수 없다" };

    await database.user.delete({
      where: {
        id: isExit.id,
      },
    });
  }
}
