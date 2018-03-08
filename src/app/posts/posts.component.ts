import { Component, OnInit } from "@angular/core";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostsService } from "./posts.service";
import { HerosService } from "../heros/heros.service";
import { Router } from "@angular/router";
import * as alertify from "alertify.js";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  posts = [];
  heros = [];
  isEditing = false;
  currentEditIndex = -1;
  selectedHero = "";

  suggestedHero = "";
  suggestedPostId = "";

  // For the filters
  roles = ["", "Attack", "Defender", "Tank", "Support"];
  selectedRoleFilter;
  selectedHeroFilter;

  constructor(
    private postsService: PostsService,
    private herosService: HerosService,
    private route: ActivatedRoute
  ) {
    this.onEditToggle = this.onEditToggle.bind(this);
    this.addPost = this.addPost.bind(this);
    this.getSuggestedPostId = this.getSuggestedPostId.bind(this);
    this.setSuggestedHero = this.setSuggestedHero.bind(this);
  }

  ngOnInit() {
    this.postsService.getPosts().then((posts: any) => {
      this.posts = posts;
    });

    this.postsService.loadIOLib();

    this.herosService.getHeroes().then((heros: any) => {
      this.heros = heros.map(h => ({ id: h._id, name: h.name }));
      // Puts a space value for defualt
      this.heros.unshift({ id: "", name: "" });
    });

    this.setSuggestedHero();
    if (this.suggestedHero) {
      this.getSuggestedPostId().then(postId => {
        this.suggestedPostId = postId;
      });
    }
  }

  setSuggestedHero() {
    const heroes = window.localStorage.getItem("heroMap") || "{}";
    const parsedHeroes = JSON.parse(heroes);
    for (const hero in parsedHeroes) {
      if (parsedHeroes.hasOwnProperty(hero)) {
        const element = parsedHeroes[hero];

        if (!this.suggestedHero || parsedHeroes[this.suggestedHero] < element) {
          this.suggestedHero = hero;
        }
      }
    }
  }

  getSuggestedPostId() {
    return this.herosService.getHeroes().then(heroes => {
      const hero = heroes.find(h => h.name === this.suggestedHero);
      return this.postsService
        .getFilteredPosts("", "", hero._id)
        .then(posts => {
          const randSeed = Math.floor(Math.random() * Math.floor(posts.length));
          const wantedPostId = posts[randSeed]._id;
          return wantedPostId;
        });
    });
  }

  onEditToggle(idx) {
    if (this.isEditing) {
      this.postsService.updatePost(this.posts[idx]).then(() => {
        this.isEditing = false;
        this.currentEditIndex = -1;
      });
    } else {
      this.isEditing = true;
      this.currentEditIndex = idx;
    }
  }

  onPostRemove(id) {
    this.postsService.removePost(id).then(() => {
      this.posts = this.posts.filter(p => p._id !== id);
    });
  }

  addPost(contentRef, titleRef, authorNameRef) {
    const content = contentRef.value;
    const title = titleRef.value;
    const authorName = authorNameRef.value;
    const data = {
      title,
      authorName,
      content,
      hero: this.selectedHero,
      date: new Date()
    };

    if (!title) {
      alertify.error("Please enter title!");
      return;
    }
    if (!authorName) {
      alertify.error("Please enter author name");
      return;
    }
    if (!this.selectedHero) {
      alertify.error("Please select hero");
      return;
    }
    if (!content) {
      alertify.error("Please enter content");
      return;
    }

    this.postsService
      .createPost(data)
      .then(post => {
        // Clears the inputs after successfull post creation
        contentRef.value = "";
        titleRef.value = "";
        authorNameRef.value = "";
        this.selectedHero = "";

        this.posts.push(post);
        alertify.success("Post was created successfully");
      })
      .catch(e => {
        alertify.error(e.error);
      });
  }

  searchPosts(authorName) {
    this.postsService
      .getFilteredPosts(
        this.selectedRoleFilter || "",
        authorName,
        this.selectedHeroFilter || ""
      )
      .then(filteredPosts => {
        this.posts = filteredPosts;
      });
  }
}
