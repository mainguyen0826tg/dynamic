import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { factory } from '@gooddata/gooddata-js';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();``
}

window['gooddata'] = factory({ domain: '' });


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
