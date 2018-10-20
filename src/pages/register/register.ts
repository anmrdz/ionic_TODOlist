import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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
              private api: ApiProvider,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
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

    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });

    loading.present();

    this.api.register(params).subscribe((status: boolean) => {
      loading.dismiss()
      const toast = this.toastCtrl.create();
      if(status) {
        toast.setMessage('Usuario registrado con éxito')
        toast.setDuration(1000);
        this.navCtrl.pop();
      } else {
        toast.setMessage('Error al registrar el usuario')
        toast.setDuration(3000);
      }
      toast.present();
    });

  }

}
