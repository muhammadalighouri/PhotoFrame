import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";
import axios from "../../api/axiosa";
import { toast } from "react-toastify";
export const getAllProducts = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST,
        });
        const {
            UserLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/products/all`, config);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getSingleProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        });
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        });

        const {
            UserLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/products/create`, product, config);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message,
        });
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        });

        const {
            UserLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/products/${id}`, config);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message,
        });
    }
};

export const updateProduct =
    (id, updatedProduct) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PRODUCT_UPDATE_REQUEST,
            });

            const {
                UserLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                `/api/Products/${id}`,
                updatedProduct,
                config
            );

            dispatch({
                type: PRODUCT_UPDATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            dispatch({
                type: PRODUCT_UPDATE_FAIL,
                payload: message,
            });
        }
    };

export const createReviewAction =
    (productId, review) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PRODUCT_CREATE_REVIEW_REQUEST,
            });

            const {
                UserLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            axios.post(`/api/products/${productId}/review`, review, config);

            dispatch({
                type: PRODUCT_CREATE_REVIEW_SUCCESS,
            });
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            dispatch({
                type: PRODUCT_CREATE_REVIEW_FAIL,
                payload: message,
            });
            toast.error("already reviewd Submited!");
        }
    };
