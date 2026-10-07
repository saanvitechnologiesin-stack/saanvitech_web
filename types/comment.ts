export interface CommentType {
  id: number;
  postId?: number;
  name: string;
  email?: string;
  image?: string;
  content: string;
  created_at: string;
}
