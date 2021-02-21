import ReactPaginate from "react-paginate";

export function PaginationReact(props) {
  const numberOfPage = Math.ceil(props.NumberOfItemsInDB / props.NumberToShow);

  return (
    <ReactPaginate
      previousLabel={<i>Prev</i>}
      nextLabel={<i>Next</i>}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={numberOfPage}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={props.handelClick}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
    />
  );
}
