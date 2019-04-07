import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(public alertController: AlertController) { }

  async presentAlertConfirm(message: string) {
    return new Promise(async (resolve , reject) => {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: message,
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            cssClass: 'secondary',
            handler: async () => {
              await reject(false);
            }
          }, {
            text: 'ตกลง',
            handler: async () => {
              await resolve(true);
            }
          }
        ]
      });
      await alert.present();
    });
  }
}
