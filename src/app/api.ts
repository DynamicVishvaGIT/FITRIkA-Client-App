import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Common } from './common';
import { catchError, retry, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class Api {
  baseUrl = '';

  device_type = 'android';

  constructor(public httpClient: HttpClient, public commonService: Common) {
    this.baseUrl = this.commonService.getBaseURL();
  }

  // ---------- Auth ----------
  request_otp(user: any) {
    return this.httpClient.post(this.baseUrl + 'request_otp', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  verify_otp(user: any) {
    return this.httpClient.post(this.baseUrl + 'verify_otp', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  // signup(user: any) {
  //   return this.httpClient.post(this.baseUrl + 'signup', user)
  //   .pipe(
  //     retry(1),
  //     catchError(this.errorHandler)
  //   )
  // }

  // ---------- Workout Plans ----------
  // No retry on create calls, so a failed call can't create a plan twice
  my_enquiry_list(user: any) {
    return this.httpClient.post(this.baseUrl + 'my_enquiry_list', user)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  my_share_link(user: any) {
    return this.httpClient.post(this.baseUrl + 'my_share_link', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  check_share_link(user: any) {
    return this.httpClient.post(this.baseUrl + 'check_share_link', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  find_trainers(user: any) {
    return this.httpClient.post(this.baseUrl + 'find_trainers', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  member_assessment_list(user: any) {
    return this.httpClient.post(this.baseUrl + 'member_assessment_list', user)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  member_assessment_form_details(data: any) {
    return this.httpClient.post(this.baseUrl + 'member_assessment_form_details', data)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  // ---------- Day Plans ----------
  // JSON body (YouTube link or no video)
  submit_assessment_form(data: any) {
    return this.httpClient.post(this.baseUrl + 'submit_assessment_form', data)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // form-data body (video upload): no retry, so the file isn't uploaded twice
  my_coaches(formData: FormData) {
    return this.httpClient.post(this.baseUrl + 'my_coaches', formData)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // Rest day uses the same endpoint as add_day_plan
  rate_trainer(data: any) {
    return this.httpClient.post(this.baseUrl + 'rate_trainer', data)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  
 

  errorHandler(error: any) {
    console.log(error);
    let message = 'Something went wrong. Please try again later.';
    // No Internet / Network Error
    if (error.status === 0) {
      message = 'Connection could not be established, Please try again later.';
    }
    // Server errors
    else if (error.status >= 500) {
      message = 'Our server is currently unavailable. Please try again in a few minutes.';
    }
    // Unauthorized
    else if (error.status === 401) {
      message = 'Your session has expired. Please log in again.';
    }
    // Forbidden
    else if (error.status === 403) {
      message = 'You are not authorized to access this resource.';
    }
    // Not Found
    else if (error.status === 404) {
      message = 'Requested information could not be found.';
    }
    else if (error.status === 412) {
      message = error.error.message;
    }
    // Validation or API message
    else if (error.error?.error) {
      message = error.error.error;
    }
    // Generic message
    else if (error.message) {
      message = error.message;
    }
    return throwError(() => message);
  }
}
