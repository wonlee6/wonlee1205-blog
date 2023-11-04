'usc client'

import {PostData} from '@/lib/posts'
import {atom} from 'recoil'

const postsDataAtom = atom<PostData[]>({
  key: '__postsDataAtom',
  default: []
})

export default postsDataAtom
