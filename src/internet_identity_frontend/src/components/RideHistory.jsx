export default function RideHistory({ backendActor, isAuthenticated }) {
  return (
    <>
      <div className="holder overflow-hidden w-3/6 mt-5 box-border border border-b-4 border-green-600 rounded-r-md shadow-xl  mx-auto">
        <div className="top bg-green-600 text-white p-2 px-4 uppercase">
          <svg
            className="inline-block w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          Success
        </div>
        <div className="center flex box-border px-6 py-4">
          <div className="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            qui maxime commodi ipsa quisquam numquam harum accusamus nobis
            maiores quidem. Sit iusto facilis nesciunt maxime aperiam rerum
            quisquam, repellat itaque?
          </div>
        </div>

        <div className="bottom">
          <div className="hold flex space-x-2 border-t p-3 mt-3">
            <div className="border-gray-600 rounded text-gray-900 text-base cursor-pointer border p-1 px-3 ml-auto">
              Cancel
            </div>
            <div className="border-green-600 rounded text-white bg-green-600 text-base cursor-pointer border border-b-4 p-1 px-3 font-bold">
              <svg
                className="inline-block w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Done
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
