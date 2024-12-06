import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const Paginator = ({ page, setPage }) => {
  const pageButtons = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="paginator flex flex-row gap-1">
        <>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`flex justify-center items-center p-1 sm:p-2 rounded-full border border-solid ${page === 1 ? "opacity-[.5]" : "opacity-[1]"}`}
          >
            <ChevronLeftIcon
              width={23}
              className="w-4 sm:w-[23px]"
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
                className={`${page === pageItem ? "bg-[#709b75] text-white hover:bg-[#54815a]" : "text-slate-500 border-solid border hover:text-slate-400"} cursor-pointer text-[12px] sm:text-[14px] w-7 h-7 sm:w-10 sm:h-10 rounded-full flex justify-center items-center`}
              >
                {pageItem}
              </button>
            </>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === 5}
            className={`flex justify-center items-center p-1 sm:p-2 rounded-full border-solid border ${page === 5 ? "opacity-[.5]" : "opacity-[1]"}`}
          >
            <ChevronRightIcon
              className="w-4 sm:w-[23px]"
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
