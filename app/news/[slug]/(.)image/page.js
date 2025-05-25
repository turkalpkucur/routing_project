import { DUMMY_NEWS } from "@/dummy-news";
import { notFound } from "next/navigation";

export default async function InterceptedImagePage({ params }) {
    let newsItemSlug = await params;

    newsItemSlug = newsItemSlug.slug;

    const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsItemSlug)
    if (!newsItem) {
        notFound();
    }
    return (
        <>
            <h2>Intercepted!</h2>
            <div className="fullscreen-image">
                <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
            </div>
        </>

    )
}
