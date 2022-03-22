import React, { useState, useRef, useEffect } from 'react';

type SizeResult = {
  visible: React.Component[];
  overflowed: React.Component[];
};

type SizeCalculatorProps = {
  width: number;
  components: React.Component[];
  children: (result: SizeResult) => unknown;
};

const Overflow = ({
  width,
  components,
  onChange,
}: {
  width: number;
  components: React.Component[];
  onChange;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sumVisible = 0;
    const visible: React.Component[] = [];
    const overflowed: React.Component[] = [];

    if (containerRef.current) {
      const elements = Array.from(containerRef.current.children).map((child: HTMLElement) => {
        return {
          child,
          width: Math.ceil(child.getBoundingClientRect().width),
        };
      });

      elements.forEach((element, index) => {
        if (sumVisible + element.width <= width) {
          visible.push(components[index]);
          sumVisible += element.width;
        } else {
          overflowed.push(components[index]);
        }
      });

      onChange({
        visible,
        overflowed,
      });
    }
  }, [width, components]);

  return (
    <div style={{ visibility: 'hidden', position: 'absolute', display: 'flex' }} ref={containerRef}>
      {components}
    </div>
  );
};

export const SizeCalculator = ({ width, components, children }: SizeCalculatorProps) => {
  const [data, setData] = useState<SizeResult>();

  const onChange = data => {
    setData(data);
  };

  return (
    <>
      <Overflow width={Number(width)} components={components} onChange={onChange} />
      {data && children(data)}
    </>
  );
};
