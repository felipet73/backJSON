import path from 'path';
import express, { Router } from 'express';
//import fileUpload from 'express-fileupload';
const bodyParser = require('body-parser');
const cors = require("cors");


interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}


export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }


  
  async start() {
    

    //* Middlewares
    //this.app.use( express.json() ); // raw
    //this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
    this.app.use(bodyParser.json({ limit: "200mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));



    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      next();
    })

    this.app.use(cors());

    /*this.app.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }));*/

    //* Public Folder
    this.app.use( express.static( this.publicPath ) );


    //this.app.use( express.json() );
    

    //this.app.use(express.limit(100000000));
    //* Routes
    this.app.use( this.routes );

    //* SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
      res.sendFile(indexPath);
    });
    

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }

  public close() {
    this.serverListener?.close();
  }

}