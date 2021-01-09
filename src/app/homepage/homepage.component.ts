import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStoragePersistenceService } from '../services/local-storage-persistence.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  userName: string = "";

  constructor(
    public route: Router,
    private loginService: LoginService,
    private localStorageService: LocalStoragePersistenceService
  ) { }

  ngOnInit(): void {
    if (this.userName == "")
      this.userName = "Visitante";
    this.userName = this.localStorageService.get("username");
  }

  desconectar(){
    this.localStorageService.clear();
    this.route.navigate(['']);
  }
}