import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ConnectorService {


  constructor(private http:Http) {
  }

  // Funciones Privadas ....................
   private makeCall(type:string,header:Headers,address:string,body:any): Observable<Response>{
    let options = new RequestOptions({headers: header})
    switch(type){
      case 'get':
        return this.http.get(address,options)
      case 'post':
        return this.http.post(address,body,options)
      case 'put':
        return this.http.put(address,body,options)
      case 'delete':
        return this.http.delete(address,options)
      default:
        console.log("Error en MAKE CALL connector")
        console.log("Tipo de llamada incorrecta")
    }
  }

  unsignedCall(type:string,address:string,body:any){
    return new Promise((resolve,reject)=>{
  
        this.makeCall(type,new Headers(),address,body)
          .subscribe((res)=>{
            resolve(res.json())
          },err=>{
            console.log('Error en UNSIGNED_POST_CALL connector')
            reject(err)
            //return this.errorService.http(err)
          })
    })
  }



}
