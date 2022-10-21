import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.css'

const Pagination = (props) => {

    return (
        <div className={styles['pagination']}>
            <ReactPaginate
                previousLabel="prev"
                nextLabel="next"
                pageCount={props.pageCount}
                onPageChange={props.onChangePage}
                breakClassName={styles["page-item"]}
                breakLinkClassName={styles["page-link"]}
                containerClassName={styles["pagination"]}
                pageClassName={styles["page-item"]}
                pageLinkClassName={styles["page-link"]}
                previousClassName={styles["page-link"]}
                previousLinkClassName={styles["page-button"]}
                nextClassName={styles["page-item"]}
                nextLinkClassName={styles["page-button"]}
                activeClassName={styles["active"]}
                disabledClassName={styles['disabled']}

            >
            </ReactPaginate></div>
    );
}
export default Pagination;