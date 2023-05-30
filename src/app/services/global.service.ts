import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private logStatus = new Subject<boolean>();

  constructor() { }

  public setLogStatus(status: boolean) {
    this.logStatus.next(status);
  }

  public getLogStatus$() {
    return this.logStatus.asObservable();
  }
}
