type MakeOptionsReturnProps<T extends Record<string, any>> = T & {
  label: string;
  value: any;
};

export const makeOptions = <T extends Record<string, any>>(
  data: T[],
  labelPropertyName: keyof T | undefined,
  valuePropertyName: keyof T | undefined,
): MakeOptionsReturnProps<T>[] => {
  if (labelPropertyName && valuePropertyName) {
    return data.map((item) => ({
      ...item,
      label: item[labelPropertyName],
      value: item[valuePropertyName],
    }));
  } else {
    return data.map((item) => ({
      ...item,
      label: '',
      value: '',
    }));
  }
};

export const parsePickedOption = <T extends Record<string, any>>({
  label: _label,
  value: _value,
  ...rest
}: MakeOptionsReturnProps<T>): Omit<T, 'label' | 'value'> => ({ ...rest });

export const groupData = <T extends Record<string, any>>(
  data: T[],
  groupBy: (item: T) => string,
): {
  groupBy: string;
  data: T[];
}[] => {
  const groups = data.reduce<Record<string, T[]>>((acc, item) => {
    const grouping: string = groupBy(item);

    if (!acc[grouping]) {
      acc[grouping] = [];
    }

    acc[grouping].push(item);

    return acc;
  }, {});

  const groupArrays = Object.keys(groups).map((groupBy) => {
    return {
      groupBy,
      data: groups[groupBy],
    };
  });

  return groupArrays;
};
