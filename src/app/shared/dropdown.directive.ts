import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
    @HostBinding('class.open') isOpen = false;

    ngOnInit() {}

    @HostListener('click') toggleOpen() {
      this.isOpen = !this.isOpen;
    }
}
