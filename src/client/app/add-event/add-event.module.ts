import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './add-event.component';

@NgModule({
    imports: [CommonModule],
    declarations: [AddEventComponent],
    exports: [AddEventComponent]
})

export class AddEventModule { }
