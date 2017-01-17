import {Serializable} from "./Serializable";
/**
 * Created by Jose on 1/16/17.
 */
export class User implements Serializable<User> {
  user_id:string;
  email:string;
  password:string;
  first_name:string;
  last_name:string;
  type:string;

  deserialize(input):User {
    this.user_id = input._id;
    this.email = input.email;
    this.first_name = input.first_name;
    this.last_name = input.last_name;
    this.type = input.type || 'user';

    return this;
  }

}
