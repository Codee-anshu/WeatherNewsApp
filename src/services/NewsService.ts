import axios from 'axios';
import { NEWS_API_KEY, NEWS_API_BASE_URL } from '../constants';
import { NewsCategory } from '../viewModel/useSettingViewModel';

const NewsService = {
  async getTopHeadlines(country: string = 'india', category?: NewsCategory[]) {
    const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
      params: {
        apiKey: NEWS_API_KEY,
        country,
        category,
        pageSize: 10,
      },
    });

    const data = response.data;

    const formattedArticles = data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
    }));

    return formattedArticles;
  },
};

export default NewsService;
