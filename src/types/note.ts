export interface NoteSearch {
  id: number;
  title: string;
  src: string;
  uid: number;
  username: string;
  avatar: string;
  cid: number;
  cpid: number;
  urls: string;
  count: number;
  type: number;
  likeCount: number;
  time: number | string;
}

export interface NoteInfo {
  id: number;
  title: string;
  content: string;
  noteCover: string;
  uid: number;
  username: string;
  avatar: string;
  imgList: Array<string>;
  type: number;
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
  tagList: Array<any>;
  time: string;
  isFollow: boolean,
  isLike: boolean,
  isFavorite: boolean,
  pinned: number
}

export interface NoteDTO {
  keyword: string;
  type: number;
  cid: number;
  cpid: number;
}
