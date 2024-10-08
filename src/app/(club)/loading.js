import Spinner from "@/components/loader/Spinner";

function Loading() {
  return (
    <div className="flex h-full justify-center items-center">
      <Spinner color={"green"} />
    </div>
  );
}

export default Loading;
