interface IProps {
  width: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

type SVGProperties = {
  width: number;
  viewBox: string;
  svgData: JSX.Element;
  fill?: string;
  stroke?: string;
  style?: Object;
};

const createIcon = ({ width, svgData, viewBox, fill }: SVGProperties) => {
  return (
    <svg
      width={width}
      viewBox={viewBox}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      {svgData}
    </svg>
  );
};

// ------------------------ ICON COLLECTIONS ------------------------

export const Advantages = ({ width, fill }: IProps) => {
  return createIcon({
    width,
    viewBox: "0 0 12 12",
    svgData: (
      <path
        d="M6 0C2.68548 0 0 2.68548 0 6C0 9.31452 2.68548 12 6 12C9.31452 12 12 9.31452 12 6C12 2.68548 9.31452 0 6 0ZM9.48387 6.67742C9.48387 6.8371 9.35323 6.96774 9.19355 6.96774H6.96774V9.19355C6.96774 9.35323 6.8371 9.48387 6.67742 9.48387H5.32258C5.1629 9.48387 5.03226 9.35323 5.03226 9.19355V6.96774H2.80645C2.64677 6.96774 2.51613 6.8371 2.51613 6.67742V5.32258C2.51613 5.1629 2.64677 5.03226 2.80645 5.03226H5.03226V2.80645C5.03226 2.64677 5.1629 2.51613 5.32258 2.51613H6.67742C6.8371 2.51613 6.96774 2.64677 6.96774 2.80645V5.03226H9.19355C9.35323 5.03226 9.48387 5.1629 9.48387 5.32258V6.67742Z"
        fill={fill}
      />
    ),
  });
};

export const Arrow = ({
  width,
  stroke = "#000000",
  strokeWidth = 1.2,
}: IProps) => {
  return createIcon({
    width,
    viewBox: "0 0 6 10",
    svgData: (
      <path
        d="M1 1L5 5L1 9"
        stroke={stroke}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    ),
  });
};
