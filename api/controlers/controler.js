export default class Controler {
   
   constructor(){
   } 

   async create(req, res) { 
      const v = this.validator(req.body);
      const matched = v.check();

      if (!matched) {
         return res.status(422).send(v.errors);
      }

      const newItem =  await this.model.create(matched)
      res.send(newItem);
   }
   async read(req, res) {
      const id = req.params.id;
      const item = await this.model.get(id);
      res.send(item)
   }
   async update(req, res) {
      const id = req.params.id;
      const v = this.validator(req.body);
      const matched = v.check();

      if (!matched) {
         return res.status(422).send(v.errors);
      }

      const item = await this.model.update(id,matched)

      res.send(item);
   }
   async delete(req, res) {
      const id = req.params.id;
      await this.model.delete(id);
      res.sendStatus(201);
   }
   async list(req, res) {
      const item = await this.model.findAll();
      res.send(item)
   }
}