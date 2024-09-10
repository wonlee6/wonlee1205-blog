import { ComponentName } from '@/model/web-builder'

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: 'center',
  objectFit: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}

export const InputDefaultStyles: React.CSSProperties = {
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

export const YouTubeDefaultStyles: React.CSSProperties = {
  width: '100%',
  // height: '600px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export function getDefaultStyleByComponentType(componentName: ComponentName) {
  switch (componentName) {
    case 'Flex':
      return { ...ContainerDefaultStyles }
    case 'Text':
      return { ...InputDefaultStyles }
    default:
      return {}
  }
}
