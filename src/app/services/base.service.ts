import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export abstract class BaseService {


    protected UrlService: string;
    protected env: any;

    constructor() {
        this.env = environment;
        this.UrlService = this.env.UrlServiceBase;
    }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
