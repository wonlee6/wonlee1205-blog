import { ComponentName } from '@/model/web-builder'

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: 'center',
  objectFit: 'cover',
  backgroundRepeat: 'no-repeat'
}

export const InputDefaultStyles: React.CSSProperties = {
  ...defaultStyles,
  textAlign: 'left'
}

export const ContainerDefaultStyles: React.CSSProperties = {
  ...defaultStyles,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  minHeight: '6rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  textAlign: 'left'
}

export function getDefaultStyleByComponentType(componentName: ComponentName) {
  switch (componentName) {
    case 'Container':
      return { ...ContainerDefaultStyles }
    case 'Text':
      return { ...InputDefaultStyles }
    default:
      return {}
  }
}
