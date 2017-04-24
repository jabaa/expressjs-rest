import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { RepositoryDetailsService } from '../services/repository-details.service';
import { RepositoryDetailsInterface } from '../models/repository-details.interface';

@Component({
  moduleId: module.id,
  templateUrl: './repository-details.component.html'
})
export class RepositoryDetailsComponent implements OnInit {

  public repositoryForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private repositoryDetailsService: RepositoryDetailsService) {
    this.repositoryForm = this.formBuilder.group({
      id: '',
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        if (params['id']) {
          this.repositoryDetailsService.getRepositoryDetails(params['id'])
            .catch((err: any) => {
              this.router.navigate(['']);
              return Observable.throw(err + ': Repository not found');
            })
            .subscribe((response: RepositoryDetailsInterface) => {
              this.repositoryForm.controls['id'].setValue(response._id);
              this.repositoryForm.controls['name'].setValue(response.name);
            });
        }
      });
  }

  public save() {
    if (this.repositoryForm.controls['id'].value) {
      let repository: RepositoryDetailsInterface = {
        _id: this.repositoryForm.controls['id'].value,
        name: this.repositoryForm.controls['name'].value
      };
      this.repositoryDetailsService.updateRepositoryDetails(repository)
        .subscribe((response: boolean) => {
          if (response) {
            this.router.navigate(['']);
          }
        });
    } else {
      let repository: RepositoryDetailsInterface = {
        name: this.repositoryForm.controls['name'].value
      };
      this.repositoryDetailsService.createRepository(repository)
        .subscribe((response: boolean) => {
          if (response) {
            this.router.navigate(['']);
          }
        });
    }
  }
}
