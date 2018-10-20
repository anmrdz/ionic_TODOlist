import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public email: string;
  public password: string;
  public confirm_password: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register():void{

    const params = {
      email: this.email,
      password: this.password,
      password_confirmation: this.confirm_password

    }

    this.api.register(params).subscribe((status: boolean) => {
      if(status) {
        alert('Registrado!');
        this.navCtrl.pop();
      } else {
        alert('error');
      }
    });

  }

}
