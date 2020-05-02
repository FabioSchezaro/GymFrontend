import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

export abstract class BaseService {

  saveSuccess$ = new Subject<any>();
  saveError$ = new Subject<any>();

  updateSuccess$ = new Subject<any>();
  updateError$ = new Subject<any>();

  deleteSuccess$ = new Subject<any>();
  deleteError$ = new Subject<any>();


  protected UrlService: string;
  protected env: any;

  constructor() {
    this.env = environment;
    this.UrlService = this.env.UrlServiceBase;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: new HttpParams()
  };
}
