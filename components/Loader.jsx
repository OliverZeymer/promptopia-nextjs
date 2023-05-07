export default function Loader({ size }) {
  return (
    <div
      className={
        size === "lg"
          ? "m-auto h-20 w-20 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"
          : "m-auto h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"
      }
    />
  );
}
