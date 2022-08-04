/* eslint-disable import/prefer-default-export */

export const IMPORT_IS_OK = 'IMPORT_IS_OK';

export function importIsOk(bool) {
    return {
        type: IMPORT_IS_OK,
        payload: bool,
    };
}
