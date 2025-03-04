/**
 * Generates a query string from the keys and values of an object.
 *
 * @param {Object} params - An object containing key-value pairs to be converted into a query string.
 * @param {string} params.key - The key of the query parameter.
 * @param {string} params.value - The value of the query parameter.
 * @returns {string} A URL-encoded query string.
 *
 * @example
 * const queryParams = { name: "John Doe", age: "30", city: "New York" };
 * const queryString = generateQueryString(queryParams);
 * console.log(queryString);
 * // Output: "name=John%20Doe&age=30&city=New%20York"
 */
const generateQueryString = (params?: {
  [key: string]: boolean | number | string;
}) => {
  if (!params) return '';

  return `${Object.keys(params)
    .filter(key => (typeof params[key] === 'number' ? true : !!params[key]))
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')}`;
};

export { generateQueryString };
