import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { MemoryService } from '../memory/memory.service'
import { ErrorService } from '../error/error.service'
import { ConfigVar } from '../../app/configVar'

@Injectable()
export class ConnectorService {
  private config = new ConfigVar()

  constructor(private http:Http,private errorService:ErrorService,private memory : MemoryService) {
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
  // ........................................
  signedCall(type:string,address:string,body:any){
    return new Promise((resolve,reject)=>{
      this.memory.get('token')
        .then(value=>{
          if(value){
            let headers = new Headers()
            headers.append('Authorization','Bearer ' + value)
            
            this.makeCall(type,headers,address,body)
              .subscribe((res)=>{
                resolve(res.json())
              },err=>{
                console.log('Error en SIGNED_POST_CALL connector')
                return this.errorService.http(err)
              })
          }else{
            console.log('Error en SIGNED_POST_CALL connector')
            console.log('Token nulo')
          }
        })
    })
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
  
  logIn(type:string,email:string,password:string){
    return new Promise((resolve,reject)=>{
      let address:string;
      let call:any;
      switch(type)
      {
        case 'client':
          address = this.config.getApiAddresses().client_token
          break;
        case 'admin':
          address = this.config.getApiAddresses().admin_token
          break;
      }
      call = {
        "auth":{
          "email":email,
          "password":password
        }
      }
      this.unsignedCall('post',address,call)
        .then(data=>{
          this.memory.update('token',data['jwt'])
          .then(_=>{
            this.memory.update('role',type)
              .then(_=>{
                resolve()
              })
          })
          .catch(err=>{
            //alert('Datos erroneos') // colocar otras notificaciones
            console.log('Error en LOGIN connector')
            console.log(err)
            reject(err)
          })
          //console.log(data)
        })
    })
  }


}
