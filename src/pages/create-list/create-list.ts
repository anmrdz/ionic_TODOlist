import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ListsPage } from '../lists/lists';

/**
 * Generated class for the CreateListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-list',
  templateUrl: 'create-list.html',
})
export class CreateListPage {
  public name:string;
  public description: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: ApiProvider,
              private toastCtrl: ToastController,
              private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateListPage');
  }

  public createList():void {
    const params = {
      name: this.name,
      description: this.description
    }
        
    this.api.createList(params).subscribe((status: boolean) => {
      
      const toast = this.toastCtrl.create();
      if(status) {
        toast.setMessage('Lista creada con éxito!');
        toast.setDuration(1000);
        this.navCtrl.setRoot(ListsPage);
      } else {
        toast.setMessage('Error en la creación de la lista');
        toast.setDuration(3000);
      }
      toast.present();
    });
  }

  public dismiss(): void {
    this.viewCtrl.dismiss();
}

}
