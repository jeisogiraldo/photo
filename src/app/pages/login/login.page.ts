import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServicesService } from 'src/app/services/ui-services.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', { static: true}) slides: IonSlides;



loginUser = {
  email: 'test1@gmail.com',
  password: '123'
};

registerUser: Usuario = {
  email: 'test',
  password: '123456',
  nombre: 'Test',
  avatar: 'av-1.png'
  
};

  constructor( private usuarioService: UsuarioService, private navCtrl: NavController, private uiServices: UiServicesService) { }

  ngOnInit() {
      
   this.slides.lockSwipes( true );
    
  }


  async login( fLogin: NgForm ) {
    // Formulario de login

    if( fLogin.invalid ) { return }
    
    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password );

    if( valido ) {
      //Navegar tabs
      this.navCtrl.navigateRoot( 'main/tabs/tab1', { animated: true } );

    }else{
      //Mostrar alerta de usuario y password no son correctos
      this.uiServices.alertaInformativa('Usuario y password no son correctos');

    }

  }

  async registro( fRegistro: NgForm ) {
   // Formulario de registro
    
   if( fRegistro.invalid ) { return }

   const valido = await this.usuarioService.registro( this.registerUser );

   if( valido ) {
    //Navegar tabs
    this.navCtrl.navigateRoot( 'main/tabs/tab1', { animated: true } );

  }else{
    //Mostrar alerta 
    this.uiServices.alertaInformativa('Ese correo elctronico ya existe');

  }
   
  }


  mostrarRegistro() {
  
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);

  }
  monstrarLogin() {

    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);

  }

}
