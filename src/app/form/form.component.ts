import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  step: any = 1;
  flagModal:boolean = false;
  flag: any;
  countryList:any[]=[];
  genereList: any[] = [
    'Masculino',
    'Femenino'
  ];

  typeList: any[] = [
    'Cédula ciudadania',
    'Pasaporte',
    'Cédula de extranjería'
  ];
  submitted: any = false;
  multistep = new FormGroup({
    userDetails: new FormGroup({
      country: new FormControl('', Validators.required),
      genere: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      documentType: new FormControl('', Validators.required),
      numberDocument: new FormControl('', [Validators.required, Validators.minLength(6)]),
      imageFront: new FormControl('', Validators.required),
      imageBack: new FormControl('', Validators.required),
    }),
    contactDetails: new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      phone: new FormControl('',[Validators.required, Validators.minLength(7)]),
      cellphone: new FormControl('',[Validators.required, Validators.minLength(7)]),
    }),
    personalDetails: new FormGroup({
      address: new FormControl('',Validators.required),
      zipCode: new FormControl('',Validators.required),
    }),
  });
  constructor(
    private route: Router,
    private countriesService: CountriesService
    ) {}

  ngOnInit(): void {
    let listCountries =this.countriesService.country()
    .subscribe(arg=>{
      this.countryList = arg
    })
  }

  get userDetails():any {
    return this.multistep.get('userDetails')
  }

  get country():any {
    return this.multistep.get('userDetails.country')
  }

  get genere():any {
    return this.multistep.get('userDetails.genere')
  }

  get userFirstN():any {
    return this.multistep.get('userDetails.firstname')
  }

  get userLastName():any {
    return this.multistep.get('userDetails.lastname')
  }

  get documentType():any {
    return this.multistep.get('userDetails.documentType')
  }

  get numberDocument():any {
    return this.multistep.get('userDetails.numberDocument')
  }

  get imageFront():any {
    return this.multistep.get('userDetails.imageFront')
  }

  get imageBack():any {
    return this.multistep.get('userDetails.imageBack')
  }


  get contactDetails():any {
    return this.multistep.get('contactDetails')
  }

  get email():any {
    return this.multistep.get('contactDetails.email')
  }

  get phone():any {
    return this.multistep.get('contactDetails.phone')
  }

  get cellphone():any {
    return this.multistep.get('contactDetails.cellphone')
  }


  get personalDetails():any {
    return this.multistep.get('personalDetails')
  }

  get address():any {
    return this.multistep.get('personalDetails.address')
  }

  get zipCode():any {
    return this.multistep.get('personalDetails.zipCode')
  }



  submit() {
    this.submitted = true;

    if (this.multistep.controls['userDetails'].invalid && this.step == 1) {
      return;
    }

    if (this.password.status === 'INVALID' && this.step == 2 ) {
      this.flag = 2;
      return
    }

    if (this.confirmPass.status === 'INVALID' && this.step == 2 ) {
      this.flag = 2;
      return
    }

    if (this.multistep.controls['contactDetails'].invalid && this.step == 2 ) {
      this.flag = 2;
      return;
    }

    if (this.multistep.controls['personalDetails'].invalid && this.step == 3) {
      this.flag = 3
      return;
    }

    if (this.step  < 3){
      this.step = this.step + 1;
    }

    if (this.contactDetails['status'] === 'VALID' && this.personalDetails['status'] === 'VALID' && this.userDetails['status'] === 'VALID') {
      this.flagModal=true;
      this.contactDetails.value.password = this.password.value
      console.log(this.multistep.value);
    } else {
      this.flagModal=false;
    }
  }

  previous() {
    this.step = this.step - 1;
  }

  password = new FormControl("", [
    Validators.required,
    Validators.minLength(5),
  ]);
  // hide = true;
  confirmPass = new FormControl("", [
    Validators.required,
    this.confirmEquals()
  ]);

  confirmEquals(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
        control.value?.toLowerCase() === this.passwordValue.toLowerCase()
            ? null : {noMatch: true};
  }

  get passwordValue() {
    return this.password.value;
  }


}
