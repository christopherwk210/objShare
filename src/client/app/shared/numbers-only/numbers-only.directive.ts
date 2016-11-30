import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';

@Directive({ selector: '[numbersOnly]' })
export class NumbersOnlyDirective {

    constructor(el: ElementRef, renderer: Renderer) {}

    /** Catch all keypresses and only allow numbers through */
    @HostListener('keypress', ['$event']) onKeyPress(e:any) {
      e = (e) ? e : window.event;
      var charCode = (e.which) ? e.which : e.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
      }
      return true;
    }

    /** Catch all inputs and remove all numbers (to catch pasting data) */
    @HostListener('input', ['$event']) onInput(e:any) {
      let newStr = e.srcElement.value.replace(/([^0-9])/g, '');
      e.srcElement.value = newStr;
    }
}
