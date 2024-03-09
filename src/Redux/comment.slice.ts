import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TProductDetail } from '../types/product/product.type'
import { Comment } from '../types/comment.type'

const comments: Comment[] = []

const initialState: { comments: Comment[]; total: number } = {
      comments,
      total: 0,
}

const commentSlice = createSlice({
      name: 'comments',
      initialState,
      reducers: {
            fetchComment: (state, payload: PayloadAction<{ comments: Comment[]; total: number }>) => {
                  state.comments = payload.payload.comments
                  state.total = payload.payload.total
            },
      },
})

export const { fetchComment } = commentSlice.actions
export default commentSlice.reducer
