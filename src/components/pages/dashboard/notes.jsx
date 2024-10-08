import Link from "next/link";
import { Boxheader } from ".";

export default function Notes({ data }) {
  return (
    <div className='w-full min-h-[320px] notes'>
      <div className='px-2'>
        <Boxheader
          title={"Notes"}
          data={data}
          redirect={{
            path: "/notes",
            text: "Add Notes",
          }}
        />
      </div>
      <div className='mt-2 flex flex-col  items-center gap-1 min-h-[280px]'>
        {data.length === 0 ? (
          <div className='w-full h-[200px] flex flex-col gap-4 items-center justify-center'>
            <p>No notes available</p>
            {/* <Link href='/notes'>
              <button className='text-white px-2 py-2 rounded-md  bg-[#036231] min-w-[135px]'>
                Add Notes
              </button>
            </Link> */}
          </div>
        ) : (
          <>
            {data.slice(0, 3).map((note, index) => (
              <>
                <Note key={index} data={note} />
                {index !== data.slice(0, 3).length - 1 && (
                  <div className='w-full h-[1px] bg-gray-200'></div>
                )}
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function Note({ data }) {
  return (
    <Link
      className='w-full flex flex-col gap-2 p-2 max-h-32 overflow-hidden rounded-xl cursor-pointer'
      href={`/notes`}
    >
      <p className='text-sm font-semibold'>{data.title}</p>
      <p className='text-sm text-gray-400 line-clamp-1 '>{data.description}</p>
    </Link>
  );
}
