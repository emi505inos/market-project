//import config from './config';
// import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import config from './config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    // @Inject('APIKEY') private apiKey: string,
    @Inject('MONGO') private database: Db,
    // @Inject('PG') private clientPg: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TAREA_ASINC') private tarea: any[],
    // private config: ConfigService,
  ) {}

  getHello(): string {
    // const apiKey = this.config.get<string>('API_KEY');
    // const dbname = this.config.get('DATABASE_NAME');
    const apiKey = this.configService.apiKey;
    const dbname = this.configService.database.name;
    const dbport = this.configService.database.port;
    return `La llave de la aplicacion es: ${apiKey} y el nombre y el puerto de la base de datos es: ${dbname}, ${dbport} `;
    // return `Envs: ${apiKey} ${name}`;
  }
  getUseFactory(): string {
    console.log(this.tarea);
    return 'Realizando una tarea asincronica';
  }
  getTasks() {
    // return new Promise((reesolve, reject) => {
    //     this.clientPg.query('SELECT * FROM tareas', (err, res) => {
    //         if (err) {
    //             reject(err);
    //         }
    //         reesolve(res.rows);
    //     });
    // });
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  }
}
