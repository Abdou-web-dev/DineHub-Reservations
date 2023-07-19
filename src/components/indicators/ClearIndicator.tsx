import { CloseX } from "../icons/Icons";

export const ClearIndicator = (props: any) => {
  const {
    children = <CloseX />,
    // getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      // style={getStyles("clearIndicator", props)}
    >
      <div>{children}</div>
    </div>
  );
};
