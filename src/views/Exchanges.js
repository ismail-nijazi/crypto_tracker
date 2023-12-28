import React, { useEffect, useState, useRef } from "react";
import ReactPaginate from "react-paginate";

import ExchangeTable from "../components/ExchangeTable";
import { useSelector } from "react-redux";

const Exchanges = () => {
	const tableRef = useRef();
	const items = useSelector((state) => state.currencyList.exchanges);
	const itemsPerPage = 20;
	const [currentRows, setCurrentRows] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [rowsOffset, setRowsOffset] = useState(0);

	useEffect(() => {
		const endOffset = rowsOffset + itemsPerPage;
		setCurrentRows(items.slice(rowsOffset, endOffset));
		setPageCount(Math.ceil(items.length / itemsPerPage));
	}, [rowsOffset, itemsPerPage, items]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % items.length;
		setRowsOffset(newOffset);
		tableRef.current.scrollIntoView();
	};

	return (
		<main className="main">
			<section ref={tableRef}>
				<div className="title">
					<h4>Exchanges</h4>
				</div>
				<ExchangeTable rows={currentRows} />
				<ReactPaginate
					breakLabel="..."
					nextLabel=">"
					onPageChange={handlePageClick}
					pageRangeDisplayed={2}
					pageCount={pageCount}
					previousLabel="<"
					renderOnZeroPageCount={null}
					containerClassName="pagination"
					activeClassName="active"
					pageLinkClassName="page-num"
					pageClassName="page-num"
					previousClassName="page-num"
					previousLinkClassName="page-num"
					nextClassName="page-num"
					nextLinkClassName="page-num"
				/>
			</section>
		</main>
	);
};

export default Exchanges;
