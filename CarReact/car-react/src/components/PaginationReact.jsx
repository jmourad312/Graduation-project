import ReactPaginate from "react-paginate";
import {useTranslation} from "react-i18next";

export function PaginationReact(props) {
  const numberOfPage = Math.ceil(props.NumberOfItemsInDB / props.NumberToShow);
  const {t, i18n} = useTranslation();
  return (
    <ReactPaginate
      previousLabel={<i style={{position:"relative",top:"0%",right:"0%"}}>{t("Pagination.Prev")}</i>}
      nextLabel={<i style={{position:"relative",top:"0%",left:"-1%"}}>{t("Pagination.Next")}</i>}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={numberOfPage}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={props.handleClick}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
      // forcePage={0}
    />
  );
}
