import { ItemsPage } from './../items/items';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { CreateListPage } from '../create-list/create-list';

/**
 * Generated class for the ListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {
   public lists: Array<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: ApiProvider,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController) {
    this.lists = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListsPage');
    this.showLists();
  }

  public showLists() {

    this.api.getLists().subscribe((response: any) => {

      this.lists = response.lists;
      const toast = this.toastCtrl.create();
      if(this.lists) {
        console.log(response.list);
      } else {
        toast.setMessage('No tienes Listas')
        toast.setDuration(3000);
      }
      toast.present();
    });
  }

  public newList(){
    const modal = this.modalCtrl.create(CreateListPage);
    modal.present();
    modal.onDidDismiss(() => {
      this.showLists();
    });
  }

  public logout(): void{
    //this.api.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  public selectList(list) {
    this.navCtrl.push(ItemsPage, {
      list: list
    });
  }

}
