import UsersModel from '../models/users'
import UsersValidator from '../validators/chore'


export default class Chore {
   constructor(){
      this.model = UsersModel 
      this.Chore = UsersValidator 
   }
}
