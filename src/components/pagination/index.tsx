import React from 'react'
import style from './style.module.css'

interface Props{
    totalPosts : number,
    postPerPage: number,
    setCurrentPage : React.Dispatch<React.SetStateAction<number>>,
    setPostPerPage: React.Dispatch<React.SetStateAction<number>>,
    currentPage : number

}
export default function Pagination({
    totalPosts,
    postPerPage,
    setCurrentPage,
    currentPage,
    
  }:Props) {

  
    const totalPages = Math.ceil(totalPosts / postPerPage);

    const goToPrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const goToNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    return (
      <div className={style.pagination}>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span className={style.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  }
  