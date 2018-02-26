import { Injectable } from "@angular/core";

// NOTE: This is here because TS does not recognize fetch properly...
declare var FB;

@Injectable()
export class FBService {
  fb;
  isUserLoggedIn = false;
  constructor() {
    this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    this.getFeed = this.getFeed.bind(this);
  }

  checkIfLoggedIn() {
    FB.getLoginStatus(response => {
      if (response.status === "authorized") {
        this.isUserLoggedIn = true;
      }
    });
  }

  getFeed() {
    FB.api(
      "/1816213938448899/feed",
      "POST",
      { message: "This is a test message" },
      response => {
        if (response && !response.error) {
          /* handle the result */
        }
      }
    );
  }
}
