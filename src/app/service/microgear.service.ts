import { Injectable } from '@angular/core';

declare let Microgear: any;

@Injectable({
  providedIn: 'root'
})
export class MicrogearService {

  constructor() { }

  public microgear() {
    // tslint:disable-next-line:prefer-const
    let microgear = Microgear.create({
      key: 'kErgmoNBMEQkCD3',
      secret: 'p88kr04X32iSs7JHhhyLeDIhZ',
      alias : 'MyApp'         /*  optional  */
    });
    microgear.connect('nonIONIC4');
    return microgear;
  }
  
}
