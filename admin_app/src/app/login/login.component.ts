import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required]]
  });
  isSuccess = false;
  isSubmited = false;
  isInvalid = false;

  constructor(private api: ApiService, private formBuilder: FormBuilder,
    private router: Router, private session: SessionService) { }

  ngOnInit(): void {
    if(this.session.getToken()){
      this.router.navigateByUrl("/dashboard");
    }
  }

  isError(field: string): boolean{
    return this.loginForm.controls[field].invalid && (this.isSubmited || this.loginForm.controls[field].dirty || this.loginForm.controls[field].touched)
  }

  onSubmit(){
    
    this.isSuccess = false;
    this.isSubmited = true;
    this.isInvalid = false;
    if(this.loginForm.valid){
      this.api.login(this.loginForm.value).subscribe((data: any)=>{
        console.log("Resp", data);
        if(data && data.access_token){
          this.isSuccess = true;
          this.session.setToken(data.access_token);
          this.router.navigateByUrl("/dashboard");
        }else{
          this.isInvalid = true;
        }
      },
        (e) => {
          if(e && e.error.statusCode == 401){
            this.isInvalid = true;
          }
          console.error('error caught in component', e.error);
        });
    }else{
      console.log("Please provide valid information");
    }
    
  }

}