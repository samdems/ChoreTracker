import { Router } from 'express';
import chores from './controlers/chores';
import users from './controlers/users';
import logs from './validators/logs';
const api = Router()

resources(api,'chores',new chores())
resources(api,'users',new users())
resources(api,'logs',new logs())



export default api



function resources (api,name,controler) {
    api.post(`/${name}`, controler.create);
    api.get(`/${name}/:id`, controler.read);
    api.post(`/${name}/:id`, controler.update);
    api.delete(`/${name}`, controler.delete);
    api.get(`/${name}`, controler.list);
}