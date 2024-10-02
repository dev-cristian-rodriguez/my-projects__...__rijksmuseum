import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const Paginator = ({ page, setPage }) => {
  const pageButtons = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="paginator flex flex-row gap-2.5">
        <>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`flex justify-center items-center rounded-md border border-solid ${page === 1 ? "opacity-[.5]" : "opacity-[1]"}`}
          >
            <ChevronLeftIcon
              width={20}
              color="#647185"
              cursor={page === 1 ? "default" : "pointer"}
            />
          </button>

          {pageButtons.map((pageItem) => (
            <>
              <button
                key={pageItem}
                onClick={() => setPage(pageItem)}
                disabled={page === pageItem}
                className={`${page === pageItem ? "bg-indigo-500 text-white hover:bg-indigo-400" : "text-slate-500 border-solid border hover:text-slate-400"} cursor-pointer text-sm rounded-md w-6 h-6 flex justify-center items-center`}
              >
                {pageItem}
              </button>
            </>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === 5}
            className={`flex justify-center items-center rounded-md border-solid border ${page === 5 ? "opacity-[.5]" : "opacity-[1]"}`}
          >
            <ChevronRightIcon
              width={20}
              color="#647185"
              cursor={page === 5 ? "default" : "pointer"}
            />
          </button>
        </>
      </div>
    </div>
  );
};

export default Paginator;
