import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { routes } from './app/app.routes';
import { provideRouter, RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from'@angular/common/http'
import { FormGroupDirective } from '@angular/forms';
import { LoadingInterceptor } from './app/shared/utils/loading.interceptor';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));
bootstrapApplication(AppComponent, {
  providers: [
 { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
 { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
 importProvidersFrom(IonicModule.forRoot({})),
 importProvidersFrom(HttpClientModule),
 importProvidersFrom(FormGroupDirective),
 provideRouter(routes),
 ],
 });
