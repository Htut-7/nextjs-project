import React from "react";
import { TbAlertTriangle } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";

function DataRenderer({
  success,
  data,
  errorMessage,
  render,
}: {
  success: Boolean;
  data: any[];
  errorMessage: string | undefined;
  render: (data: any[]) => React.ReactNode;
}) {
  if (!success) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="flex flex-col items-center justify-center space-y-6 rounded-xl bg-card px-10 py-12 max-w-md w-full border border-red-500/20">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30">
            <TbAlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <div className="text-center space-y-3">
            <h3 className="text-xl font-bold text-white">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {errorMessage ||
                "We couldn't load the data at the moment. Please try again later."}
            </p>
          </div>
          <div className="w-full h-1 rounded-full bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0" />
        </div>
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="flex flex-col items-center justify-center space-y-6 rounded-xl bg-card px-10 py-12 max-w-md w-full border border-gray-700/30">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-main/10 border border-main/30">
            <FiSearch className="w-8 h-8 text-main" />
          </div>
          <div className="text-center space-y-3">
            <h3 className="text-xl font-bold text-white">No Data Found</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We couldn't find any records matching your criteria. Try adjusting
              your search or filters.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 text-xs">
            <div className="w-2 h-2 rounded-full bg-gray-600" />
            <span>Check back later for updates</span>
          </div>
        </div>
      </div>
    );
  }

  return <div>{render(data)}</div>;
}

export default DataRenderer;
