import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getCartRequestByuser,
  getCartRequestDelete,
  getCartRequestUpdate,
} from "../../Cart/CartAction";
import { ConfirmOrderRequest } from "../OrderAction";

const statuses = {
  Complete: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  Archived: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};
const address = [
  {
    id: 1,
    name: "Leslie Alexander",
    street: "10A",
    city: "Bhuj",
    pincode: 765432,
    state: "Gujarat",
    phone: 123456789,
  },
  {
    id: 2,
    name: "Mr Alexander",
    street: "20A",
    city: "mokama",
    pincode: 760089,
    state: "Bihar",
    phone: 567894312,
  },
];

const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$5.00",
  },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
];
const paymentMethods = [
  { id: "credit-card", title: "Credit card", value: "card" },
  { id: "cash-on-delivery", title: "COD", value: "cash" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const CheckOut = () => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const dispatch = useDispatch();
  const isOrderPlaced = useSelector((state)=>state.order.orderStatus)
  const products = useSelector((state) => state.cart.cart);
  const cartChanges = useSelector((state) => state.cart.isRequest);
  const currentUser = useSelector((state) => state.userAuth.users);

  const [payMethod, setPayMethod] = useState("card");

  const payMethodHandler = (e) => {
    setPayMethod(e.target.value);
  };

  const allItemsPrice =
    products.length > 0
      ? products.reduce(
          (totals, item) => item.price * item.quantity + totals,
          0
        )
      : 0;
  const allItemsQuantity =
    products.length > 0
      ? products.reduce((total, item) => item.quantity + total, 0)
      : 0;

  const handleQuantityChanger = (e, products) => {
    console.log(e.target.value, "eee");
    console.log(products.id, "ppp");
    dispatch(getCartRequestUpdate({ ...products, quantity: +e.target.value }));
  };

  const handleDeleteProduct = (id) => {
    console.log(id, "eee");
    dispatch(getCartRequestDelete(id));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const orderSubmitHandler = (orderdata)=>{
    const orderDetail = {products,totalAmount: allItemsPrice + 15.32 + 45.0,totalQuantity: allItemsQuantity,user: currentUser,paymentMethodtype: payMethod,orderdata,status:"pending"}
    console.log(orderDetail,"aaaaaaaaaaaaaaaaaaaaaaaaaaadata");
    dispatch(
      ConfirmOrderRequest(orderDetail)
      );
      
  }

  useEffect(() => {
    if (currentUser) {
      const uid = `?user=${currentUser.id}`;
      dispatch(getCartRequestByuser(uid));
    }
    console.log(products, "productsproductsproductsproductsproducts");
  }, [cartChanges]);

  return (
    <>
      {!products.length && <Navigate to="/" replace={true}></Navigate>}
      {isOrderPlaced && <Navigate to={`/order/success/${isOrderPlaced.id}`} replace={true}></Navigate>}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Checkout</h2>

          <form
            noValidate
            onSubmit={handleSubmit(orderSubmitHandler)}
            className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          >
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Contact information
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                          message: "Email is not valid",
                        },
                      })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Saved Address */}
              {/* TODO: not use now (complete after backend) */}
              {/* <h2 className="text-base my-2 font-semibold leading-7 text-gray-900">
                Choose From Existing Address
              </h2>
              <ul role="list">
                {address.map((address) => (
                  <li
                    key={address.id}
                    className="flex justify-between gap-x-6 px-5 py-5 pb-2 border-solid border-2 border-gray-200"
                  >
                    <div className="flex gap-x-4">
                      <input
                        name="saved_address"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.street}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.pincode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone : {address.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {address.city}
                      </p>
                    </div>
                  </li>
                ))}
              </ul> */}

              {/* End */}

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping information
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      FullName
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        {...register("fullName", {
                          required: "FullName is required",
                        })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {errors.fullName && (
                        <p className="text-red-500">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div> */}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register("address", {
                          required: "Address is required",
                        })}
                        id="address"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {errors.address && (
                        <p className="text-red-500">{errors.address.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="apartment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Apartment, suite, etc.
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register("apartment", {
                          required: "Apartment is required",
                        })}
                        id="apartment"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {errors.apartment && (
                        <p className="text-red-500">
                          {errors.apartment.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register("city", {
                          required: "City is required",
                        })}
                        id="city"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {errors.city && (
                        <p className="text-red-500">{errors.city.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <div className="mt-1">
                      <select
                        id="country"
                        {...register("country", {
                          required: "Country is required",
                        })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="">Select an option</option>
                        <option value="india">India</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Mexico">Mexico</option>
                      </select>
                      {errors.country && (
                        <p className="text-red-500">{errors.country.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register("state", {
                          required: "State is required",
                        })}
                        id="region"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {errors.state && (
                        <p className="text-red-500">{errors.state.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register("postalCode", {
                          required: "Postal code is required",
                        })}
                        id="postal-code"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {errors.postalCode && (
                        <p className="text-red-500">
                          {errors.postalCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        {...register("phone", {
                          required: "Phone Number is required",
                          pattern: {
                            value: /^(\+91|\+91\-|0)?[789]\d{9}$/gi,
                            message: "Number is not valid",
                          },
                        })}
                        id="phone"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {errors.phone && (
                        <p className="text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* be back */}

              {/* <div className="mt-10 border-t border-gray-200 pt-10">
                <RadioGroup
                  value={selectedDeliveryMethod}
                  onChange={setSelectedDeliveryMethod}
                >
                  <RadioGroup.Label className="text-lg font-medium text-gray-900">
                    Delivery method
                  </RadioGroup.Label>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {deliveryMethods.map((deliveryMethod) => (
                      <RadioGroup.Option
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? "border-transparent" : "border-gray-300",
                            active ? "ring-2 ring-indigo-500" : "",
                            "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <span className="flex flex-1">
                              <span className="flex flex-col">
                                <RadioGroup.Label
                                  as="span"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  {deliveryMethod.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-1 flex items-center text-sm text-gray-500"
                                >
                                  {deliveryMethod.turnaround}
                                </RadioGroup.Description>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-6 text-sm font-medium text-gray-900"
                                >
                                  {deliveryMethod.price}
                                </RadioGroup.Description>
                              </span>
                            </span>
                            {checked ? (
                              <CheckCircleIcon
                                className="h-5 w-5 text-indigo-600"
                                aria-hidden="true"
                              />
                            ) : null}
                            <span
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-lg"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div> */}

              {/* Payment */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <fieldset className="mt-4">
                  <legend className="sr-only">Payment type</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                      <div key={paymentMethod.id} className="flex items-center">
                        {paymentMethodIdx === 0 ? (
                          <input
                            id={paymentMethod.id}
                            name="payment-type"
                            type="radio"
                            onChange={(e) => payMethodHandler(e)}
                            value={paymentMethod.value}
                            defaultChecked
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        ) : (
                          <input
                            id={paymentMethod.id}
                            onChange={(e) => payMethodHandler(e)}
                            value={paymentMethod.value}
                            name="payment-type"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        )}

                        <label
                          htmlFor={paymentMethod.id}
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {paymentMethod.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                {payMethod === "card" && (
                  <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                    <div className="col-span-4">
                      <label
                        htmlFor="card-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Card number
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          id="card-number"
                          {...register("cardnumber", {
                            required: "Card Number is required",
                          })}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.cardnumber && (
                          <p className="text-red-500">
                            {errors.cardnumber.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-4">
                      <label
                        htmlFor="name-on-card"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name on card
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="name-on-card"
                          {...register("nameoncard", {
                            required: "Name on card is required",
                          })}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.nameoncard && (
                          <p className="text-red-500">
                            {errors.nameoncard.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="expiration-date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiration date (MM/YY)
                      </label>
                      <div className="mt-1">
                        <input
                          type="month"
                          {...register("expiremonthandyear", {
                            required: "Expire Month and Year is required",
                          })}
                          id="expiration-date"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.expiremonthandyear && (
                          <p className="text-red-500">
                            {errors.expiremonthandyear.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cvc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVC
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          {...register("cvc", {
                            required: "Three Digit CVC Code is required",
                          })}
                          id="cvc"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.cvc && (
                          <p className="text-red-500">{errors.cvc.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {products.map((product, productIdx) => (
                    <li key={product.id} className="flex px-4 py-6 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-20 rounded-md"
                        />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <a
                                href={product.href}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.title}
                              </a>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                            {product.size ? (
                              <p className="mt-1 text-sm text-gray-500">
                                {product.size}
                              </p>
                            ) : null}
                          </div>

                          <div className="ml-4 flow-root flex-shrink-0">
                            <button
                              onClick={(e) => handleDeleteProduct(product)}
                              type="button"
                              className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <TrashIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ₹ {product.price}
                          </p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <select
                              id={`quantity-${productIdx}`}
                              name={`quantity-${productIdx}`}
                              value={product.quantity}
                              onChange={(e) =>
                                handleQuantityChanger(e, product)
                              }
                              className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Quantity</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {allItemsQuantity}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ₹ {allItemsPrice}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ₹ 45.00
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ₹ 15.32
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      ₹ {allItemsPrice + 15.32 + 45.0}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <button
                      type="submit"
                      className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Confirm order
                    </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
