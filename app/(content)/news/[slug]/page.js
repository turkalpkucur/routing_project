import { DUMMY_NEWS } from "@/dummy-news";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ params }) {

    let newsSlug = await params;


    if (!newsSlug) {
        return;
    }
    const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsSlug.slug)
    if (!newsItem) {
        notFound();
    }
    return (
        <article className="news-article">
            <header>
                <Link href={`/news/${newsItem.slug}/image`}>
                    <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
                </Link>
                <h1>{newsItem.title}</h1>
                <time dateTime={newsItem.date}>{newsItem.date}</time>
            </header>
            <p>{newsItem.content}</p>
        </article>
    )


}
