import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import {
  requestCategoryProduct,
  requestFilterProduct,
  requestProduct,
  requestProductBrand,
  requestSingleProduct,
} from "../ProductAction";
import { DISPLAY_ITEMS_PER_PAGE } from "../../../app/Constants";
const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [sortData, setSortData] = useState({});
  const [pageData, setPageData] = useState(1);
  const data = useSelector((state) => state.product.product);
  const categories = useSelector((state) => state.product.categories);
  const brands = useSelector((state) => state.product.brands);
  const totalItems = useSelector((state) => state.product.totalItems);
  const dispatch = useDispatch();

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "brand",
      options: brands,
    },
  ];

  const filtersHandler = (e, section, option) => {
    const data = { ...filterData };

    if (e.target.checked) {
      // data[section.id]?.length ?data[section.id].push(option.value):[]
      if (data[section.id]?.length) {
        data[section.id].push(option.value);
      } else {
        data[section.id] = [option.value];
      }
    } else {
      // delete data[section.id]
      const find_index = data[section.id].findIndex(
        (elm) => elm === option.value
      );
      data[section.id].splice(find_index, 1);
    }
    setFilterData(data);
    // dispatch(requestFilterProduct(data));
  };

  const sortHandler = (e, option) => {
    const sortData = { _sort: option.sort, _order: option.order };
    setSortData(sortData);
    // dispatch(requestFilterProduct(data));
  };

  const paginationHandler = (page) => {
    // {_page=1&_limit=10}
    // DISPLAY_ITEMS_PER_PAGE
    setPageData(page);
  };

  // const detailPageHandler = (id) => {
  //   dispatch(requestSingleProduct(id));
  // };

  useEffect(() => {
    const pagination = { _page: pageData, _limit: DISPLAY_ITEMS_PER_PAGE };
    dispatch(requestFilterProduct({ filterData, sortData, pagination }));
    // dispatch(requestProduct());
  }, [dispatch, filterData, sortData, pageData]);

  useEffect(() => {
    setPageData(1);
  }, [totalItems, sortData]);

  useEffect(() => {
    dispatch(requestCategoryProduct());
    dispatch(requestProductBrand());
  }, []);

  return (
    <>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter
            mobileFiltersOpen={mobileFiltersOpen}
            Fragment={Fragment}
            setMobileFiltersOpen={setMobileFiltersOpen}
            filtersHandler={filtersHandler}
            filters={filters}
          />

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                All Products
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                onClick={(e) => sortHandler(e, option)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <DesktopFilter
                  filtersHandler={filtersHandler}
                  filters={filters}
                />

                {/* Product List */}
                <div className="lg:col-span-3">
                  <ProductGrid
                    data={data}
                  />
                </div>
              </div>
            </section>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <Pagination
                pageData={pageData}
                setPageData={setPageData}
                paginationHandler={paginationHandler}
                totalItems={totalItems}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  Fragment,
  setMobileFiltersOpen,
  filtersHandler,
  filters,
}) {
  return (
    <>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    data-filter="filter"
                                    defaultChecked={option.checked}
                                    onClick={(e) =>
                                      filtersHandler(e, section, option)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

function DesktopFilter({ filtersHandler, filters }) {
  return (
    <>
      <form className="hidden lg:block">
        {filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          data-filter="filter"
                          defaultChecked={option.checked}
                          onClick={(e) => filtersHandler(e, section, option)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </>
  );
}

function Pagination({ pageData, setPageData, paginationHandler, totalItems }) {
  const totalPage = Math.ceil(totalItems / DISPLAY_ITEMS_PER_PAGE);
  return (
    <>
      <div className="flex flex-1 justify-between sm:hidden">
        <p
          onClick={(e) =>
            paginationHandler(pageData > 1 ? pageData - 1 : (pageData = 1))
          }
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </p>
        <p
          onClick={(e) =>
            paginationHandler(
              pageData < totalPage ? pageData + 1 : (pageData = totalPage)
            )
          }
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </p>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(pageData - 1) * DISPLAY_ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {pageData * DISPLAY_ITEMS_PER_PAGE > totalItems
                ? totalItems
                : pageData * DISPLAY_ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <p
              onClick={(e) =>
                paginationHandler(pageData > 1 ? pageData - 1 : (pageData = 1))
              }
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </p>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({
              length: totalPage,
            }).map((element, index) => (
              <div
                key={index}
                onClick={(e) => paginationHandler(index + 1)}
                aria-current="page"
                className={`cursor-pointer relative z-10 inline-flex items-center ${
                  index + 1 === pageData
                    ? `bg-indigo-600`
                    : `text-gray-400 ring-gray-300`
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}
            <p
              onClick={(e) =>
                paginationHandler(
                  pageData < totalPage ? pageData + 1 : (pageData = totalPage)
                )
              }
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </p>
          </nav>
        </div>
      </div>
    </>
  );
}

function ProductGrid({ data}) {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {data.map((product) => (
              <div
                key={product.id}
                className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
              >
                <Link
                  to={`/product/overview/${product.id}`}
                >
                  <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                    <img
                      src={product.thumbnail}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="pb-4 pt-10 text-center">
                    <h3 className="text-sm font-medium text-gray-900">
                      <p>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </p>
                    </h3>
                    <div className="mt-3 flex flex-col items-center">
                      <p className="sr-only">{product.rating} out of 5 stars</p>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              Math.round(product.rating) > rating
                                ? "text-yellow-400"
                                : "text-gray-200",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.reviewCount} reviews
                      </p>
                    </div>
                    <p className="mt-4 text-base font-medium text-gray-900">
                      ₹ {product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
