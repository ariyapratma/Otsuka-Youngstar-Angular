import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ApiServiceService } from '../../../services/api-service.service';
import Swal from 'sweetalert2';

export interface User {
  id: number;
  title: string;
  description: string;
  category_id: number;
  progress: number;
}

@Component({
  selector: 'app-master-edit-user',
  standalone: false,
  templateUrl: './master-edit-user.component.html',
  styleUrl: './master-edit-user.component.css',
})
export class MasterEditUserComponent implements OnInit {
  editForm!: UntypedFormGroup;
  userId!: number;
  categories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private restApiService: ApiServiceService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.editForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      category_id: [null, [Validators.required]],
      description: ['', [Validators.required]],
      progress: [null, [Validators.required]],
    });

    this.getUserById(this.userId);
    this.getCategories();
  }

  onSubmitEdit(): void {
    this.editForm.markAllAsTouched();

    if (this.editForm.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to save these changes?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.restApiService
            .updateUser(this.userId, this.editForm.value)
            .subscribe({
              next: () => {
                Swal.fire(
                  'Success!',
                  'User updated successfully.',
                  'success'
                ).then(() => {
                  this.router.navigate(['/pages/master-user']);
                });
              },
              error: (error) => {
                Swal.fire('Error!', 'Failed to update user.', 'error');
                console.error('Error updating user:', error);
              },
            });
        }
      });
    }
  }

  private getUserById(id: number): void {
    this.restApiService.getUserById(id).subscribe({
      next: (response) => {
        if (response && response.data) {
          setTimeout(() => {
            this.editForm.patchValue(response.data);
            console.log('Form Updated with:', this.editForm.value);
          });
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      },
    });
  }

  private getCategories(): void {
    this.restApiService.getCategories().subscribe(
      (data: any) => {
        if (data && Array.isArray(data.data)) {
          this.categories = data.data.map((category: any) => ({
            id: category.id,
            category: category.category,
          }));
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
