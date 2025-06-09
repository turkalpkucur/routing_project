import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

export default async function ImagePage({ params }) {
    debugger;
    let newsItemSlug = await params;
    newsItemSlug = newsItemSlug.slug;
    const newsItem = getNewsItem(newsItemSlug.slug);
    if (!newsItem) {
        notFound();
    }
    return (
        <div className="fullscreen-image">
            <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
    )
}
