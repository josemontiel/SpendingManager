import {Serializable} from "./Serializable";
import {User} from "./User";
/**
 * Created by Jose on 1/16/17.
 */
export class Admin extends User implements Serializable<Admin> {

  deserialize(input):Admin {
    this.user_id = input.user_id;
    this.email = input.email;
    this.first_name = input.first_name;
    this.last_name = input.last_name;
    this.type = input.type || "admin";

    return this;
  }

}
