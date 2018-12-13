import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-appheader',
    templateUrl: './appheader.component.html',
    styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

    constructor() { }

    bShowMenu = false;

    jsToggleMenu() {
        this.bShowMenu = !this.bShowMenu;
    }

    jsChangeLang(strLand) {
        this.bShowMenu = !this.bShowMenu;
    }

    ngOnInit() {
    }

}
