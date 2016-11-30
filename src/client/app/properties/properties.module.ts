import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties.component';
import { NumbersOnlyModule } from '../shared/index';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, NumbersOnlyModule],
    declarations: [PropertiesComponent],
    exports: [PropertiesComponent]
})

export class PropertiesModule { }
