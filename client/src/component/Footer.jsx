export default function Footer(){
    return(
        <footer className="footer sm:footer-horizontal footer-center bg-neutral text-white text-lg p-4">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by FileHandling Sys Ltd.</p>
            </aside>
        </footer>
    )
}