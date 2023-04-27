import database from "../../database";

export class UserService {
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

  async CreateUserdto(props) {
    const newUser = await database.user.create({
      data: {
        name: props.name,
        email: props.email,
        age: props.age,
        phoneNumber: props.phoneNumber,
      },
    });

    return newUser.id;
  }

  async updateUser(id, props) {
    const isExist = await database.user.findUnique({
      where: {
        id,
      },
    });

    if (!isExist) throw { status: 404, message: "사용자를 찾을 수 없다" };

    await database.user.update({
      where: {
        id: isExist.id,
      },
      data: {
        name: props.name,
        email: props.email,
        age: props.age,
        phoneNumber: props.phoneNumber,
      },
    });
  }

  async deleteUser(id) {
    const isExist = await database.user.findUnique({
      where: {
        id,
      },
    });

    if (!isExist) throw { status: 404, message: "사용자를 찾을 수 없다" };

    await database.user.delete({
      where: {
        id: isExist.id,
      },
    });
  }
}
