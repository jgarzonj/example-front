import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../../services/connector/connector.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  constructor(private connector:ConnectorService) { 

  }

  ngOnInit() {
  }

}
