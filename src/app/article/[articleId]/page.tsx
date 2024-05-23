import { getArticles, getArticleDetail } from '@/libs/microcms';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';
import '@/styles/article.scss';

type Props = {
  params: { articleId: string };
};

// メタデータ titleタグの設定
export async function generateMetadata(props: Props): Promise<Metadata> {
  const id = props.params.articleId;
  const article = await getArticleDetail(id);
  return {
    title: article.title,
  };
}

// URLのパスを設定 /articles/記事の{ID}
export async function generateStaticParams() {
  const { contents } = await getArticles();
  const paths = contents.map((article) => {
    return {
      article: article.id,
    };
  });
  return paths;
}

export default async function Article(props: Props) {
  const article = await getArticleDetail(props.params.articleId);

  if (!article) {
    notFound();
  }

  return (
    <div>
      <article>
        <h1>{article.title}</h1>
        <p>{article.createdAt}</p>
        <Image
          src={article.eyecatch?.url ?? '/no-image.png'}
          alt="アイキャッチ"
          width={1600}
          height={1200}
          className="rounded-lg object-cover"
        />
        <div className="article">{parse(article.content)}</div>
      </article>
      <Link href="/">TOP</Link>
    </div>
  );
}
