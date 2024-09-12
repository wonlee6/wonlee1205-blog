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
  gap: '0.25rem',
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

export const LabelDefaultStyles: React.CSSProperties = {
  display: 'block',
  width: '100%',
  marginBottom: '4px',
  textAlign: 'left'
}

export const HeadingDefaultStyles: React.CSSProperties = {
  marginTop: '1.25rem',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
  fontSize: '3rem',
  lineHeight: 1
}
