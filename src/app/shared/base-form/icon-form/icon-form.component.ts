import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { SchemaIcon } from '../../schema/schema-icon';

@Component({
  selector: 'app-icon-form',
  templateUrl: './icon-form.component.html',
  styleUrls: ['./icon-form.component.scss']
})
export class IconFormComponent implements OnInit {

  @Input() schemaIcon: SchemaIcon;

  constructor(private element: ElementRef) { }

  ngOnInit() {
    if (this.schemaIcon) {
      this.schemaIcon.ELementRef = this.element.nativeElement;
    }
  }

  onClick(event) {
    if (this.schemaIcon && this.schemaIcon.OnClick) {
      this.schemaIcon.OnClick.emit(event);
    }
  }
}
