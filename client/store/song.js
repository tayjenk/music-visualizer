import axios from 'axios'
import history from '../history'

const GET_ALL_SONGS = 'GET_ALL_SONGS'

const getSongs = allSongs => ({type: GET_ALL_SONGS, allSongs})

export const allSongsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/songs')
    dispatch(getSongs(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_SONGS:
      return action.allSongs
    default:
      return state
  }
}
