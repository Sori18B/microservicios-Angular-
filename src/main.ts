import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch  } from '@angular/common/http'; //Para las peticiones

// import { appConfig } from './app/app.config'; se quita esta cosa
import { AppComponent } from './app/app.component';

//Imports de las rutas
import { provideRouter } from '@angular/router';
import { routes} from './app/app.routes'

bootstrapApplication(AppComponent, {
  providers:[
    provideRouter(routes), //Las rutas definidas
    provideHttpClient(withFetch()) // HABILITA HttpClient
  ]
}).catch((err) => console.error(err));
