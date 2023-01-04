import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss'

type PaginationProps = {
  currentPage: number, 
  onChangePage: (page: number) => void,
}

const Pagination: React.FC<PaginationProps> = ({currentPage, onChangePage}) => {
  return (
    <div>
      <ReactPaginate
      className={styles.root}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={e => onChangePage(e.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                forcePage={currentPage - 1}
            />
    </div>
  )
}

export default Pagination
