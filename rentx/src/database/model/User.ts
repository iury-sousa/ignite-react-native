import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class User extends Model {
  static table = "users";

  @field("user_id")
  userId!: string;

  @field("name")
  name!: string;

  @field("email")
  email!: string;

  @field("driver_license")
  driverLicense!: string;

  @field("avatar")
  avatar!: string;

  @field("token")
  token!: string;
}

export { User };
