export default function ArchiveLayout({ archive, latest }) {
    return <>
        <h1>NEWS ARCHIVE</h1>
        <section id="archive-filter">
            {archive}
        </section>
        <section id="archive-latest">
            {latest}
        </section>
    </>
}
