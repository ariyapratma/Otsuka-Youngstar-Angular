import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

export interface User {
  id: number;
  title: string;
  category_id: number;
  description: string;
  progress: number;
}

@Component({
  selector: 'app-master-user',
  standalone: false,
  templateUrl: './master-user.component.html',
  styleUrl: './master-user.component.css',
})
export class MasterUserComponent implements OnInit {
  userData: User[] = [];
  categories: any[] = [];

  displayedColumns: string[] = [
    'id',
    'title',
    'category_id',
    'description',
    'progress',
  ];

  ngOnInit(): void {
    this.getEmployees();
    this.getCategories();
    this.titleService.setTitle('Otsuka Youngstar - Master User');

    setTimeout(() => {
      this.addForm = this.formBuilder.group({
        title: [null, Validators.required],
        category_id: [null, Validators.required],
        description: [null],
        progress: [null],
      });

      this.editForm = this.formBuilder.group({
        id: [null],
        title: [null, Validators.required],
        category_id: [null, Validators.required],
        description: [null],
        progress: [null],
      });
    });
  }

  constructor(
    private restApiService: ApiServiceService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private titleService: Title
  ) {}

  get af() {
    return this.addForm.controls;
  }

  addButton(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  addForm!: UntypedFormGroup;
  editForm!: UntypedFormGroup;
  modalEdit: any;

  editButton(element: number) {
    this.router.navigate(['/pages/master-user/master-edit-user', element]);
  }

  onDeleteUser(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.restApiService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'User has been deleted.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            }).then(() => {
              this.getEmployees();
            });
          },
          error: (error) => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete user.',
              icon: 'error',
              confirmButtonColor: '#3085d6',
            });
            console.error('Error deleting user:', error);
          },
        });
      }
    });
  }

  onSubmit() {
    this.addForm.markAllAsTouched();
    if (this.addForm.valid) {
      const formData = { ...this.addForm.value };
      formData.category_id = parseInt(formData.category_id, 10);

      this.restApiService.createData(formData).subscribe({
        next: () => {
          this.modalService.dismissAll();
          Swal.fire({
            title: 'Success!',
            text: 'User added successfully.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          });
          this.ngOnInit();
        },
        error: (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add user.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
          });
          console.error('Error submitting data:', error);
        },
      });
    }
  }

  private getEmployees() {
    this.restApiService.getUser().subscribe(
      (data) => {
        this.userData = data.data;
        console.log(this.userData);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  private getCategories() {
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
