import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/auth.guard';
import { QuillModule } from 'ngx-quill';
import { SearchPipe } from '../shared/search.pipe';

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        AddPageComponent,
        OrdersPageComponent,
        EditPageComponent,
        SearchPipe
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        QuillModule.forRoot(),
        RouterModule.forChild([
            {
                path: '' , component: AdminLayoutComponent, children: [
                    {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
                    {path: 'add', component: AddPageComponent, canActivate: [AuthGuard]},
                    {path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard]},
                    {path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},

                ]
            }
        ])
    ],
    exports: [RouterModule]
})

export class AdminModule{

}
