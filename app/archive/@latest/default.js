import NewsList from "@/components/news-list";
import { getLatestNews } from "@/lib/news"

export default function LatestNewsPage() {
    const latestNews = getLatestNews();
    return (
        <>
            <h2>LATEST NEWS</h2>
            <NewsList news={latestNews} />
        </>
    )
}
