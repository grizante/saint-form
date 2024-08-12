import { Exclude, Expose } from "class-transformer";

export class User {
  @Exclude()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;
}