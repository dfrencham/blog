---
categories:
- tech
group: "tech"
date: 2017-11-01T00:00:00Z
tags:
- programming
title: Angular4 Startup Configuration Stupidity
url: /tech/2017/11/01/angular4-startup-configuration-stupidity
---

Lets look at 2 ways to read your run time configuration with Angular 4.

<!--more-->

	
StartupService (startup.service.ts)

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StartupService {

    private _startupData: any;

    constructor(private http: Http) { }

    // This is the method you want to call at bootstrap
    // Important: It should return a Promise
    load(): Promise<any> {

        this._startupData = null;

        return this.http
            .get('REST_API_URL')
            .map((res: Response) => res.json())
            .toPromise()
            .then((data: any) => this._startupData = data)
            .catch((err: any) => Promise.resolve());
    }

    get startupData(): any {
        return this._startupData;
    }
}