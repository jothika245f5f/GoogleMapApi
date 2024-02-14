import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Deals } from 'deals';
import { CommonService } from 'src/app/common.service';
import { MatdialoComponent } from 'src/app/deals/matdialog/matdialo.component';

@Component({
  selector: 'app-dealsc',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css'],
})
export class DealscComponent implements OnInit, AfterViewInit {
  dialogRef: any;
  DealFind: '' = '';
  coloums = ['DealsName', 'Lots', 'LandPrice', 'Status', 'Action'];
  selection: any = [];
  temp:any;
  option: 'Select Name';
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  @ViewChild('callAPIDialog2') callAPIDialog2: TemplateRef<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public dataSource = new MatTableDataSource<Deals>();
  dataLength: any;
  constructor(
    private service: CommonService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.paginator._intl.getRangeLabel = this.getRangeDisplayText;
  }
  ngOnInit(): void {
    this.service.gettingDealData().subscribe((data: any) => {
      this.dataSource.data = data;

      this.dataLength = data.length;
      this.selection = data.map((item: any) => item.dealsName);
      console.log(this.selection);
    });
   
  }
  editRow(id: any) {
    this.service.getUpdateData(id).subscribe((data: any) => {
      console.log(data, 'id data');
      this.dialogRef = this.dialog
        .open(MatdialoComponent, {
          data: data,
          height: '500px',
          width: '600px',
          disableClose: true,
        })
        .afterClosed()
        .subscribe((result) => {
          console.log(result, 'after update');
          if(result=='cancel'){
            this.dialogRef.close();
          }
          else{
            this.service.updateData(id, result).subscribe((datas: any) => {
              this.ngOnInit();
              console.log('updated sucessfully');
            });
          }
        
        });
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteDeal(id: any) {
    console.log(id);
    let dialogRef = this.dialog.open(this.callAPIDialog2, {
      // height: '28%',
      // width: '25%',
      position: {
        top: '10rem',
      },
      panelClass: 'custom-modalbox2',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result == 'yes') {
        this.service.deleteData(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (u: Deals) => u.id !== id
          );
          console.log('Data deleted successfully');
        });
      } else {
        console.log('Data not  deleted ');
      }
    });
  }
  getRangeDisplayText = (page: number, pageSize: number, length: number) => {
    const initialText = 'page';
    if (length == 0 || pageSize == 0) {
      return `Page 0 of ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `page  ${startIndex + 1} of ${startIndex + 1}`;
  };

  
  tableFilter(filterValue: any) {
  
   console.log(filterValue)
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    

    // if (filterValue == '') {
    //   this.ngOnInit();
    // } else {
      
    //   let searchlist = this.dataSource.data.filter(function(element) {
    //    return element.dealsName.toLowerCase().indexOf(filterValue) > -1
      
    //   })
 
  
    // }
  }

  filterTable() {
    let dialogRef = this.dialog.open(this.callAPIDialog, {
      position: {
        top: '10rem',
      },
      panelClass: 'custom-modalbox',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let serchItem = this.dataSource.data.filter((element) =>
          element.dealsName.toLowerCase().includes(result.toLowerCase()) 
        );
        console.log(serchItem);
        this.dataSource.data = serchItem;

        document.getElementById('btn1')!.style.display = 'inline';
      } else {
        this.ngOnInit();
      }
    });
  }

  clearFilter() {
    this.ngOnInit();
    document.getElementById('btn1')!.style.display = 'none';
  }
}
