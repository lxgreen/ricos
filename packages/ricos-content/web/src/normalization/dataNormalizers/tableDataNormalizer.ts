import { NO_WRAP } from '../../consts';

const tableDataNormalizer = (componentData, _normalizerConfig) => {
  const { config = {}, ...rest } = componentData;
  return {
    ...rest,
    config: {
      ...config,
      textWrap: NO_WRAP,
    },
  };
};

export default tableDataNormalizer;
