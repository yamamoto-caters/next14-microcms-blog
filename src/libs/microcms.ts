import { Article } from '@/types/articleType';
import { MicroCMSQueries, createClient } from 'microcms-js-sdk';

// 環境変数 MICROCMS_SERVICE_DOMAIN の値が入ってなければエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN)
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
// 環境変数 MICROCMS_API_KEY の値が入ってなければエラーを投げる
if (!process.env.MICROCMS_API_KEY)
  throw new Error('MICROCMS_API_KEY is required');

// microCMSClientの作成
export const microCMSClient = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

/**
 * customRequestInit
 * 各関数の第２引数に指定
 * fetchのcatchオプションを指定することができる
 * 今回は0msに指定
 */

// 記事一覧の取得
export async function getArticles(queries?: MicroCMSQueries) {
  const articles = await microCMSClient.getList<Article>({
    customRequestInit: {
      next: {
        revalidate: 0,
      },
    },
    endpoint: 'articles',
    queries,
  });
  return articles;
}

// 特定の記事を取得
export async function getArticleDetail(
  contentId: string,
  queries?: MicroCMSQueries
) {
  try {
    const articleDetail = await microCMSClient.getListDetail<Article>({
      customRequestInit: {
        next: {
          revalidate: 0,
        },
      },
      endpoint: 'articles',
      contentId,
      queries,
    });
    return articleDetail;
  } catch (error) {
    return null;
  }
}
