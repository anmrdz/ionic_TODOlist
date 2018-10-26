import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {

  public list: any;
  public items: Array<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: ApiProvider,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.list = this.navParams.get('list');
    this.refreshItems();
  }

  public refreshItems(){
    this.api.getItems(this.list).subscribe((response: any) => {
      this.items = response.items.sort((a, b)=> {return a.id - b.id});
    });
  }

  public updateItem(item, status){
    item.status = status;
    console.log(item);

    this.api.updateItem(item, this.list).subscribe((response: any) => {
      const toast = this.toastCtrl.create();
      if (response) {
          this.refreshItems();
      } else {
        toast.setMessage('Error en la actualización del item');
        toast.setDuration(3000);
      }
    })
  }

  public createItem() {
    const prompt = this.alertCtrl.create({
      title: 'Item',
      message: "Ingrese el nombre del item",
      inputs: [
        {
          name: 'name',
          placeholder: 'nombre'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {

            this.api.createItem(data, this.list).subscribe((response: any) => {
              const toast = this.toastCtrl.create();
              if (response) {
                  toast.setMessage('Item creado con éxito!');
                  toast.setDuration(1000);
                  this.refreshItems();
              } else {
                toast.setMessage('Error en la creación del item');
                toast.setDuration(3000);
              }
            })
          }
        }
      ]
    });
    prompt.present();
  }

  public deleteItem(item):void {
    this.api.deleteItem(item.id, this.list).subscribe((response:any) => {
      const toast = this.toastCtrl.create();
      if(response){
        this.refreshItems()
      } else {
        toast.setMessage('Error borrando el item');
        toast.setDuration(3000);
      }
    })
  }

}
