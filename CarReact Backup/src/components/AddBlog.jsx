import React, { useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
export default function AddBlog() {
  useEffect(() => {
    console.log(window.popmotion);
  }, []);

  return (
    <div className="addBlog">
      <input type="checkbox" id="modal" />
      <p class="blurp">Add new post</p>
      <label for="modal" class="modal-btn">
        <i class="fas fa-plus-circle fa-1x"></i>
      </label>
      {/* <div class="modal-bg"></div> */}
      <label for="modal" class="modal-bg"></label>
      <div class="modal-content">
        <header>
          <h3>Add new post</h3>
        </header>
        <article class="content">
          <form method="post">
            <div class="form-group">
              <label for="blogSubject">Blog Subject</label>
              <Input
                type="text"
                class="form-control"
                name="blogSubject"
                id="blogSubject"
                placeHolder="Type the subject of your blog here"
              />
            </div>
            <div class="form-group">
              <label for="blogContent">Blog Content</label>
              <textarea
                class="form-control"
                name="blogContent"
                id="blogContent"
                rows="3"
                placeHolder="Type the blog information"
              ></textarea>
            </div>
          </form>
        </article>

        <footer>
          <Button type="submit" value="Accept" class="button success" />
          <label for="modal" class="button danger">
            Decline
          </label>
        </footer>
      </div>
    </div>
  );
}
