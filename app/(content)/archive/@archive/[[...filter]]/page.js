import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import Link from "next/link";
import { Suspense } from "react";


async function FilterHeader({ year, month }) {
    const avaiableYears = await getAvailableNewsYears();

    let links = avaiableYears;

    let newsMonths = await getAvailableNewsMonths(year);
    if (year && !avaiableYears.includes(year) || month && !newsMonths.includes(month)) {
        throw new Error('Invalid Filter.')
    }

    if (year && !month) {
        links = await getAvailableNewsMonths(year);
    }
    if (year && month) {
        links = [];
    }
    return (<header id="archive-header">
        <nav>
            <ul>
                {links.map(link => {
                    const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
                    return (
                        <li key={link}>
                            <Link href={href}>{link}</Link>
                        </li>
                    );
                }

                )}
            </ul>
        </nav>
    </header>);
}


async function FilteredNews({ year, month }) {
    let news;
    if (year && !month) {
        news = await getNewsForYear(year);
    } else if (year && month) {
        news = await getNewsForYearAndMonth(year, month);
    }

    let newsContent = <p>No news found for the selected period..</p>
    if (news && news.length > 0) {
        newsContent = <NewsList news={news} />
    }

    return newsContent;
}



export default async function FilteredNewsPage({ params }) {

    const filter = await params;

    const selectedYear = filter?.filter?.[0];
    const selectedMonth = filter?.filter?.[1];






    return (
        <>
            <Suspense fallback={<p>Loading filter..</p>}>
                <FilterHeader year={selectedYear} month={selectedMonth} />
            </Suspense >
            <Suspense fallback={<p>Loading news..</p>}>
                <FilteredNews year={selectedYear} month={selectedMonth} />
            </Suspense>
        </>
    );
}
