import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AddDataService } from "../add-data.service";

@Component({
  selector: "app-face-scan",
  templateUrl: "./face-scan.component.html",
  styleUrls: ["./face-scan.component.scss"],
})
export class FaceScanComponent implements OnInit, AfterViewInit {
  @ViewChild("profile", { static: true }) profile!: TemplateRef<any>;
  profileImage = new FormControl("");
  isApiColled = false;
  file = File;
  showImage: any;
  isSubmitted = false;
  responseList: any[] = [];
  columns: any;
  imgURL: any;
  isDetail: boolean = false;
  timer: any;
  constructor(private addDataService: AddDataService) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.columns = [
      {
        name: "Profile Image",
        prop: "customer_profile",
        cellTemplate: this.profile,
        width: 200,
        sort: false,
      },
      {
        name: "Customer Name",
        prop: "customerName",
        width: 200,

        sort: false,
      },
      {
        name: "Is Matched",
        prop: "isMatched",
        width: 200,

        sort: false,
      },
      {
        name: "Difference",
        prop: "difference",
        width: 200,
        sort: false,
      },
    ];
  }

  onFileSelected(event: any) {
    this.responseList = [];

    this.file = event.target.files[0];
    this.profileImage.patchValue(this.file);

    let formData = new FormData();
    formData.append("profile_image", this.profileImage.value);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.isSubmitted = true;
    let time = 0;
    let timer = setInterval(() => {
      time++;
      this.timer = time;
    }, 1000);
    this.addDataService.faceDcan(formData).subscribe((res) => {
      console.log(res.data);
      clearInterval(timer);
      if (res.success) {
        this.isApiColled = true;
        this.responseList = res.data;
        this.isDetail = true;
      } else {
        this.isDetail = false;
        this.isApiColled = true;
      }

      this.isSubmitted = false;
    });
  }
}
