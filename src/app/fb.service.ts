import { Injectable } from "@angular/core";
import { FacebookService, LoginOptions } from "ngx-facebook";

@Injectable()
export class FBService {
  isUserLoggedIn = false;
  constructor(private fb: FacebookService) {
    fb.init({
      appId: "2061960544128041",
      version: "v2.9"
    });
  }

  loginWithFacebook(): void {
    const options: LoginOptions = {
      scope: "public_profile,user_friends,email,pages_show_list",
      return_scopes: true,
      enable_profile_selector: true
    };

    this.fb
      .login(options)
      .then((response: any) => {
        this.fb.api("/me").then((res: any) => {
          console.log("Got the users friends", res);
        });
      })
      .catch((error: any) => console.error(error));
  }
}
