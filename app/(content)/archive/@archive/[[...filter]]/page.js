import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import Link from "next/link";

export default async function FilteredNewsPage({ params }) {

    const filter = await params;



    const selectedYear = filter?.filter?.[0];
    const selectedMonth = filter?.filter?.[1];

    let news;
    let links = await getAvailableNewsYears();
    if (selectedYear && !selectedMonth) {
        news = await getNewsForYear(selectedYear);
        links = await getAvailableNewsMonths(selectedYear);
    }
    if (selectedYear && selectedMonth) {
        news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
        links = [];
    }

    let newsContent = <p>No news found for the selected period..</p>


    if (news && news.length > 0) {
        newsContent = <NewsList news={news} />
    }

    const avaiableYears = await getAvailableNewsYears();

    let newsMonths = await getAvailableNewsMonths(selectedYear);
    if (selectedYear && !avaiableYears.includes(selectedYear) || selectedMonth && !newsMonths.includes(selectedMonth)) {
        throw new Error('Invalid Filter.')
    }

    return (
        <>
            <header id="archive-header">
                <nav>
                    <ul>
                        {links.map(link => {
                            const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`;
                            return (
                                <li key={link}>
                                    <Link href={href}>{link}</Link>
                                </li>
                            );
                        }

                        )}
                    </ul>
                </nav>
            </header>
            {newsContent}
        </>
    );
}
