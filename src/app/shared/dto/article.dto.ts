export interface ArticleResponseDto {
  _id: string;
  media: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ArticlePrevResponseDto {
  _id: string;
  media: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AddArticleRequestDto {
  media: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
}

export interface UpdateArticleRequestDto extends AddArticleRequestDto { }
