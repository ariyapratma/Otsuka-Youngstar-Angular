import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

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
  categories: any[] = []; // Tambahkan properti categories untuk menyimpan data kategori

  displayedColumns: string[] = [
    'id',
    'title',
    'category_id',
    'description',
    'progress',
  ];

  constructor(
    private restApiService: ApiServiceService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.getCategories(); // Ambil kategori saat komponen diinisialisasi

    this.addForm = this.formBuilder.group({
      title: [null, Validators.required],
      category_id: [null, Validators.required], // Tambahkan validasi required
      description: [null],
      progress: [null],
    });
  }

  onSubmit() {
    this.addForm.markAllAsTouched();

    if (this.addForm.valid) {
      const formData = { ...this.addForm.value };
      formData.category_id = parseInt(formData.category_id, 10);

      console.log('Submitting Form:', formData);
      this.restApiService.createData(formData).subscribe(
        (data: any) => {
          this.modalService.dismissAll();
          this.ngOnInit();
        },
        (error) => {
          console.error('Error submitting data:', error);
        }
      );
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
  

  addButton(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  addForm!: UntypedFormGroup;
  get af() {
    return this.addForm.controls;
  }
}
