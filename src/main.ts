import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import 'hammerjs';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// @import  src="/assets/js/bootstrap.bundle.min.js"
