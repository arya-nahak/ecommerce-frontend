export const requestAddUser = (payload) => ({
  type: "REQUESTADDUSER",
  payload
})

export const successAddUser = (payload) => ({
  type: "SUCCESSADDUSER",
  payload
})

export const failAddUser = (payload) => ({
  type: "FAILADDUSER",
  payload
})

export const requestGetUser = (payload) => ({
  type: "REQUESTGETUSER",
  payload
})

export const successGetUser = (payload) => ({
  type: "SUCCESSGETUSER",
  payload
})

export const failGetUser = (payload) => ({
  type: "FAILGETUSER",
  payload
})
