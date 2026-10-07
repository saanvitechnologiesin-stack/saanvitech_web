'use client';

import "@/styles/pagination.css";
import Link from "next/link";
import Icons from "./Icons";

const Pagination = () => {
    return (
        <nav className="pagination">
            <ul className="list-unstyled pagintaion-list" data-aos="fade-up">
              {/* <li>
                <Link
                  href="#"
                  className="pagination-link"
                  aria-disabled="true"
                  aria-label="Previous page link"
                >
                    <Icons.ChevronLeft />
                </Link>
              </li> */}

              <li>
                <Link
                  href="#"
                  className="pagination-link active"
                  aria-label="Page 1 link"
                  onClick={(e) => e.preventDefault()}
                >
                  1
                </Link>
              </li>
              <li>
                <Link href="#" className="pagination-link" aria-label="Page 2 link" onClick={(e) => e.preventDefault()}>
                  2
                </Link>
              </li>
              <li>
                <Link href="#" className="pagination-link" aria-label="Page 3 link" onClick={(e) => e.preventDefault()}>
                  3
                </Link>
              </li>
              <li>
                <Link href="#" className="pagination-link" aria-label="Next page link" onClick={(e) => e.preventDefault()}>                  
                    <Icons.ChevronRight />
                </Link>
              </li>
            </ul>
          </nav>
    )
}

export default Pagination;