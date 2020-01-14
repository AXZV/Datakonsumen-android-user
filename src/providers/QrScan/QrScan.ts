import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';
import { ToolBox } from './ToolBox'; 

/*
  Generated class for the QrScanProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrScanProvider {
	light: string;

  constructor(
    public http: HttpClient,
    private qrScanner: QRScanner) 
    {
		this.light="off";
    }

	scan():Promise<any> 
	{
    	return new Promise((resolve, reject) => { 
    		return this.startScanner()
    		.then((data) => {
    			if (data) {
    				resolve(data);
    				ToolBox.hideCamera();
    			} else {
    				reject("error");
    			}
    		})
    	});
	}

	private startScanner():Promise<any> 
	{
        // Get the device cam permission. 
        return this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {
            return new Promise((resolve, reject) => {
                if (status.authorized) {
                    let scanSub = this.qrScanner.scan().subscribe((code: string) => { 
                        this.qrScanner.hide();
                        scanSub.unsubscribe(); 
                        resolve(code);
					});
					
                    ToolBox.showCamera(); 
                    this.qrScanner.show(); 
                } else if (status.denied) {
                    // camera permission was permanently denied 
                    if (status.canOpenSettings) { 
                    	this.qrScanner.openSettings();
                    }
                    reject(new Error('MESSAGES.QRSCANNER.CHANGE_SETTINGS_ERROR'));
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                    reject(new Error('MESSAGES.QRSCANNER.PERMISSION_DENIED_ERROR'));
                }
            });
        })
	}
	
	enaable_desable_light() 
	{
    	Promise.resolve("proceed")
    	.then((k) => {
    		return this.qrScanner.getStatus();
    	}).then((status: QRScannerStatus) => {
    		if (status.authorized) { 	    		
    			if (status.canEnableLight) {                  
                    if (status.lightEnabled) {
						this.light="on";
                        return this.qrScanner.disableLight(); 
                    } else {  
						this.light="off";
						return this.qrScanner.enableLight();
						
                    }
	    		}
    		}
    	}).then((ok) => {
    		console.log(ok);
    	}).catch((error) => {
    		console.log(error);
    	});
	}
	
	off_light() 
	{
    	Promise.resolve("proceed")
    	.then((k) => {
    		return this.qrScanner.getStatus();
    	}).then((status: QRScannerStatus) => {
    		if (status.authorized) { 	    		
    			if (status.canEnableLight) {                  
                    if (status.lightEnabled) {
						this.light="on";
                        return this.qrScanner.disableLight(); 
                    }
	    		}
    		}
    	}).then((ok) => {
    		console.log(ok);
    	}).catch((error) => {
    		console.log(error);
    	});
    }
   

}
