import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../../../services/api-service.service';

@Component({
  selector: 'app-master-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './master-edit-user.component.html',
  styleUrls: ['./master-edit-user.component.css'],
})
export class MasterEditUserComponent implements OnInit {
  userData: any = {};
  editForm: FormGroup;
  categories: any[] = [];
  modalEdit: any;

  displayedColumns: string[] = [
    'id',
    'title',
    'category_id',
    'description',
    'progress',
    'actions',
  ];

  constructor(
    private route: ActivatedRoute,
    private restApiService: ApiServiceService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.editForm = this.formBuilder.group({
      title: [null, Validators.required],
      category_id: [null, Validators.required],
      description: [null, Validators.required],
      progress: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getUserData(id);
    }
    this.getCategories();
  }

  getUserData(id: string) {
    this.restApiService.getUserById(id).subscribe((data: any) => {
      if (data) {
        this.userData = data;
        this.editForm.patchValue({
          title: this.userData.title,
          category_id: this.userData.category_id,
          description: this.userData.description,
          progress: this.userData.progress,
        });
      }
    });
  }

  getCategories() {
    this.restApiService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  editButton(element: any) {
    this.editForm.patchValue({
      title: element.title,
      category_id: element.category_id,
      description: element.description,
      progress: element.progress,
    });

    this.modalService.open(this.modalEdit, { centered: true });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const formData = {
        ...this.editForm.value,
        category_id: Number(this.editForm.value.category_id),
      };

      this.restApiService.updateData(this.userData.id, formData).subscribe(
        () => {
          this.modalService.dismissAll();
        },
        (error) => {
          console.error('Error updating data:', error);
        }
      );
    }
  }
}
