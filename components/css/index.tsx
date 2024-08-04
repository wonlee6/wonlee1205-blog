'use client'

import React from 'react'
import Editor, { type Monaco } from '@monaco-editor/react'

export default function CssIndex() {
  return (
    <div className='flex size-full gap-4'>
      <div className='h-full w-1/2'>
        <Left />
      </div>
      <div className='flex h-full w-1/2 flex-col items-center justify-center gap-8 overflow-y-auto bg-black'>
        <div className='card example-1'>
          <div className='inner'>
            <h3>Example 1</h3>
            <p>
              This card has a fake border. The animation is done using a rotating psuedo element.
            </p>
          </div>
        </div>

        {/* <div className='card example-2'>
          <div className='inner'>
            <h3>Example 2</h3>
            <p>This card also has a fake border with a rotating psuedo element.</p>
          </div>
        </div>

        <div className='card example-3'>
          <div className='inner'>
            <h3>Example 3</h3>
            <p>
              This card has a fake border. The background position of psuedo elements are being
              animated.
            </p>
          </div>
        </div>

        <div className='card example-4'>
          <div className='inner'>
            <h3>Example 4</h3>
            <p>This card animates an outline</p>
          </div>
        </div>

        <div className='card example-5'>
          <svg height='100%' width='100%' xmlns='http://www.w3.org/2000/svg'>
            <rect
              rx='8'
              ry='8'
              className='line'
              height='100%'
              width='100%'
              strokeLinejoin='round'
            />
          </svg>
          <div className='inner'>
            <h3>Example 5</h3>
            <p>This card uses SVG for the animation effect.</p>
          </div>
        </div> */}
      </div>
    </div>
  )
}

const example = `
.card {
    margin: 0 auto;
    padding: 10em;
    width: 300px;
    background: #1c1f2b;
    text-align: center;
    border-radius: 10px;
    position: relative;
}

@property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
}

.card::after, .card::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background: conic-gradient(from var(--angle), #ff4545, #00ff99, #006aff, #ff0095, #ff4545);
    /* background: conic-gradient(from var(--angle), transparent 70%, blue); */
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    z-index: -1;
    padding: 3px;
    border-radius: 10px;
    animation: 3s spin linear infinite;
}
.card::before {
    filter: blur(1.5rem);
    opacity: 0.5;
}
@keyframes spin {
    from {
        --angle: 0deg;
    }
    to {
        --angle: 360deg;
    }
}
`.trim()

// const example = `
// p {
//   line-height: 1.5;
// }

// .card {
//   max-width: 400px;
//   width: 100%;
//   border-radius: var(--border-radius);
// }

// .card .inner {
//   padding: 25px;
//   background: #222;
//   color: #fff;
//   border-radius: var(--border-radius);
// }

// .card h3 {
//   margin-bottom: 15px;
// }

// .example-1,
// .example-2 {
//   position: relative;
//   overflow: hidden;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .example-1 .inner,
// .example-2 .inner {
//   position: relative;
//   z-index: 1;
//   width: 100%;
// }

// .example-1 .inner {
//   margin: 5px;
// }

// .example-1::before {
//   content: "";
//   display: block;
//   background: linear-gradient(
//     90deg,
//     hsla(197, 100%, 64%, 1) 0%,
//     hsla(339, 100%, 55%, 1) 100%
//   );
//   height: 500px;
//   width: 500px;
//   position: absolute;
//   animation: rotate 8s linear infinite;
//   z-index: 0;
// }

// @keyframes rotate {
//   from {
//     transform: rotate(0);
//   }

//   to {
//     transform: rotate(360deg);
//   }
// }

// .example-2 .inner {
//   margin: 2px;
// }

// .example-2::before {
//   content: "";
//   display: block;
//   background: linear-gradient(
//    90deg,
//   rgba(255, 255, 255, 0) 0%,
//   rgba(102, 102, 102, 0.75) 50%,
//     rgba(255, 255, 255, 0) 100%
//   );
//   height: 300px;
//   width: 100px;
//   transform: translate(0);
//   position: absolute;
//   animation: rotate 5s linear forwards infinite;
//   z-index: 0;
//   top: 50%;
//   transform-origin: top center;
// }

// .example-3 {
//   position: relative;
//   border-radius: var(--border-radius);
//   padding: 4px;
// }

// .example-3 .inner {
//   border-radius: 4px;
// }

// .example-3::before,
// .example-3::after {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   background: linear-gradient(
//     45deg,
//     #ff595e,
//     #ffca3a,
//     #8ac926,
//     #1982c4,
//     #6a4c93,
//     #ff6700
//   );
//   background-size: 400%;
//   z-index: -1;
//   animation: glow 20s linear infinite;
//   width: 100%;
//   border-radius: var(--border-radius);
// }

// .example-3::after {
//   filter: blur(25px);
//   transform: translate3d(0, 0, 0);
// }

// @keyframes glow {
//   0% {
//     background-position: 0 0;
//   }

//   50% {
//     background-position: 100% 0;
//   }

//   100% {
//     background-position: 0 0;
//   }
// }

// .example-4 {
//   outline-width: 1px;
//   outline-offset: 0;
//   outline-color: rgba(0, 130, 206, 0.75);
//   outline-style: solid;
//   animation: animateOutline 4s ease infinite;
// }

// @keyframes animateOutline {
//   0% {
//     outline-width: 1px;
//     outline-offset: 0;
//     outline-color: rgba(0, 130, 206, 0);
//   }

//   0% {
//     outline-color: rgba(0, 130, 206, 0.75);
//   }

//   /* The animation finishes at 50% */
//   0% {
//     outline-width: 7px;
//     outline-offset: 4px;
//     outline-color: rgba(0, 130, 206, 0);
//   }

//   100% {
//     outline-width: 7px;
//     outline-offset: 4px;
//     outline-color: rgba(102, 102, 102, 0);
//   }
// }

// .example-5 {
//   position: relative;
// }

// .example-5 svg {
//   position: absolute;
// }

// .example-5 .line {
//   stroke-dasharray: 260;
//   stroke-width: 1px;
//   fill: transparent;
//   stroke: rgba(78, 255, 13, 0.3);
//   animation: svgAnimation 2.5s linear infinite;
// }

// @keyframes svgAnimation {
//   from {
//     stroke-dashoffset: 0;
//   }
//   to {
//     stroke-dashoffset: 1000;
//   }
// }
// `.trim()

function Left() {
  const monacoRef = React.useRef<Monaco>()
  const editorContent = React.useRef(example)

  let styleElement = null
  if (typeof document !== 'undefined') {
    styleElement = document.createElement('style')
  }

  React.useEffect(() => {
    document.head.appendChild(styleElement as any)
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      document.head.removeChild(styleElement as any)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBeforMount = (monaco: Monaco) => {
    monacoRef.current = monaco
  }

  const handleMount = (editor: any, monaco: Monaco) => {
    styleElement!.innerHTML = example
  }

  const handleChange = (value: string | undefined) => {
    if (!value) return
    // editorContent.current = value
    styleElement!.innerHTML = value
  }

  return (
    <>
      <Editor
        width={'100%'}
        height={'100%'}
        language='css'
        value={editorContent.current}
        // loading={loading}
        options={{
          minimap: {
            enabled: false
          },
          fontSize: 14,
          scrollbar: {
            horizontal: 'auto',
            vertical: 'auto'
          },
          readOnly: false,
          formatOnPaste: true,
          formatOnType: true,
          lineNumbers: 'on',
          automaticLayout: true,
          autoIndent: 'brackets',
          wordWrap: 'off'
          // fixedOverflowWidgets: true
        }}
        onMount={handleMount}
        onChange={handleChange}
        beforeMount={handleBeforMount}
      />
    </>
  )
}
