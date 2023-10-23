export const getCartRequest = (payload) => ({
  type: "GETCARTREQUEST",
  payload
})

export const getCartSuccess = (payload) => ({
  type: "GETCARTSUCCESS",
  payload
})

export const getCartFailure = (payload) => ({
  type: "GETCARTFAILURE",
  payload
})

export const getCartRequestByuser = (payload) => ({
  type: "GETCARTREQUESTBYUSER",
  payload
})

export const getCartSuccessByuser = (payload) => ({
  type: "GETCARTSUCCESSBYUSER",
  payload
})

export const getCartFailureByuser = (payload) => ({
  type: "GETCARTFAILUREBYUSER",
  payload
})

export const getCartRequestUpdate = (payload) => ({
  type: "GETCARTREQUESTUPDATE",
  payload
})

export const getCartSuccessUpdate = (payload) => ({
  type: "GETCARTSUCCESSUPDATE",
  payload
})

export const getCartFailureUpdate = (payload) => ({
  type: "GETCARTFAILUREUPDATE",
  payload
})

export const getCartRequestDelete = (payload) => ({
  type: "GETCARTREQUESTDELETE",
  payload
})

export const getCartSuccessDelete = (payload) => ({
  type: "GETCARTSUCCESSDELETE",
  payload
})

export const getCartFailureDelete = (payload) => ({
  type: "GETCARTFAILUREDELETE",
  payload
})

export const getCartRequestCartDelete = (payload) => ({
  type: "GETCARTREQUESTCARTDELETE",
  payload
})

export const getCartSuccessCartDelete = (payload) => ({
  type: "GETCARTSUCCESSCARTDELETE",
  payload
})

export const getCartFailureCartDelete = (payload) => ({
  type: "GETCARTFAILURECARTDELETE",
  payload
})
