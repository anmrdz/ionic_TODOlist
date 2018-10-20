import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email: string;
  public password: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiProvider) {
  }

  public login(): void{

    const params = {
      email: this.email,
      password: this.password
    }

    this.api.auth(params).subscribe((status: boolean) => {
      if(status) {
        alert('Autenticado!');
      } else {
        alert('error');
      }
    });
  }

  public register(){
    this.navCtrl.push(RegisterPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
