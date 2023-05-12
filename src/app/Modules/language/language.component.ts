import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent  {

  showLanguageMenu = false;
  constructor( private translateService: TranslateService) {
  }

  setLanguage(language: string): void{
    this.translateService.use(language);
  }

  onClickOutSideMenuLanguage(event: Event): void {
    if (this.showLanguageMenu) {
      this.showLanguageMenu = false;
    }
  }
}
