import { Component, OnInit } from '@angular/core';
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { ArticleResponseDto } from "../../../shared/dto/article.dto";
import { NewsService } from "../news.service";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  public page = 0;
  public size = 10;
  public articlesData: ApiDataModel<ArticleResponseDto[]>;
  public breadcrumbs = [
    {
      caption: `Главная`,
      routerLink: `/`,
    },
    {
      caption: `Новости`,
      routerLink: `/news`,
    },
  ];

  readonly columns = ['title', 'date', 'tags'];

  constructor(
    private newsService: NewsService,
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  public refreshData(): void {
    this.articlesData = undefined;
    this.newsService.getArticles().subscribe((res: ArticleResponseDto[] | null) => {
      this.articlesData = res || null;
    });
  }

}
