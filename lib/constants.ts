export const defaultStyles: React.CSSProperties = {
  backgroundPosition: 'center',
  objectFit: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}

export const BlockDefaultStyles: React.CSSProperties = {
  ...defaultStyles,
  width: 'auto',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  textAlign: 'left'
}

export const FlexDefaultStyles: React.CSSProperties = {
  ...defaultStyles,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.25rem',
  width: 'auto',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  textAlign: 'left'
}

export const InputDefaultStyles: React.CSSProperties = {
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

export const ParagraphDefaultStyles: React.CSSProperties = {
  marginBottom: '0.5rem'
}

export const TextLinkDefaultStyles: React.CSSProperties = {
  textDecorationLine: 'underline',
  textUnderlineOffset: '4px',
  fontWeight: '500'
}

export const TextAreaDefaultStyles: React.CSSProperties = {
  textAlign: 'left'
}

export const BlockQuoteDefaultStyles: React.CSSProperties = {
  paddingLeft: '1.5rem',
  // borderLeftWidth: '2px',
  marginTop: '1.5rem',
  fontFamily: 'italic',
  whiteSpace: 'pre-wrap'
}

export const ImageDefaultStyles: React.CSSProperties = {
  objectFit: 'cover'
}
