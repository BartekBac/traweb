export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  zipCode: string;
  lastLogin: Date;
  dateJoined: Date;
  friends: User[];
}
