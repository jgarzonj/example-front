import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../../services/connector/connector.service'

import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public filesUploaded:any[] = []
  private formMagazine:any = {
    name:'',
    author:'',
    file:{
      url:''
    }
  }

  constructor(private connector:ConnectorService,private router:Router) { 
    this.connector.unsignedCall('get','https://example-gems-juligarji.c9users.io/magazines',{})
      .then(data=>{
        
        let counter = 0
        while(true){
          if(data[counter]==null || data[counter]==undefined){
              break
          }
          this.filesUploaded.push(data[counter])
          counter++
        }
        console.log(this.filesUploaded)
      })
  }

  registerClient(){
  

    this.router.initialNavigation()
  }

  ngOnInit() {
  }

}
