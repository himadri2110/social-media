import "../styles.css";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserAvatar } from "components";
import { createPost, editPost } from "features/post";

export const NewPost = ({ post, setShowOptions }) => {
  const [input, setInput] = useState("");

  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const newPostRef = useRef();

  const submitPost = (e) => {
    e.preventDefault();

    if (post) {
      dispatch(editPost({ input, token, post }));
      setShowOptions(false);
    } else {
      dispatch(createPost({ input, token, user }));
    }

    setInput("");
    newPostRef.current.innerText = "";
  };

  useEffect(() => {
    if (post) newPostRef.current.innerText = post.content;
  }, [post]);

  const focusInput = () => {
    newPostRef.current && newPostRef.current.focus();
  };

  return (
    <div
      className={`grid grid-cols-[2rem_1fr] gap-2 items-baseline bg-darkSecondary text-sm  border-darkGrey px-4 py-3 cursor-text ${
        post ? "w-1/2 shadow-dark shadow-lg rounded border" : "border-y"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        focusInput();
      }}
    >
      <UserAvatar />

      <form className="flex flex-col gap-4" onSubmit={submitPost}>
        <div
          role="textbox"
          ref={newPostRef}
          contentEditable="true"
          placeholder="What's happening?"
          className="w-full break-all bg-inherit outline-none"
          onInput={(e) => setInput(e.currentTarget.textContent)}
        />

        <div className="ml-auto flex gap-2">
          {post ? (
            <button
              type="reset"
              className="border border-primary rounded-full py-1 px-3"
              onClick={() => setShowOptions(false)}
            >
              Cancel
            </button>
          ) : null}

          <button
            type="submit"
            className="bg-primary rounded-full py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!input.trim() || (post && input.trim() === post.content)}
          >
            {post ? "Save" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};