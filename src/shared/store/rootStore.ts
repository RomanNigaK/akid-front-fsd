import { SetStore } from 'entities/set/model';
import { authStore } from 'entities/auth/model';
import { WorkStore } from 'entities/work';
import { MaterialStore } from 'entities/material';
import { FileStore } from 'entities/file/model';
import { PersonStore } from 'entities/person/model';

class Store {
  set = SetStore;
  auth = authStore;
  work = WorkStore;
  material = MaterialStore;
  file = FileStore;
  person = PersonStore;
}

export default Store;
