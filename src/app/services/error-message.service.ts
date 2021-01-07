import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor(
    //private alertController: AlertController,
    public route: Router
  ) { }

  async showAlertError(message: string) {
   /*
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oops .. Some errors were found',
      subHeader: '',
      message: `${message}`,
      buttons: [{ text: 'Try again' }]
    }); 

    await alert.present();
  } */

}
