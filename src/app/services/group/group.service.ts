import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../settings/settings.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    private router: Router,
  ) { }



  // creat new group
  createGroup(data: any) {
    const url = `${this.settings.API_BASE_URL}/group`;
    return lastValueFrom(this.http.post(url, data));
  }


  // get group details
  getAllActiveGroups(){
    const url = `${this.settings.API_BASE_URL}/group`;
    return lastValueFrom(this.http.get(url));
  
  }
 
  // get group details by id
  getGroupDetailsById(id: string){
    const url = `${this.settings.API_BASE_URL}/group/${id}`;
    return lastValueFrom(this.http.get(url));
  }

  addGroupMembers(data: any, id: string){
    const url = `${this.settings.API_BASE_URL}/group/add-member/${id}`;
    return lastValueFrom(this.http.put(url, data));
  }
}
