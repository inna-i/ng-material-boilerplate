import { Component } from '@angular/core';
import { CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatActionList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './roles-drag-drop.component.html',
  styleUrl: './roles-drag-drop.component.scss',
  standalone: true,
  imports: [CdkDrag, CdkDropList, MatActionList, MatIcon]
})
export class RolesDragDropComponent {
  currentRoles = [
    'System administrator',
    'Editor',
    'Publisher',
  ];

  roles = [
    'Security administrator',
    'User administrator',
    'Guest user',
    'Billing administrator',
  ];

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }
}
