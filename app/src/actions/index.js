import { getServerCategories } from '../utils/apiUtils'
import * as ACTIONS from './types'

function getCategories(categories) {
  return {
    type: ACTIONS.GET_CATEGORIES,
    categories
  }
}

export const getCategoriesFromServer = () => dispatch => (
  getServerCategories().then(categories => dispatch(getCategories(categories))
  )
)
