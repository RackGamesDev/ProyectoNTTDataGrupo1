import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConexionIgdbService {
  private readonly API_CLIENTID = environment.igdbClientId;
  private readonly API_SECRET = environment.igdbClientSecret;
  private readonly API_TOKEN = environment.igdbToken;

  

  constructor(private httpClient:HttpClient) { }
}
