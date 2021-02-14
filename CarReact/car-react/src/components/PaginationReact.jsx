import ReactPaginate from "react-paginate";

export function PaginationReact(props) {
  const numberOfPage = Math.ceil(props.NumberOfItemsInDB / props.NumberToShow);

  return (
    <ReactPaginate
      previousLabel={<i style={{position:"relative",top:"-10%",right:"-5%"}}>prev</i>}
      nextLabel={<i style={{position:"relative",top:"0%",left:"-5%"}}>Next</i>}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={numberOfPage}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={props.handleClick}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
    />
  );
}
