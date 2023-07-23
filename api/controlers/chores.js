import ChoreModel from '../models/chore'
import ChoreValidator from '../validators/chore'


export default class Chore {
   constructor(){
      this.model = ChoreModel
      this.Chore = ChoreValidator
   }
}
