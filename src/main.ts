import { enableProdMode, ErrorHandler, importProvidersFrom } from '@angular/core';
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
import { JwtModule } from '@auth0/angular-jwt';
import { CustomErrorHandlerService } from './app/core/utils/custom-error-handler.service';
import { ServerErrorInterceptor } from './app/core/interceptors/server-error.interceptor';

if (environment.production) {
  enableProdMode();
}
export function tokenGetter(){
  // console.log("Token getter ", localStorage.getItem('access_token'))
 return localStorage.getItem('access_token')
}
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));
bootstrapApplication(AppComponent, {
  providers: [
 { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
 { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
 { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
 { provide: ErrorHandler, useClass: CustomErrorHandlerService},
 importProvidersFrom(IonicModule.forRoot({})),
 importProvidersFrom(HttpClientModule),
 importProvidersFrom(FormGroupDirective),
 importProvidersFrom(JwtModule.forRoot({
  config: {
    tokenGetter: tokenGetter,
    allowedDomains: ["localhost:3000", "localhost:8100", "pomodoro-dev.onrender.com"],
    disallowedRoutes: ["http://example.com/examplebadroute/"],
  },
})),
 provideRouter(routes),

 ],
 });
