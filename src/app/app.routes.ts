import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/parent/parent.page").then((m) => m.ParentPage),
    
  },  {
    path: "child",
    loadComponent: () => import("./pages/child/child.page").then((m) => m.ChildPage),
    
  },
];
