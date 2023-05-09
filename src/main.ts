import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { routes } from './app/app.routes';
import { provideRouter, RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {HttpClientModule} from'@angular/common/http'
if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));
bootstrapApplication(AppComponent, {
  providers: [
 { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
 importProvidersFrom(IonicModule.forRoot({})),
 importProvidersFrom(HttpClientModule),
 provideRouter(routes),
 ],
 });
