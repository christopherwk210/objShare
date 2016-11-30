import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { FormsModule } from '@angular/forms';

import { AddEventModule } from '../add-event/add-event.module';

@NgModule({
    imports: [CommonModule, AddEventModule, FormsModule],
    declarations: [EventsComponent],
    exports: [EventsComponent]
})

export class EventsModule {}
