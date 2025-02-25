import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]'
})
export class HighlightCompletedTodoDirective {
  isCompleted = input(false);
  el = inject(ElementRef);

  styleEffect = effect(() => {
    if (this.isCompleted()) { 
      this.el.nativeElement.style.textDecoration = 'line-through';
      this.el.nativeElement.style.color = 'gray';
      this.el.nativeElement.style.backgroundColor = 'lightgreen'; 
    } else {
      this.el.nativeElement.style.textDecoration = 'none';
      this.el.nativeElement.style.color = '#000';
      this.el.nativeElement.style.backgroundColor = 'unset';
    }
  })

}
