import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Deals } from 'deals';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-matdialo',
  templateUrl: './matdialo.component.html',
  styleUrls: ['./matdialo.component.css']
})
export class MatdialoComponent implements OnInit {
  update:any= FormGroup;
  status: any = [
    {value: 'Approved', viewValue: 'Approved'},
    {value: 'In Progress', viewValue: 'In Progress'},
    {value: 'Rejected', viewValue: 'Reject'},
  ];
  val: any;
  constructor(private router: Router,private dialogRef: MatDialogRef<MatdialoComponent>,private service: CommonService,
    private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data:Deals, private route: ActivatedRoute,
    ){
      
    }
  ngOnInit(): void {
    console.log(this.data,"data")
    this.update = this.fb.group({
      dealsName: ['', Validators.required],
      lots: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required],
    });

    // let sub = this.route.params.subscribe((params) => {
    //   this.val = params['id'];
    //   console.log(this.val, 'param id');
    // });

    this.update.setValue({
      dealsName: this.data.dealsName,
      lots: this.data.lots,
      price: this.data.price,
      status: this.data.status,
    });
  }
  updateData(data:any){
    this.dialogRef.close(this.update.value);
  }
  cancel(){
    this.dialogRef.close('cancel')
  }
  
}
