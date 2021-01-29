import { User } from 'src/app/models/User';

export interface UserDTO {
  id: number;
  email: string;
  password: string;
  first_name: string,
  last_name: string;
  country: string;
  city: string;
  zip_code: string;
  last_login: Date;
  date_joined: Date;
  friends: string;
}

export class UserMapper {

  public static getCamelCase(userRaw: UserDTO): User {
    const user: User = {
      id: userRaw.id,
      email: userRaw.email,
      password: userRaw.password,
      firstName: userRaw.first_name,
      lastName: userRaw.last_name,
      country: userRaw.country,
      city: userRaw.city,
      zipCode: userRaw.zip_code,
      lastLogin: userRaw.last_login,
      dateJoined: userRaw.date_joined,
      friends: userRaw.friends
    };
    return user;
  }

  public static getSnakeCase(user: User): UserDTO {
    const userRaw: UserDTO = {
      id: user.id,
      email: user.email,
      password: user.password,
      first_name: user.firstName,
      last_name: user.lastName,
      country: user.country,
      city: user.city,
      zip_code: user.zipCode,
      last_login: user.lastLogin,
      date_joined: user.dateJoined,
      friends: user.friends
    };
    return userRaw;
  }
}
