import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';

@NgModule({
    imports: [HeaderRoutingModule, CommonModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent]
})

export class HeaderModule { }
