// @flow

/**
 * @param fetcher - configured axios instance (or similar) so it works correctly on server and client
 * (urls prefix, cookies ...)
 */
export default function (fetcher: Object) {
    return {
        getData: () => fetcher.get('/data'),
        // getDataWithParam: (param) => fetcher.getData('/compared', {params: {param}}),
    };
}
