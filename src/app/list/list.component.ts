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
  public title:string = "";


  constructor(private connector:ConnectorService,private active:ActivatedRoute) {
    this.active.params.subscribe(params=>{
        let page = params["page"]
        this.connector.unsignedCall('get',"https://example-gems-juligarji.c9users.io/books?page=" + page,null)
          .then(list=>{
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
