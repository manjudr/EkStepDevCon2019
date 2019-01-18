import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AppPreferences } from '@ionic-native/app-preferences';
import { Device } from '@ionic-native/device';
import { PreferenceKey } from '../../app/app.constant';
import { StallFormPage } from '../stallform/stallform.component';

declare let cordova;

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {orgList: Array<any> = [];
  guestRegistrationForm: FormGroup;
  private formCount: number = 0;
  private resetCountTimer: any;

  constructor(private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private appPreference: AppPreferences,
    private device: Device
    ) {
    this.orgList = ['EkStep', 'BeyondSquare', 'Compassites', 'FrameWirk', 'Funtoot', 'GWL',
    'ILIMI','Lollypop','MantraLabs','OPTIT','PosteroTech','Qualitrix','Tarento','TEKDI','Tibil','TurtleBowl','Zool', 'Other'];
    this.guestRegistrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      org: ['', Validators.required]
    });
  }

  register(){
    const name = this.guestRegistrationForm.value.name;
    const org = this.guestRegistrationForm.value.org;
    const uuid = this.device.uuid;
    this.generateQRCode(uuid, name, org);
    this.appPreference.store(PreferenceKey.DEVICE_ID, uuid);
    this.appPreference.store(PreferenceKey.USER_NAME, name);
    this.appPreference.store(PreferenceKey.ORGANISATION, org);
    const index = this.navCtrl.getActive().index;
    this.navCtrl.push(HomePage).then( () => {
      this.navCtrl.remove(index);
    });
  }

  generateQRCode(uuid: any, name: string, org: string) {
    let options = {
      width: 140,
      height: 140,
      colorDark: "#000000",
      colorLight: "#ffffff",
    };
    const qrData = {
      name: name,
      org: org,
      uuid: uuid
    };
    cordova.plugins.qrcodejs.encode('TEXT_TYPE', JSON.stringify(qrData), (base64EncodedQRImage) => {
        console.info('QRCodeJS response is ' + base64EncodedQRImage);
        this.appPreference.store(PreferenceKey.QRCODE, base64EncodedQRImage);
    }, (err) => {
        console.error('QRCodeJS error is ' + JSON.stringify(err));
    }, options);
  }

  registerNewStall() {
    this.formCount++;
    if(this.formCount === 10) {
      clearTimeout(this.resetCountTimer);
      this.resetCountTimer = undefined;
      this.formCount = 0;
      alert('moving to form page!');
      this.navCtrl.push(StallFormPage, {});
    }
    if(this.resetCountTimer) {
      clearTimeout(this.resetCountTimer);
      this.resetCountTimer = undefined;
      console.log('timeout cleared', this.formCount);
    }
    this.resetCountTimer = setTimeout(() => {
      this.resetCountTimer = undefined;
      this.formCount = 0;
    }, 1000);

  }
}
