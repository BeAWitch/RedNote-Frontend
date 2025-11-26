export interface CommentDTO {
  nid: number;
  noteUid: number;
  pid: number;
  replyId: number;
  replyUid: number;
  replyUsername: string;
  level: number;
  content: string;
}

export interface Comment {
  id: number;
  pid: number;
  nid: number;
  noteCover: string;
  uid: number;
  username: string;
  avatar: string;
  replyId: number;
  replyUid: number;
  replyUsername: string;
  content: string;
  replyContent: string;
  time: number;
  likeCount: number;
  isLike: boolean;
  twoCommentCount: number;
  children: Array<Comment>;
}
