import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ObjectDataService } from './object-data/index';
import { AlertService } from './alert/index';
import { FileLoaderService } from './file-loader/index';
import { NumbersOnlyDirective } from './numbers-only/index';
import { StorageService } from './storage/index';
import { XmlService } from './xml/index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [CommonModule, FormsModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ObjectDataService, AlertService, FileLoaderService, StorageService,
        XmlService, NumbersOnlyDirective]
    };
  }
}
