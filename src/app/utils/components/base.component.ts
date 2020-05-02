import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class BaseComponent implements OnDestroy {

    subscription: Subscription = new Subscription();
    subscriptions: Subscription[];

    ngOnDestroy() {
      this.subscription.unsubscribe();
      this.subscriptions.forEach(x => x.unsubscribe());
    }

}
