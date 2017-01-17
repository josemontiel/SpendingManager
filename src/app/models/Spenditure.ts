import {Serializable} from "./Serializable";
import {User} from "./User";
/**
 * Created by Jose on 1/16/17.
 */
export class Spenditure implements Serializable<Spenditure> {
  _id:string;
  user_id:string;
  description:string;
  amount:number;
  when:number;

  deserialize(input):Spenditure {
    this._id = input._id;
    this.user_id = input.user_id;
    this.description = input.description;
    this.amount = input.amount;
    this.when = input.when;

    return this;
  }

}
