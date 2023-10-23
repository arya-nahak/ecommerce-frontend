export const ConfirmOrderRequest = (payload) => ({
  type: "CONFIRMORDERREQUEST",
  payload
})

export const ConfirmOrderSuccess = (payload) => ({
  type: "CONFIRMORDERSUCCESS",
  payload
})

export const ConfirmOrderFailure = (payload) => ({
  type: "CONFIRMORDERFAILURE",
  payload
})

// export const getOrderRequest = (payload) => ({
//   type: "GETORDERREQUEST",
//   payload
// })

// export const getOrderSuccess = (payload) => ({
//   type: "GETORDERSUCCESS",
//   payload
// })

// export const getOrderFailure = (payload) => ({
//   type: "GETORDERFAILURE",
//   payload
// })
