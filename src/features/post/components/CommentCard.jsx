import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "components";
import { CommentOptionsModal } from "features/post";
import { getPostDate } from "utils";

export const CommentCard = ({ comment, postId }) => {
  const navigate = useNavigate();

  const { username, fullName, createdAt, comment: commentText } = comment;
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="grid grid-cols-[2rem_1fr] gap-2 pt-3 border-t border-darkGrey">
      <div
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/profile/${username}`);
        }}
      >
        <UserAvatar user={comment} />
      </div>

      <div className="flex flex-col gap-1 break-all">
        <div className="flex justify-between ">
          <div
            className="flex items-start 2xl:items-center gap-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${username}`);
            }}
          >
            <div className="flex flex-col gap-0 2xl:flex-row 2xl:gap-1">
              <span className="font-bold tracking-wide">{fullName}</span>
              <span className="text-lightGrey">@{username}</span>
            </div>
            <span className="text-lightGrey">·</span>
            <div className="text-lightGrey">{getPostDate(createdAt)}</div>
          </div>

          <div className="relative">
            <i
              className="fa-solid fa-ellipsis p-2 cursor-pointer hover:bg-dark hover:rounded-full"
              onClick={(e) => {
                setShowOptions((prev) => !prev);
                e.stopPropagation();
              }}
            ></i>

            {showOptions ? (
              <CommentOptionsModal
                comment={comment}
                postId={postId}
                setShowOptions={setShowOptions}
              />
            ) : null}
          </div>
        </div>

        <div>{commentText}</div>
      </div>
    </div>
  );
};
