import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { AddDataService } from "../add-data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-form",
  templateUrl: "./add-form.component.html",
  styleUrls: ["./add-form.component.scss"],
})
export class AddFormComponent implements OnInit {
  @ViewChild("mymodal") mymodal = TemplateRef;
  profileForm = new FormGroup({});
  isSubmitted = false;
  showImage: any;
  imgURL: any;
  timer: any;
  closeResult!: string;
  message!: string;
  timers: any;
  modalOptions: NgbModalOptions;

  constructor(
    private addDataService: AddDataService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
    };
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      fullName: new FormControl("", [Validators.required]),
      profileImage: new FormControl("", [Validators.required]),
      // imageData:new FormControl('')
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  onFileSelected(event: any) {
    let file: File;

    file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.profileForm.patchValue({ profileImage: file });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    let formData = new FormData();
    formData.append("user_name", this.profileForm.value.fullName);
    formData.append("profile_image", this.profileForm.value.profileImage);
    let time = 0;
    this.timers = setInterval(() => {
      time++;
      this.timer = time;
    }, 1000);
    this.addDataService.addData(formData).subscribe((res) => {
      this.profileForm.patchValue({ fullName: "", profileImage: null });
      this.imgURL = "";
      if (res.success === 1) {
        this.router.navigate(["face-scan"]);
      }
      clearInterval(this.timers);
      this.message = res.message;
      this.open("mymodal");
    });
  }

  open(content: any) {
    this.modalService.open(this.mymodal, this.modalOptions).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log("popup");
        clearInterval(this.timers);
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
