import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GmlComponent } from './gml.component';
import { NumbersOnlyModule } from '../shared/index';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, NumbersOnlyModule],
    declarations: [GmlComponent],
    exports: [GmlComponent]
})

export class GmlModule { }
