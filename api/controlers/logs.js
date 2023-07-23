import LogModel from '../models/log'
import LogValidator from '../validators/log'


export default class Chore {
   constructor(){
      this.model = LogModel 
      this.Chore = LogValidator 
   }
}
