export const getTooltipStyles = (
  isError?: boolean,
  followMouse?: boolean,
  tooltipOffset?: { x: number; y: number },
  place?: 'top' | 'bottom' | 'left' | 'right'
) => {
  return {
    style: {
      background: isError ? '#F64D43' : 'rgb(0,0,0)',
      position: followMouse ? 'relative' : 'absolute',
      padding: '8px 12px',
      color: 'white',
      fontWeight: '300',
      fontFamily: 'var(--ricos-settings-text-font-family, HelveticaNeue)',
      maxWidth: '180px',
      fontSize: '14px',
      marginTop: place === 'top' && tooltipOffset ? Math.abs(tooltipOffset.y) : tooltipOffset?.y,
      pointerEvents: 'none',
      transition: 'none',
      zIndex: 670000,
      border: 'solid 1px rgba(255,255,255,0.38)',
    },
    arrowStyle: {
      color: isError ? '#F64D43' : 'rgb(0,0,0)',
      borderColor: 'rgba(255,255,255,0.38)',
      pointerEvents: 'none',
      transition: 'none',
    },
  };
};
