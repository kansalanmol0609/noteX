import _times from "lodash/times";

export const Placeholder = (): JSX.Element => {
  return (
    <div className="flex flex-row gap-4 w-full flex-wrap place-content-center">
      {_times(9, (index) => (
        <div className="skeleton h-60 w-60" key={index}></div>
      ))}
    </div>
  );
};
