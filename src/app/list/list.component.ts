import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectorService} from '../../services/connector/connector.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public list:any[] = [];
  public pages:number[] = [];
  public page:number = 1;
  public title:string = "";


  constructor(private connector:ConnectorService,private active:ActivatedRoute) {
    this.active.params.subscribe(params=>{

        this.page = parseInt(params["page"]) || 1

    
        this.connector.unsignedCall('get',"https://example-gems-juligarji.c9users.io/books?page=" + this.page,null)
          .then(data=>{
            let list = data["list"]
            for(let x =0;x<data["pages"];x++){
              this.pages.push(x)
            }

            let counter = 0
            while(true){
              if(list[counter]==null || list[counter]==undefined){
                  break
              }
              this.list.push(list[counter])
              counter++
            }
            console.log(this.list)
          })
          .catch(err=>{
            alert(err)
          })

    })
    
    
  }

  ngOnInit() {
  }

}
